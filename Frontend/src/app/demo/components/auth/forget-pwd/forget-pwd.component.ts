import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnterpriseService } from 'src/app/demo/service/Enterprise_service/enterprise.service';
import { SweetAlert2Service } from 'src/app/demo/service/SweetAlert_service/sweet-alert2.service';

@Component({
    selector: 'app-forget-pwd',
    templateUrl: './forget-pwd.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class ForgetPwdComponent {

  forgotPwdForm! : FormGroup;
    
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

  prepareForm() {
    this.forgotPwdForm = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]]
    })
  }

  forgot() {
    if (this.forgotPwdForm.invalid) {
      this.prepareForm();
      this.sweetAlertService.Toast.fire({
        icon: "error",
        title: "Email must be a valid format. Please try again."
      });
      return;
    }

    const email = this.forgotPwdForm.get('email')?.value;

    this.enterpriseService.forgetPassword(email).subscribe({
        next: () => { 
          this.sweetAlertService.Toast.fire({
            icon: 'success',
            title: 'Email Sent, Please check your email to reset your password.'
          });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.prepareForm();
          this.sweetAlertService.Toast.fire({
            icon: "error",
            title: "Something went wrong. Please try again."
          });
        }
    });
  }
    
  
}