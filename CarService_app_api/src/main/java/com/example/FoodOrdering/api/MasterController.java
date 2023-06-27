package com.example.FoodOrdering.api;

import com.example.FoodOrdering.exception.CarServiceNotFoundException;
import com.example.FoodOrdering.exception.MasterNotFoundException;
import com.example.FoodOrdering.model.CarService;
import com.example.FoodOrdering.model.Master;
import com.example.FoodOrdering.service.MasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/CarService/master")
public class MasterController {
    private final MasterService masterService;

    @Autowired
    public MasterController(MasterService mealService) {
        this.masterService = mealService;
    }

    @PostMapping("/rate/{masterId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Master> addRating(@PathVariable) {
        masterService.createMaster(master,carServiceId);
        return ResponseEntity.ok(master);
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Master> createMaster(@RequestBody Master master, @RequestParam("carServiceId") Long carServiceId) throws CarServiceNotFoundException {
        masterService.createMaster(master,carServiceId);
        return ResponseEntity.ok(master);
    }

    @DeleteMapping("/delete/{masterId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Master> deleteMaster(@PathVariable Long masterId) throws MasterNotFoundException {
        masterService.removeMaster(masterId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public List<Master> getAllMasters() {
        return masterService.getMasters();
    }

    @PutMapping("/update/{masterId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Master> updateMaster(@PathVariable Long masterId, @RequestBody Master master) throws MasterNotFoundException {
        masterService.updateMaster(masterId,master);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{masterId}")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public Master getOneMaster(@PathVariable Long masterId) throws MasterNotFoundException {
        return masterService.getOneMaster(masterId);
    }

}
