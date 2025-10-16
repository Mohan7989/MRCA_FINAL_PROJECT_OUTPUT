package com.mohan.studentresources.controller;

import com.mohan.studentresources.model.Material;
import com.mohan.studentresources.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
// Changed base mapping to avoid conflict with /api/materials provided by MaterialController
@RequestMapping("/api/legacy")
@CrossOrigin(origins = "https://mrca-final-project-output.vercel.app/")
public class MaterialsController {

    @Autowired
    private MaterialRepository materialRepository;

    // GET /api/legacy/materials?semester=sem-1&subject=Physics&year=2024&type=pdf
    @GetMapping("/materials")
    public Map<String, Object> getMaterials(
            @RequestParam(required = false) String semester,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String group,
            @RequestParam(required = false, name = "year") String uploadYear,
            @RequestParam(required = false) String type
    ) {
        // Load approved materials and apply simple in-memory filters to keep controller simple
        List<Material> all = materialRepository.findByApprovedTrue();

        List<Material> filtered = all.stream().filter(m -> {
            if (semester != null && !semester.isBlank() && !semester.equalsIgnoreCase("All")) {
                if (m.getSemester() == null || !m.getSemester().equalsIgnoreCase(semester)) return false;
            }
            if (subject != null && !subject.isBlank() && !subject.equalsIgnoreCase("All")) {
                if (m.getSubject() == null || !m.getSubject().equalsIgnoreCase(subject)) return false;
            }
            if (group != null && !group.isBlank()) {
                if (m.getGroupName() == null || !m.getGroupName().equalsIgnoreCase(group)) return false;
            }
            if (uploadYear != null && !uploadYear.isBlank() && !uploadYear.equalsIgnoreCase("All")) {
                if (m.getUploadYear() == null || !m.getUploadYear().equalsIgnoreCase(uploadYear)) return false;
            }
            if (type != null && !type.isBlank() && !type.equalsIgnoreCase("All")) {
                if (m.getType() == null || !m.getType().equalsIgnoreCase(type)) return false;
            }
            return true;
        }).collect(Collectors.toList());

        Map<String, Object> resp = new HashMap<>();
        resp.put("items", filtered);
        resp.put("total", filtered.size());
        return resp;
    }
}
