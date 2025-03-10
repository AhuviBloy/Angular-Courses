import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  setUserDetails(): Observable<User> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.userId;

    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
}
