import { User } from './../shared/models/user';
import { inject, Injectable } from '@angular/core';
import { envinronment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = `${envinronment.apiURL}/users`;
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}`, user).pipe(take(1));
  }

  getAuthenticatedUser(): Observable<User> {
    const userId = this.getUserIdFromToken();
    if (!userId) throw new Error('Usuário não autenticado');

    return this.http.get<User>(`${this.baseURL}/${userId}`);
  }

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.user_id || null;
  }
}
