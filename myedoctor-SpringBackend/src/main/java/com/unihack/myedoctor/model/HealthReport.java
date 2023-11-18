package com.unihack.myedoctor.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "checkups")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HealthReport {

    @Id
    private String id;

    @NonNull
    private String userId;

    @NonNull
    private Location doctorLocation;

    @NonNull
    private Long creationTimestamp;

    @NonNull
    private List<String> diseases;

}
