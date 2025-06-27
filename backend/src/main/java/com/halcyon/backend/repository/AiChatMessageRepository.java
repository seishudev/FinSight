package com.halcyon.backend.repository;

import com.halcyon.backend.model.AiChatMessage;
import com.halcyon.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface AiChatMessageRepository extends JpaRepository<AiChatMessage, Long> {

    List<AiChatMessage> findByUserOrderByCreatedAtAsc(User user);

    @Modifying
    @Query("DELETE FROM AiChatMessage m WHERE m.createdAt < :cutoff")
    void deleteMessagesOlderThan(Instant cutoff);

    void deleteAllByUser(User user);
}
