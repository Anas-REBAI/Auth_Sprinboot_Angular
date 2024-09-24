import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnterpriseService } from 'src/app/demo/service/Enterprise_service/enterprise.service';
import { SweetAlert2Service } from 'src/app/demo/service/SweetAlert_service/sweet-alert2.service';
import { LoginRequest, LoginResponse } from 'src/app/demo/service/Enterprise_service/Models/Login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    
    loginForm! : FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private enterpriseService: EnterpriseService,
        private sweetAlertService: SweetAlert2Service,
        public layoutService: LayoutService
    ) { }

    ngOnInit(): void {
        this.prepareForm();
    }
    
    prepareForm(){
        this.loginForm = this.formBuilder.group({
            matricule:["", Validators.required],
            mdp:["", Validators.required],
        });
    }

    
    login() {
        if (this.loginForm.valid) {

            const loginRequest: LoginRequest = {
                matricule: this.loginForm.get('matricule')?.value,
                mdp: this.loginForm.get('mdp')?.value
            };

            this.enterpriseService.login(loginRequest).subscribe(
                (response: LoginResponse) => {
                    console.log('user connected', response.message);
                    if (response.token){
                        sessionStorage.setItem("token", response.token);
                        this.router.navigate(["/layout/dashboard"]);
                        this.sweetAlertService.Toast.fire({
                            icon: 'success',
                            title: 'Welcome'
                        });
                    }
                },
                (error) => {
                    console.error('Login failed', error);
                    // Optionally reset the form or show an error message
                    this.prepareForm();
                    this.sweetAlertService.Toast.fire({
                        icon: "error",
                        title: "Please check Matricule and Password"
                    });
                }
            );
        } else {
            console.error('Form is invalid');
            this.sweetAlertService.Toast.fire({
                icon: "error",
                title: "Form is invalid"
            });
        }
    }


}
