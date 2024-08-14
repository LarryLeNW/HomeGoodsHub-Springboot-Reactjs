package com.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "category")
public class Category {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer categoryId;

	    @Column(name = "name", columnDefinition = "NVARCHAR(255)")
	    private String name;

	    @Column(name = "thumb", columnDefinition = "NVARCHAR(255)")
	    private String thumb;

	    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
	    private String description;
}
