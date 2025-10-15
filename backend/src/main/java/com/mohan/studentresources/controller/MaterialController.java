package com.mohan.studentresources.controller;

import com.mohan.studentresources.model.Material;
// import com.mohan.studentresources.repository.MaterialRepository; // <-- REMOVED
import com.mohan.studentresources.service.MaterialService; // <-- ADDED
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialController {

    @Autowired
    // private MaterialRepository materialRepository; // <-- REMOVED REPOSITORY
    private MaterialService materialService; // <-- ADDED SERVICE

    @GetMapping
    public List<Material> getMaterials(
            @RequestParam(required = false) String semester,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String group,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String type
    ) {
        // DELEGATE FILTERING TO SERVICE
        return materialService.getApprovedMaterials(semester, subject, group, year, type);
    }
}