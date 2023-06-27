package com.example.FoodOrdering.repository;

import com.example.FoodOrdering.model.CarService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarServiceRepository extends JpaRepository<CarService,Long> {
}
