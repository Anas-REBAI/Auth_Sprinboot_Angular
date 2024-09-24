import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', component: LoginComponent},
        { path: 'signup', component: SignupComponent },
        { path: 'forgetPwd', component: ForgetPwdComponent },
        { path: 'resetpassword/:token', component: ResetPwdComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
