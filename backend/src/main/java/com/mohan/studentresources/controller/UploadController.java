package com.mohan.studentresources.controller;

import com.mohan.studentresources.model.Material;
import com.mohan.studentresources.repository.MaterialRepository;
import com.mohan.studentresources.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin(origins = "http://localhost:3000")// allow frontend
public class UploadController {

    @Autowired
    private StorageService storageService;

    @Autowired
    private MaterialRepository materialRepository;

    @PostMapping
    public Material uploadMaterial(@RequestParam("file") MultipartFile file,
                                   @RequestParam String title,
                                   @RequestParam String subject,
                                   @RequestParam(required = false) String group,
                                   @RequestParam String type,
                                   @RequestParam String semester,
                                   @RequestParam String year,
                                   @RequestParam(required = false) String uploaderName) throws Exception {

        String fileUrl = storageService.storeFile(file);

        Material m = new Material();
        m.setTitle(title);
        m.setSubject(subject);
        m.setGroupName(group);
        m.setType(type);
        m.setSemester(semester);
        m.setUploadYear(year);
        m.setUploaderName(uploaderName);
        m.setFileUrl(fileUrl);
        m.setApproved(false); // default: pending

        return materialRepository.save(m);
    }
}
