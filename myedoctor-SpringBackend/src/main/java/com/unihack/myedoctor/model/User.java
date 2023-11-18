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
    private String id;

    @NonNull
    @Email(message = "Email should be valid")
    private String email;

    @NonNull
    @Size(min = 3, max = 15, message = "Firstname must be between 3 and 15 characters")
    private String firstName;

    @NonNull
    @Size(min = 3, max = 15, message = "Lastname must be between 3 and 15 characters")
    private String lastName;

    @NonNull
    private Location location;

    @NonNull
    @JsonFormat(timezone = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @NonNull
    private OccupationField occupationField;
}
