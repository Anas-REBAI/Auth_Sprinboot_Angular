// entreprise model
export interface Entreprise {
    matricule: string;
    mdp: string;
    nom: string;
    adresse: string;
    logo: string;
    email: string;
    phone: number;
    roles: any;
}


export interface updateEntreprise {
    nom: string;
    adresse: string;
    email: string;
    phone: number;
}