package com.example.FoodOrdering.api;

import com.example.FoodOrdering.model.CarService;
import com.example.FoodOrdering.service.CarServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/CarService/service")

public class CarServiceController {
    private final CarServiceService carServiceService;

    @Autowired
    public CarServiceController(CarServiceService menuService) {
        this.carServiceService = menuService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') ")
    public List<CarService> getAll() {
        return carServiceService.getAllCarServices();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public ResponseEntity getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(carServiceService.getCarServiceById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity update(@PathVariable Long id, @RequestBody CarService carService) {
        try {
            carServiceService.updateCarService(id, carService);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity create(@RequestBody CarService carService) {
        try {
            return ResponseEntity.ok(carServiceService.createCarService(carService));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            carServiceService.deleteCarService(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }
}
