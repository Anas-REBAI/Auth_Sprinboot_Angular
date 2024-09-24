import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnterpriseService } from 'src/app/demo/service/Enterprise_service/enterprise.service';
import { Entreprise, updateEntreprise } from 'src/app/demo/service/Enterprise_service/Models/Entreprise';
import { SharedService } from 'src/app/demo/service/Shared_service/shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile-informations',
  templateUrl: './profile-informations.component.html',
  styleUrl: './profile-informations.component.scss',
  providers: [MessageService],
})
export class ProfileInformationsComponent implements OnInit{

  selectedFile: File | null = null;
  entreprise: updateEntreprise | null = null;
  logo: { imageURL: string } = { imageURL: '' };
  matricule:any

  userForm! : FormGroup;
  findedUser : any;

  constructor(
    private sharedService : SharedService ,
    private entrepriseService : EnterpriseService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.logo = this.sharedService.getUserInfo('logo');
    this.matricule = this.sharedService.getUserInfo('username');
    this.prepareForm();
    this.getProfileInformations();
  }

  prepareForm(){
    this.userForm = this.formBuilder.group({
      matricule: [{value: "", disabled: true}],
      nom: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      adresse: ["", Validators.required],
    });
  }

  getProfileInformations(){
    this.entrepriseService.getEntrepriseByMatricule(this.matricule).subscribe((data)=>{
      this.userForm.patchValue({
        matricule: data.matricule,
        nom: data.nom,
        email: data.email,
        phone: data.phone,
        adresse: data.adresse,
      })
    });
  }

  editProfile() {
    if (this.userForm.valid) {
      const updatedEntreprise: updateEntreprise = {
        nom: this.userForm.get('nom')?.value,
        email: this.userForm.get('email')?.value,
        phone: this.userForm.get('phone')?.value,
        adresse: this.userForm.get('adresse')?.value

      };
  
      this.entrepriseService.updateEntreprise(this.matricule,updatedEntreprise)
        .subscribe(
           () => {
            this.getProfileInformations();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
          },
           (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an error updating the profile' });
          }
        );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please correct the validation errors in the form.' });
    }
  }
  

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      
      // For image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logo.imageURL = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateLogo(): void {
    if (this.selectedFile) {
      this.entrepriseService.updateLogo(this.matricule, this.selectedFile).subscribe({
        next: (data) => {
          this.entreprise = data;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logo updated successfully' });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an error updating the logo' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a file first.' });
    }
  }

}