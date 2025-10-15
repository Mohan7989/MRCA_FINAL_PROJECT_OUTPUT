package com.mohan.studentresources.controller;

import com.mohan.studentresources.model.Material;
import com.mohan.studentresources.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private MaterialRepository materialRepository;


     @GetMapping("/pending")
    public List<Material> getPendingMaterials() {
        // CHANGED from .findAll().stream().filter(...) to dedicated repository method
        return materialRepository.findByApprovedFalse();
    }
   

    @PutMapping("/approve/{id}")
    public String approveMaterial(@PathVariable Long id) {
        Material m = materialRepository.findById(id).orElse(null);
        if (m != null) {
            m.setApproved(true);
            materialRepository.save(m);
            return "Approved!";
        }
        return "Not Found";
    }

    @DeleteMapping("/reject/{id}")
    public String rejectMaterial(@PathVariable Long id) {
        materialRepository.deleteById(id);
        return "Deleted!";
    }
}
