import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from 'src/app/demo/service/Enterprise_service/enterprise.service';
import { SharedService } from 'src/app/demo/service/Shared_service/shared.service';
import { MessageService } from 'primeng/api';
import { SweetAlert2Service } from 'src/app/demo/service/SweetAlert_service/sweet-alert2.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrl: './profile-delete.component.scss',
  providers: [MessageService],
})
export class ProfileDeleteComponent implements OnInit{

  matricule: string;

  pwdForm! : FormGroup;

  deleteAccountDialog: boolean = false;

  constructor(
    private enterpriseService: EnterpriseService,
    private sharedService : SharedService,
    private messageService: MessageService,
    private sweetAlertService: SweetAlert2Service,
    private formBuilder: FormBuilder,
  ) { }

  
  ngOnInit() {
    this.matricule = this.sharedService.getUserInfo('username');
    this.prepareForm();
  }


  prepareForm(){
    this.pwdForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      newPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }


  updatePwd() {

    const confirmPassword = this.pwdForm.get('confirmPassword')?.value;

    const pwd: any = {
      oldPassword: this.pwdForm.get('oldPassword')?.value,
      newPassword: this.pwdForm.get('newPassword')?.value,
    };

    if (pwd.newPassword === confirmPassword) {
      this.enterpriseService.changePassword(this.matricule, pwd).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully.' });
          this.prepareForm();
        }, 
        (error) => {
          console.error("Error changing password:", error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to change password. Old password might be incorrect.' });
          this.prepareForm();
        });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'New password and confirmation do not match.' });
      this.prepareForm();
    }
  }


  deleteDialog(){
    this.deleteAccountDialog = true
  }


  deleteAccount(){
    if (this.matricule) {
      this.enterpriseService.deleteEntreprise(this.matricule).subscribe({
        next: () => {
          this.sharedService.logOut()
          this.sweetAlertService.Toast.fire({
            icon: 'success',
            title: 'Entreprise deleted successfully'
          });   
        },
        error: (err) => {
          this.sweetAlertService.Toast.fire({
            icon: "error",
            title: "Error deleting entreprise"
          });
        }
      });
    }
  }



}
