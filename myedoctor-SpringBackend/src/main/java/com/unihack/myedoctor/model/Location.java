package com.unihack.myedoctor.model;

import lombok.Data;

@Data
public class Location {
    private double latitude;
    private double longitude;
    private String address;
}
