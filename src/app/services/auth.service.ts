import { inject, Injectable } from '@angular/core';
import { envinronment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, take } from 'rxjs';
import { Login } from '../shared/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = `${envinronment.apiURL}/account`;
  private http = inject(HttpClient)
  private router = inject(Router);

  login(credentials: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseURL}/login`, credentials).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }

  private saveToken(token: string): void {
    localStorage.setItem('userToken', token);
  }
}
