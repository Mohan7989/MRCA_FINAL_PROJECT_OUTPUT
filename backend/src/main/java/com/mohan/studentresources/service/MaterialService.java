// MaterialService.java - Update the getApprovedMaterials method
package com.mohan.studentresources.service;

import com.mohan.studentresources.model.Material;
import com.mohan.studentresources.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {
    
    @Autowired
    private MaterialRepository materialRepository;

    public List<Material> getApprovedMaterials(String semester, String subject, String group, String year, String type) {
        // ONLY return approved materials
        List<Material> approvedMaterials = materialRepository.findByApprovedTrueOrderByIdDesc();
        
        return approvedMaterials.stream()
                .filter(m -> semester == null || semester.equals("All") || m.getSemester() == null || m.getSemester().equalsIgnoreCase(semester))
                .filter(m -> subject == null || subject.equals("All") || m.getSubject() == null || m.getSubject().equalsIgnoreCase(subject))
                .filter(m -> group == null || group.equals("All") || m.getGroupName() == null || m.getGroupName().equalsIgnoreCase(group))
                .filter(m -> year == null || year.equals("All") || m.getUploadYear() == null || m.getUploadYear().equalsIgnoreCase(year))
                .filter(m -> type == null || type.equals("All") || m.getType() == null || m.getType().equalsIgnoreCase(type))
                .toList();
    }
    
    // Add this method to get materials with status for users
    public List<Material> getUserMaterialsWithStatus(String uploaderName) {
        return materialRepository.findByUploaderNameOrderByIdDesc(uploaderName);
    }
}