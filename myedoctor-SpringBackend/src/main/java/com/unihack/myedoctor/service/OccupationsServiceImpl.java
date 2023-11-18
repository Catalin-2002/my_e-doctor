package com.unihack.myedoctor.service;

import com.unihack.myedoctor.model.OccupationField;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OccupationsServiceImpl implements OccupationsService {
    @Override
    public List<String> getAllOccupations() {
        return Arrays.stream(OccupationField.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
