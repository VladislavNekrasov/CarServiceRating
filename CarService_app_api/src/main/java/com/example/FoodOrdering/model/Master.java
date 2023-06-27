package com.example.FoodOrdering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "master")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Master {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;
    private String specialization;
    private String city;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "car_service_id")
    @ToString.Exclude
    private CarService carService;

    private List<Integer> rating;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Master master = (Master) o;
        return Objects.equals(id, master.id) && Objects.equals(firstname, master.firstname) && Objects.equals(lastname, master.lastname) && Objects.equals(specialization, master.specialization) && Objects.equals(city, master.city) && Objects.equals(carService, master.carService) && Objects.equals(rating, master.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstname, lastname, specialization, city, carService, rating);
    }
}