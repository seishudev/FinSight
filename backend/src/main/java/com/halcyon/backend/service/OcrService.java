package com.halcyon.backend.service;

import com.halcyon.backend.dto.category.CategoryResponse;
import com.halcyon.backend.dto.receipt.ParsedReceiptData;
import com.halcyon.backend.dto.receipt.ParsedTransactionResponse;
import com.halcyon.backend.exception.category.InvalidCategoryException;
import com.halcyon.backend.model.support.TransactionType;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OcrService {

    private final TesseractService tesseractService;
    private final AiReceiptParserService aiReceiptParserService;
    private final CategoryService categoryService;

    private static final List<String> ALLOWED_IMAGE_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp"
    );

    public ParsedTransactionResponse processReceiptImage(MultipartFile imageFile) {
        validateImageFileType(imageFile);

        try {
            String rawText = tesseractService.recognizeText(imageFile);

            List<CategoryResponse> expenseCategories = categoryService.getAllByType(TransactionType.EXPENSE);

            if (expenseCategories.isEmpty()) {
                return ParsedTransactionResponse.builder()
                        .allExpenseCategories(expenseCategories)
                        .build();
            }

            ParsedReceiptData parsedData = aiReceiptParserService.parseAndRecognize(rawText, expenseCategories);

            if (parsedData == null) {
                return ParsedTransactionResponse.builder()
                        .allExpenseCategories(expenseCategories)
                        .build();
            }

            CategoryResponse suggestedResponse = expenseCategories.stream()
                    .filter(category -> category.id().equals(parsedData.getSuggestedCategoryId()))
                    .findFirst()
                    .orElse(null);

            return ParsedTransactionResponse.builder()
                    .amount(parsedData.getTotalAmount())
                    .date(LocalDate.now())
                    .comment(String.join("\n", parsedData.getItems()))
                    .suggestedCategory(suggestedResponse)
                    .allExpenseCategories(expenseCategories)
                    .build();

        } catch (TesseractException | IOException e) {
            throw new RuntimeException("Error when processing the receipt image.", e);
        }
    }

    private void validateImageFileType(MultipartFile file) {
        String contentType = file.getContentType();

        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType)) {
            throw new InvalidCategoryException("Invalid file type. Please upload the image in JPEG, PNG, GIF or BMP format.");
        }
    }
}
