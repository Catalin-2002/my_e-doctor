package com.unihack.myedoctor.repository;

import com.unihack.myedoctor.model.HealthReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthReportRepository extends MongoRepository<HealthReport, String> {
    List<HealthReport> findByUserIdAndDiseasesContains(String userId, String disease);
}
