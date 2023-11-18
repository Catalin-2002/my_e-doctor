package com.unihack.myedoctor.controller;

import com.unihack.myedoctor.service.OccupationsService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/occupations")
public class OccupationsController {

    private final OccupationsService occupationsService;

    @GetMapping()
    public ResponseEntity<Iterable<String>> getAllOccupations() {
        return ResponseEntity.ok(occupationsService.getAllOccupations());
    }

}
