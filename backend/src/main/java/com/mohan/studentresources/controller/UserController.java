// Create new file: UserController.java
package com.mohan.studentresources.controller;

import com.mohan.studentresources.model.Material;
import com.mohan.studentresources.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "https://mrca-final-project-output.vercel.app/")
public class UserController {

    @Autowired
    private MaterialRepository materialRepository;

    // Get user's uploads with status
    @GetMapping("/uploads")
    public List<Material> getUserUploads(@RequestParam String uploaderName) {
        return materialRepository.findByUploaderNameOrderByIdDesc(uploaderName);
    }
    
    // Check status of specific upload
    @GetMapping("/status/{id}")
    public String getUploadStatus(@PathVariable Long id) {
        Material material = materialRepository.findById(id).orElse(null);
        if (material != null) {
            return material.isApproved() ? "approved" : "pending";
        }
        return "not_found";
    }
}