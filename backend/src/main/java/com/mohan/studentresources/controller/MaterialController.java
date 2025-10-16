package com.mohan.studentresources.controller;

import com.mohan.studentresources.model.Material;
import com.mohan.studentresources.repository.MaterialRepository;
import com.mohan.studentresources.service.MaterialService; // <-- ADDED
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "https://mrca-final-project-output.vercel.app/")
public class MaterialController {

    @Autowired
    // private MaterialRepository materialRepository; // <-- REMOVED REPOSITORY
    private MaterialService materialService; // <-- ADDED SERVICE
    @Autowired
    private MaterialRepository materialRepository;

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

    // GET /api/legacy/materials?semester=sem-1&subject=Physics&year=2024&type=pdf
    @GetMapping("/legacy/materials")
    public Map<String, Object> getMaterialsLegacy(
            @RequestParam(required = false) String semester,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String group,
            @RequestParam(required = false, name = "year") String uploadYear,
            @RequestParam(required = false) String type
    ) {
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