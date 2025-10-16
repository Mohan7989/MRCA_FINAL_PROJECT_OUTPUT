package com.mohan.studentresources.repository;

import com.mohan.studentresources.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
	// used in admin controller
	List<Material> findByApprovedFalse();
	List<Material> findByApprovedTrue();

	// Add this to MaterialRepository.java
@Query("SELECT m FROM Material m WHERE m.approved = true AND " +
       "(LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
       "LOWER(m.subject) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
       "LOWER(m.description) LIKE LOWER(CONCAT('%', :query, '%')))")
List<Material> searchApprovedMaterials(@Param("query") String query);

  // NEW: For users to see their upload status
    List<Material> findByUploaderNameOrderByIdDesc(String uploaderName);
	// used by MaterialService to return approved items ordered newest first
	List<Material> findByApprovedTrueOrderByIdDesc();
}
