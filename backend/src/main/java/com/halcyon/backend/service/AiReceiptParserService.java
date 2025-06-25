package com.halcyon.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.halcyon.backend.dto.category.CategoryResponse;
import com.halcyon.backend.dto.receipt.ParsedReceiptData;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiReceiptParserService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    private static final String SYSTEM_PROMPT = """
            Ты — высокоточный ассистент по обработке кассовых чеков. Твоя задача — проанализировать сырой текст с чека и список доступных категорий пользователя, а затем извлечь из него три ключевых элемента: общую сумму, список покупок и наиболее подходящий ID категории.
            
            Твой ответ должен быть СТРОГО в формате JSON со следующей структурой:
            {
              "total_amount": <число>,
              "suggested_category_id": <число, ID категории>,
              "items": ["<Покупка 1>", "<Покупка 2>", ...]
            }
            
            Правила:
            1.  `total_amount`: Найди итоговую сумму чека. Она обычно находится рядом со словами "ИТОГ", "ВСЕГО", "TOTAL". Укажи ее как число с плавающей точкой.
            2.  `suggested_category_id`: Проанализируй список покупок и выбери ОДНУ, наиболее подходящую категорию из предоставленного списка категорий пользователя. Верни ее ID. Если ни одна категория не подходит, верни null.
            3.  `items`: Сформируй список из названий всех товаров/услуг, найденных в чеке.
            4.  Не добавляй в ответ ничего, кроме этого JSON-объекта.
            """;

    public ParsedReceiptData parseAndRecognize(String receiptText, List<CategoryResponse> availableCategories) {
        String categoriesAsJson;

        try {
            categoriesAsJson = objectMapper.writeValueAsString(availableCategories);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize categories.", e);
        }

        String userMessageContent = String.format(
                "Вот текст с чека:\n---\n%s\n---\n\nА вот список доступных категорий пользователя:\n---\n%s\n---\n\nПожалуйста, обработай эту информацию и верни результат в требуемом JSON-формате.",
                receiptText, categoriesAsJson
        );

        var systemMessage = new SystemMessage(SYSTEM_PROMPT);
        var userMessage = new UserMessage(userMessageContent);
        var prompt = new Prompt(List.of(systemMessage, userMessage));

        String responseContent = chatClient.prompt(prompt).call().content();

        try {
            return objectMapper.readValue(responseContent, ParsedReceiptData.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
