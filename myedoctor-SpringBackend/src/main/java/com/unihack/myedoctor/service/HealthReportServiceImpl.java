package com.unihack.myedoctor.service;

import com.unihack.myedoctor.exception.HealthReportNotFoundException;
import com.unihack.myedoctor.exception.UserNotFoundException;
import com.unihack.myedoctor.model.HealthReport;
import com.unihack.myedoctor.model.User;
import com.unihack.myedoctor.repository.HealthReportRepository;
import com.unihack.myedoctor.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthReportServiceImpl implements HealthReportService{

    private final HealthReportRepository healthReportRepository;
    private final UserRepository userRepository;

    @Override
    public List<HealthReport> getAllHealthReports() {
        return healthReportRepository.findAll();
    }

    @Override
    public HealthReport createHealthReport(HealthReport healthReport) {
        return healthReportRepository.save(healthReport);
    }

    @Override
    public HealthReport getHealthReportById(String healthReportId) {
        return healthReportRepository.findById(healthReportId).orElseThrow(() -> new HealthReportNotFoundException("Health report with id: " + healthReportId + "not found"));
    }

    @Override
    public List<HealthReport> getHealthReportByUserIdAndDiseaseAndAge(String userId, String disease, Integer minAge, Integer maxAge) {
        List<HealthReport> reports = healthReportRepository.findByUserIdAndDiseasesContains(userId, disease);
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id: " + userId + "not found"));
        int userAge = calculateAge(user.getDateOfBirth(), LocalDate.now());

        if (userAge >= minAge && userAge <= maxAge) {
            return reports;
        }

        return List.of();

    }
    private int calculateAge(LocalDate birthDate, LocalDate currentDate) {
        if ((birthDate != null) && (currentDate != null)) {
            return birthDate.until(currentDate).getYears();
        } else {
            return 0;
        }
    }
}
