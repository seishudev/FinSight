package com.halcyon.backend.schedule;

import com.halcyon.backend.repository.AiChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class ChatCleanupService {

    private final AiChatMessageRepository aiChatMessageRepository;

    public static final long CLEANUP_HOURS = 40;

    @Scheduled(cron = "0 0 */6 * * *")
    @Transactional
    public void cleanupOldMessages() {
        Instant cutoff = Instant.now().minus(CLEANUP_HOURS, ChronoUnit.HOURS);
        aiChatMessageRepository.deleteMessagesOlderThan(cutoff);
    }
}
