import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './Models/Login';
import { Entreprise, updateEntreprise } from './Models/Entreprise';
import { ResetPasswordRequest } from './Models/ResetPassword';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  private baseUrl = environment.apiUrlDeBase;

  entrepriseURL: string = `${this.baseUrl}/api/entreprise/crud`;

  constructor(private http : HttpClient) { }

  signUp(formData: FormData): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.entrepriseURL}/addEntreprise`, formData)
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.entrepriseURL}/login`, loginRequest)
  }

  forgetPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.entrepriseURL}/forgetPassword/${email}`, {})
  }

  resetPassword(request: ResetPasswordRequest): Observable<any> {
    return this.http.post<void>(`${this.entrepriseURL}/resetpassword`, request);
  }

  updateLogo(matricule: string, file: File): Observable<Entreprise> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.put<Entreprise>(`${this.entrepriseURL}/${matricule}/logo`, formData);
  }

  // Get entreprise by matricule
  getEntrepriseByMatricule(matricule: string): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.entrepriseURL}/getByMatricule/${matricule}`);
  }

  // Delete entreprise by matricule
  deleteEntreprise(matricule: string): Observable<void> {
    return this.http.delete<void>(`${this.entrepriseURL}/delete/${matricule}`);
  }

  // Update entreprise
  updateEntreprise(matricule: string, updateEntreprise:updateEntreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.entrepriseURL}/update/${matricule}`, updateEntreprise);
  }

  // Update Password
  changePassword(matricule: string, pwd:any): Observable<any> {
    return this.http.put<any>(`${this.entrepriseURL}/${matricule}/change-password`, pwd, 
      {responseType: 'text' as 'json' }
    );
  }



}