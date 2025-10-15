package com.mohan.studentresources.service;

import com.mohan.studentresources.model.Material;
import com.mohan.studentresources.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // <-- ADDED ANNOTATION
public class MaterialService {
    
    @Autowired
    private MaterialRepository materialRepository; // <-- ADDED DEPENDENCY

    // ADDED BUSINESS LOGIC METHOD
    public List<Material> getApprovedMaterials(String semester, String subject, String group, String year, String type) {
        // Fetch all approved materials, ordered by newest first.
        List<Material> all = materialRepository.findByApprovedTrueOrderByIdDesc();

        // Simple filter logic (now in service layer)
        return all.stream()
                .filter(m -> semester == null || m.getSemester().equalsIgnoreCase(semester))
                .filter(m -> subject == null || m.getSubject().equalsIgnoreCase(subject))
                .filter(m -> group == null || m.getGroupName() == null || m.getGroupName().equalsIgnoreCase(group))
                .filter(m -> year == null || m.getUploadYear().equalsIgnoreCase(year))
                .filter(m -> type == null || type.equalsIgnoreCase("all") || m.getType().equalsIgnoreCase(type))
                .toList();
    }
}