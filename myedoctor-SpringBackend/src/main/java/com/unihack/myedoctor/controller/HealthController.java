package com.unihack.myedoctor.controller;

import com.unihack.myedoctor.model.HealthReport;
import com.unihack.myedoctor.service.HealthReportService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
public class HealthController {
    private final HealthReportService healthReportService;

    @GetMapping("/all")
    public ResponseEntity<List<HealthReport>> getAllHealthReports() {
        return ResponseEntity.ok(healthReportService.getAllHealthReports());
    }

    @GetMapping("/health-report/{healthReportId}")
    public ResponseEntity<HealthReport> getHealthReportById(@PathVariable String healthReportId) {
        return ResponseEntity.ok(healthReportService.getHealthReportById(healthReportId));
    }

    @GetMapping("/health-report")
    public ResponseEntity<List<HealthReport>> getHealthReportByUserIdAndDiseaseAndAge(@RequestParam String userId, @RequestParam String disease, @RequestParam Integer minAge, @RequestParam Integer maxAge) {
        return ResponseEntity.ok(healthReportService.getHealthReportByUserIdAndDiseaseAndAge(userId, disease, minAge, maxAge));
    }
}
