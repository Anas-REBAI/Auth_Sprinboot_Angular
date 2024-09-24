package com.example.entreprise.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Entreprise {

    @Id
    private String matricule;

    private String mdp;
    private String nom;
    private String adresse;
    private String email;
    private Long phone;
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    private Image Logo;

}