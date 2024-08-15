package com.backend.entity;

import lombok.Data;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;

    @Column(name = "name", columnDefinition = "NVARCHAR(255)")
	private String name;

    @Column(name = "images", columnDefinition = "NVARCHAR(255)")
	private String images;

    @Column(name = "thumb", columnDefinition = "NVARCHAR(255)")
	private String thumb;

    @Column(name = "description", columnDefinition = "NVARCHAR(255)")
	private String description;

	private Integer quantity;

	private double unitPrice;

	private Integer discount;
	
	private Integer sold = 0 ;

	private Boolean status = true;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createdAt")
	private Date createdAt;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updatedAt")
	private Date updatedAt;

}
