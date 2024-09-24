import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnterpriseService } from 'src/app/demo/service/Enterprise_service/enterprise.service';
import { SweetAlert2Service } from 'src/app/demo/service/SweetAlert_service/sweet-alert2.service';
import { Entreprise } from 'src/app/demo/service/Enterprise_service/Models/Entreprise';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class SignupComponent {

  password!: string;
  signupForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private enterpriseService: EnterpriseService,
    private sweetAlertService: SweetAlert2Service
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  // Initialiser le formulaire
  prepareForm() {
    this.signupForm = this.formBuilder.group({
      matricule: ['', [Validators.required, Validators.minLength(3)]],
      mdp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', Validators.required],
      logo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      role: [{ value: 'ENTREPRISE', disabled: true }]
    });
  }

  // Gestion de la sélection d'image
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    if (file && (file.size > MAX_FILE_SIZE)) {
      this.sweetAlertService.Toast.fire({
        icon: 'error',
        title: 'File size exceeds the limit of 10 MB'
      });
      return;
    } else if (file) {
      this.signupForm.patchValue({ logo: file });
      this.signupForm.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Soumission du formulaire de création de compte
  signup() {
    if (this.signupForm.valid) {
      const formData = new FormData();

      // Append form data
      formData.append('entreprise', new Blob([JSON.stringify({
        matricule: this.signupForm.get('matricule')?.value,
        mdp: this.signupForm.get('mdp')?.value,
        nom: this.signupForm.get('nom')?.value,
        adresse: this.signupForm.get('adresse')?.value,
        email: this.signupForm.get('email')?.value,
        phone: this.signupForm.get('phone')?.value,
        role: this.signupForm.get('role')?.value,
      })], { type: 'application/json' }));

      formData.append('logo', this.signupForm.get('logo')?.value);

      // Appel au service pour créer l'entreprise
      this.enterpriseService.signUp(formData).subscribe({
        next: (response: Entreprise) => {
          console.log('Signup successful', response);
          this.router.navigate(['/auth/login']);
          this.sweetAlertService.Toast.fire({
            icon: 'success',
            title: 'Account created with success'
          });
        },
        error: (error) => {
          console.error('Signup failed', error);
          // Gestion améliorée des erreurs HTTP
          let errorMessage = 'An error occurred while creating the account';
          if (error.error && error.error.message) {
            errorMessage = error.error.message; // Si l'erreur contient un message, l'afficher
          }
          this.sweetAlertService.Toast.fire({
            icon: 'error',
            title: errorMessage
          });
        }
      });
    } else {
      console.error('Form is invalid');
      this.sweetAlertService.Toast.fire({
        icon: 'error',
        title: 'Form is invalid'
      });
    }
  }

}