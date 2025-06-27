package com.halcyon.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.halcyon.backend.dto.ai.AiChatResponse;
import com.halcyon.backend.dto.ai.DataRequestAction;
import com.halcyon.backend.mapper.AiChatMessageMapper;
import com.halcyon.backend.model.AiChatMessage;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.MessageRole;
import com.halcyon.backend.repository.AiChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.*;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AiAssistantService {

    private final AiChatMessageRepository aiChatMessageRepository;
    private final ChatClient chatClient;
    private final TransactionService transactionService;
    private final CategoryService categoryService;
    private final BudgetService budgetService;
    private final GoalService goalService;
    private final UserService userService;
    private final ObjectMapper objectMapper;
    private final AiChatMessageMapper aiChatMessageMapper;

    private static final String SYSTEM_PROMPT = """
        Ты — дружелюбный и умный финансовый ассистент в приложении для учета финансов. Твоя главная задача — помогать пользователям анализировать их расходы и доходы, бюджеты и цели.

        Твои правила работы:
        1.  **Анализ запроса:** Внимательно прочитай вопрос пользователя. Определи, нужны ли для ответа персональные финансовые данные пользователя (транзакции, категории, бюджеты, цели и т.д.).

        2.  **Если данные НЕ нужны:** Если вопрос общий (например, "Что такое инфляция?" или "Как лучше копить деньги?"), просто отвечай на него.

        3.  **Если данные НУЖНЫ:** Не пытайся угадать или придумать ответ. Вместо этого, твой ЕДИНСТВЕННЫЙ ответ должен быть JSON-объектом специального формата. Этот JSON — сигнал для приложения, что нужно предоставить данные.
            Формат JSON для запроса данных:
            {
              "action": "request_data",
              "reason": "Краткое объяснение для пользователя, зачем тебе данные. Например: 'Чтобы проанализировать ваши бюджеты, мне нужны данные о них.'",
              "data_needed": {
                "type": "transactions", // или "categories", "budgets", "goals"
                "period": "current_month" // или "last_month", "last_week", "last_year", "all_time"
              }
            }
            Для `budgets` и `goals` поле `period` можно игнорировать и всегда возвращать `all_time`, если пользователь не указал конкретный период.
            Если приходит пустой список, то просто ответь что-то наподобие "У вас нет данных по этому запросу.".
            Отвечай **ТОЛЬКО** по делу, на вопросы, не касающие финансов, говори, что ты не можешь ответить на них.

        4.  **Уточнение:** Если запрос пользователя нечеткий (например, "Как мои дела с накоплениями?"), попроси его уточнить, о чем идет речь — о бюджетах или целях.

        5.  **Тон:** Будь вежливым, позитивным и поддерживающим.
        """;

    private static final String HELLO_SYSTEM_PROMPT = """
            Ты — дружелюбный и мотивирующий финансовый ассистент.
            Твоя задача — сгенерировать позитивное и уникальное приветственное сообщение для пользователя, который только что открыл приложение.
            Сообщение должно вдохновлять на ведение трекинга финансов, бюджета или достижение финансовых целей.
            Не будь слишком формальным. Обращайся на "ты".
            Твой ответ — это только само сообщение, без лишних слов вроде "Вот твое сообщение:".
            """;

    public AiChatResponse getChatResponse(String userMessage) {
        User user = userService.getCurrentUser();
        saveMessage(user, MessageRole.USER, userMessage);

        List<AiChatMessage> history = aiChatMessageRepository.findByUserOrderByCreatedAtAsc(user);

        Prompt firstPrompt = createPromptWithHistory(history);
        String assistantResponseContent = chatClient.prompt(firstPrompt).call().content();

        try {
            DataRequestAction action = objectMapper.readValue(assistantResponseContent, DataRequestAction.class);

            if ("request_data".equals(action.getAction())) {
                String secondResponseContent = handleDataRequest(action, userMessage);
                AiChatMessage message = saveMessage(user, MessageRole.ASSISTANT, secondResponseContent);
                System.out.println(secondResponseContent);
                return aiChatMessageMapper.toResponse(message);
            }
        } catch (JsonProcessingException e) {
            AiChatMessage message = saveMessage(user, MessageRole.ASSISTANT, assistantResponseContent);
            return aiChatMessageMapper.toResponse(message);
        }

        AiChatMessage message = saveMessage(user, MessageRole.ASSISTANT, assistantResponseContent);
        return aiChatMessageMapper.toResponse(message);
    }

    private Prompt createPrompt(String userMessage) {
        var systemMessage = new SystemMessage(SYSTEM_PROMPT);
        var message = new UserMessage(userMessage);

        return new Prompt(List.of(systemMessage, message));
    }

    private AiChatMessage saveMessage(User user, MessageRole role, String content) {
        var message = new AiChatMessage();
        message.setUser(user);
        message.setRole(role);
        message.setContent(content);

        return aiChatMessageRepository.save(message);
    }

    private Prompt createPromptWithHistory(List<AiChatMessage> history) {
        List<Message> messages = new ArrayList<>();
        messages.add(new SystemMessage(SYSTEM_PROMPT));

        for (AiChatMessage chatMessage : history) {
            if (chatMessage.getRole() == MessageRole.USER) {
                messages.add(new UserMessage(chatMessage.getContent()));
            } else if (chatMessage.getRole() == MessageRole.ASSISTANT) {
                messages.add(new AssistantMessage(chatMessage.getContent()));
            }
        }

        return new Prompt(messages);
    }

    private String handleDataRequest(DataRequestAction action, String originalUserMessage) {
        String dataAsJson = fetchData(action.getDataNeeded());

        if (dataAsJson.isEmpty()) {
            return "К сожалению, у меня нет данных, чтобы ответить на ваш вопрос.";
        }

        String secondUserMessage = String.format(
                "Вот данные в формате JSON, которые ты просил для анализа вопроса пользователя: '%s'.\n\nДанные:\n%s\n\nТеперь, пожалуйста, ответь на первоначальный вопрос пользователя, основываясь на этих данных.",
                originalUserMessage, dataAsJson
        );

        Prompt secondPrompt = createPrompt(secondUserMessage);
        return chatClient.prompt(secondPrompt).call().content();
    }

    private String fetchData(DataRequestAction.DataNeeded dataNeeded) {
        Object data;

        System.out.println(dataNeeded.getType());
        switch (dataNeeded.getType()) {
            case "transactions" -> data = transactionService.getHistory(null, null, PageRequest.of(0, 100));
            case "categories" -> data = categoryService.getAllByUser();
            case "budgets" -> data = budgetService.getUserBudgets();
            case "goals" -> data = goalService.getAllForCurrentUser();
            default -> {
                return "";
            }
        }

        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{\"error\": \"Не удалось сериализовать данные\"}";
        }
    }

    @Transactional(readOnly = true)
    public List<AiChatResponse> getChatHistory() {
        User user = userService.getCurrentUser();
        return aiChatMessageRepository.findByUserOrderByCreatedAtAsc(user)
                .stream()
                .map(aiChatMessageMapper::toResponse)
                .toList();
    }
    
    public AiChatResponse getWelcomeMessage() {
        User user = userService.getCurrentUser();
        String userMessage = String.format("Сгенерируй приветствие для пользователя %s.", user.getEmail());

        var systemMessage = new SystemMessage(HELLO_SYSTEM_PROMPT);
        var message = new UserMessage(userMessage);
        var prompt = new Prompt(List.of(systemMessage, message));

        String response = chatClient.prompt(prompt).call().content();
        AiChatMessage aiChatMessage = saveMessage(user, MessageRole.ASSISTANT, response);

        return aiChatMessageMapper.toResponse(aiChatMessage);
    }
}
