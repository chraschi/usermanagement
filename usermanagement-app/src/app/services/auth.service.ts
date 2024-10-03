import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Methode zum Abrufen des Tokens (z.B. aus dem Local Storage)
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Hier kannst du anpassen, wo das Token gespeichert wird
  }

  // Methode zum Setzen des Tokens (z.B. nach dem Login)
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Methode zum Entfernen des Tokens (z.B. beim Logout)
  removeToken(): void {
    localStorage.removeItem('authToken');
  }
}
