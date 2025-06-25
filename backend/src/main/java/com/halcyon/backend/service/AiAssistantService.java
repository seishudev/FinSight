package com.halcyon.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.halcyon.backend.dto.ai.DataRequestAction;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiAssistantService {

    private final ChatClient chatClient;
    private final TransactionService transactionService;
    private final CategoryService categoryService;
    private final BudgetService budgetService;
    private final ObjectMapper objectMapper;

    private static final String SYSTEM_PROMPT = """
            Ты — дружелюбный и умный финансовый ассистент в приложении для учета финансов. Твоя главная задача — помогать пользователям анализировать их расходы и доходы.
            
            Твои правила работы:
            1.  **Анализ запроса:** Внимательно прочитай вопрос пользователя. Определи, нужны ли для ответа персональные финансовые данные пользователя (транзакции, категории, бюджеты и т.д.).
            
            2.  **Если данные НЕ нужны:** Если вопрос общий (например, "Что такое инфляция?" или "Как лучше копить деньги?"), просто отвечай на него.
            
            3.  **Если данные НУЖНЫ:** Не пытайся угадать или придумать ответ. Вместо этого, твой ЕДИНСТВЕННЫЙ ответ должен быть JSON-объектом специального формата. Этот JSON — сигнал для приложения, что нужно предоставить данные.
                Формат JSON для запроса данных:
                {
                  "action": "request_data",
                  "reason": "Краткое объяснение для пользователя, зачем тебе данные. Например: 'Чтобы проанализировать ваши траты, мне нужны данные о транзакциях.'",
                  "data_needed": {
                    "type": "transactions",
                    "period": "last_month"
                  }
                }
            
            4.  **Уточнение:** Если запрос пользователя нечеткий (например, "Покажи мои траты"), попроси его уточнить период. Например: "Конечно! За какой период вы хотите посмотреть траты? Например, за последнюю неделю, месяц или год?".
            
            5.  **Тон:** Будь вежливым, позитивным и поддерживающим.
            """;

    public String getChatResponse(String userMessage) {
        Prompt firstPrompt = createPrompt(userMessage);
        String firstResponse = chatClient.prompt(firstPrompt).call().content();

        try {
            DataRequestAction action = objectMapper.readValue(firstResponse, DataRequestAction.class);

            if ("request_data".equals(action.getAction())) {
                return handleDataRequest(action, userMessage);
            }
        } catch (JsonProcessingException e) {
            return firstResponse;
        }

        return firstResponse;
    }

    private Prompt createPrompt(String userMessage) {
        var systemMessage = new SystemMessage(SYSTEM_PROMPT);
        var message = new UserMessage(userMessage);

        return new Prompt(List.of(systemMessage, message));
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

        switch (dataNeeded.getType()) {
            case "transactions" -> data = transactionService.getHistory(null, null, PageRequest.of(0, 100));
            case "categories" -> data = categoryService.getAllByUser();
            case "budgets" -> data = budgetService.getUserBudgets();
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
}
