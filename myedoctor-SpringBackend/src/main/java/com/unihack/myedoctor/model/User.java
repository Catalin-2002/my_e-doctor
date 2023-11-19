package com.unihack.myedoctor.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Data
@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    private String userId;

    @NonNull
    @Email(message = "Email should be valid")
    private String email;


    private String firstName;

    private String lastName;

    private Location location;

    @JsonFormat(timezone = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    private OccupationField occupationField;
}
