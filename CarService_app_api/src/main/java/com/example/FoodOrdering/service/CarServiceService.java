package com.example.FoodOrdering.service;

import com.example.FoodOrdering.exception.CarServiceNotFoundException;
import com.example.FoodOrdering.model.CarService;
import com.example.FoodOrdering.repository.CarServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarServiceService {
    private final CarServiceRepository carServiceRepository;

    @Autowired
    public CarServiceService(CarServiceRepository carServiceRepository) {
        this.carServiceRepository = carServiceRepository;
    }

    public CarService createCarService(CarService carService) {
        return carServiceRepository.save(carService);
    }

    public void deleteCarService(Long id) {
        carServiceRepository.deleteById(id);
    }

    public List<CarService> getAllCarServices() {
        return carServiceRepository.findAll();
    }

    public CarService getCarServiceById(Long id) throws CarServiceNotFoundException {
        return carServiceRepository.findById(id)
                .orElseThrow(() -> new CarServiceNotFoundException("Car Service not found!"));
    }

    public CarService updateCarService(Long id, CarService carService) throws CarServiceNotFoundException {
        CarService existingCarService = carServiceRepository.findById(id)
                .orElseThrow(() -> new CarServiceNotFoundException("Car Service not found!"));

        existingCarService.setTitle(carService.getTitle());
        existingCarService.setAddress(carService.getAddress());
        existingCarService.setOwner(carService.getOwner());

        return carServiceRepository.save(existingCarService);
    }
}
