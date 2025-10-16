package com.mohan.studentresources.repository;

import com.mohan.studentresources.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
	// used in admin controller
	List<Material> findByApprovedFalse();
	List<Material> findByApprovedTrue();

	// used by MaterialService to return approved items ordered newest first
	List<Material> findByApprovedTrueOrderByIdDesc();
}
