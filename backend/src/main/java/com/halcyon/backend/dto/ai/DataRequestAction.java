package com.halcyon.backend.dto.ai;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class DataRequestAction {

    private String action;
    private String reason;

    @JsonProperty("data_needed")
    private DataNeeded dataNeeded;

    @Data
    @NoArgsConstructor
    public static class DataNeeded {
        private String type;
        private String period;
    }
}
