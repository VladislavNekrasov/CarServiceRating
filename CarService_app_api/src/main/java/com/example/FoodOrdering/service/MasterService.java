package com.example.FoodOrdering.service;

import com.example.FoodOrdering.exception.CarServiceNotFoundException;
import com.example.FoodOrdering.exception.MasterNotFoundException;
import com.example.FoodOrdering.model.Master;
import com.example.FoodOrdering.model.CarService;
import com.example.FoodOrdering.repository.MasterRepository;
import com.example.FoodOrdering.repository.CarServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MasterService {
    private final MasterRepository masterRepository;
    private final CarServiceRepository carServiceRepository;

    @Autowired
    public MasterService(MasterRepository masterRepository, CarServiceRepository carServiceRepository) {
        this.masterRepository = masterRepository;
        this.carServiceRepository = carServiceRepository;
    }

    public Master createMaster(Master master, Long carServiceId) throws CarServiceNotFoundException {
        CarService carService = carServiceRepository.findById(carServiceId)
                .orElseThrow(() -> new CarServiceNotFoundException("Car Service not found!"));

        master.setCarService(carService);
        Master savedMaster = masterRepository.save(master);

        return savedMaster;
    }
    Public Master rate(Long masterId) {
        Master masterToRate = masterRepository.findById(masterId).orElseThrow(() -> new CarServiceNotFoundException("Car Service not found!"));

        Master savedMaster = masterRepository.save(master);
                return
    }

    public void removeMaster(Long masterId) throws MasterNotFoundException {
        Master master = masterRepository.findById(masterId).orElseThrow(() -> new MasterNotFoundException("Master not found!"));
        masterRepository.deleteById(masterId);
    }

    public List<Master> getMasters() {
        return masterRepository.findAll();
    }

    public Master getOneMaster(Long masterId) throws MasterNotFoundException {
        return masterRepository.findById(masterId).orElseThrow(() -> new MasterNotFoundException("Master not found"));
    }

    public Master updateMaster(Long masterId, Master master) throws MasterNotFoundException {
        Master existingMaster = masterRepository.findById(masterId).orElseThrow(() -> new MasterNotFoundException("Master not found"));

        existingMaster.setFirstname(master.getFirstname());
        existingMaster.setLastname(master.getLastname());
        existingMaster.setSpecialization(master.getSpecialization());
        existingMaster.setCity(master.getCity());
        existingMaster.setCarService(master.getCarService());

        masterRepository.save(existingMaster);
        return existingMaster;
    }
}
