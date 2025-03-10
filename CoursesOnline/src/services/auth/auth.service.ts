import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { log } from 'console';
import { Roles } from '../../enum/roles';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getUserId(): number | null {
    const userJson = sessionStorage.getItem('user'); // שליפת ה-JSON מה-session storage
  
    if (userJson) {
      const user = JSON.parse(userJson); // המרת ה-JSON לאובייקט
      const userId = user.id; // שליפת ה-ID של המשתמש
      return userId;
  }
  return null;
}
  
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) return true;
    return false;
  }

  // getToken(): any {
  //   return sessionStorage.getItem('authToken');
  // }
  
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('authToken');
    }
    return null; // או טיפול אחר אם לא בדפדפן
  }


  updateToken(response: any): void {
    const token = response.token;
    if (token) {
      sessionStorage.setItem('authToken', token);
    }
  }

  getRole(): Roles | null {
    var user = sessionStorage.getItem('user');
    if(user){
      return JSON.parse(user).role;
    }
    return null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/login`,
        { email, password },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response: any) => {
          this.updateToken(response);
        })
      );
  }
  register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/register`,
        { name, email, password, role },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response: any) => {
          this.updateToken(response);
        })
      );
  }

  logout(): void {
    null //sessionStorage.removeItem('authToken');
  }
}
