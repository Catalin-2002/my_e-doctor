package com.unihack.myedoctor.service;

import com.unihack.myedoctor.model.HealthReport;

import java.util.List;

public interface HealthReportService {
    List<HealthReport> getAllHealthReports();
    HealthReport createHealthReport(HealthReport healthReport);
    HealthReport getHealthReportById(String healthReportId);
    List<HealthReport> getHealthReportByUserIdAndDiseaseAndAge(String userId, String disease, Integer minAge, Integer maxAge);
}
