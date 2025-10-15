package com.mohan.studentresources.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mohan.studentresources.model.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    List<Material> findByApprovedTrueOrderByIdDesc();

    List<Material> findBySemesterAndApprovedTrue(String semester);
     List<Material> findByApprovedFalse(); 
}
