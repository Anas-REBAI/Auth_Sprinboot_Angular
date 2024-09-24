// login-request model
export interface LoginRequest {
    matricule: string;
    mdp: string;
}
  

// login-response model
export interface LoginResponse {
    status: number;
    message: string;
    token?: string;
}