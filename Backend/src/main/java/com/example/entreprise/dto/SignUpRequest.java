package com.example.entreprise.dto;

import com.example.entreprise.entities.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
    private String matricule;
    private String mdp;
    private String nom;
    private String adresse;
    private String email;
    private Long phone;
    private Role role;
}