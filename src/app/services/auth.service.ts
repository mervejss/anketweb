// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() !== null;
  }

  getUserInfo(): Observable<any> {
    const token = this.getAuthToken();

    if (token) {
      // Token varsa, sunucuya gidip kullanıcı bilgilerini çek
      return this.http.get<any>('http://localhost:3000/api/getUserInfo');
    } else {
      // Token yoksa, boş bir observable döndür
      return new Observable();
    }
  }

  logout(): void {
    this.removeAuthToken();
    // Ek olarak, diğer temizleme işlemlerini de buraya ekleyebilirsiniz
  }
}
