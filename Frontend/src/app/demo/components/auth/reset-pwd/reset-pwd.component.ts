import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpriseService } from 'src/app/demo/service/Enterprise_service/enterprise.service';
import { SweetAlert2Service } from 'src/app/demo/service/SweetAlert_service/sweet-alert2.service';
import { ResetPasswordRequest } from 'src/app/demo/service/Enterprise_service/Models/ResetPassword';

@Component({
    selector: 'app-reset-pwd',
    templateUrl: './reset-pwd.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class ResetPwdComponent {

  resetPwdForm!: FormGroup;
  token!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private enterpriseService: EnterpriseService,
    private sweetAlertService: SweetAlert2Service,
    private route: ActivatedRoute,
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      console.log('Token:', this.token);
      if (!this.token) {
        this.sweetAlertService.Toast.fire({
          icon: "error",
          title: "Invalid password reset token. Please try again."
        });
      }
    });

    this.prepareForm();
  }

  prepareForm(){
    this.resetPwdForm = this.formBuilder.group({
      mdp: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }


  reset(): void {
    if (this.resetPwdForm.invalid) {
      this.sweetAlertService.Toast.fire({
        icon: "error",
        title: "Password must be between 6 and 12 characters. Please try again."
      });
      return;
    }

    const request: ResetPasswordRequest = {
      token: this.token!,
      mdp: this.resetPwdForm.get('mdp')?.value
    };

    this.enterpriseService.resetPassword(request).subscribe({
      next: () => {
        this.sweetAlertService.Toast.fire({
          icon: 'success',
          title: 'Your password has been reset successfully.'
        });
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.sweetAlertService.Toast.fire({
          icon: "error",
          title: "Something went wrong. Please try again."
        });
      }
    });
  }
  

}