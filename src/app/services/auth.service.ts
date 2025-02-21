import { inject, Injectable } from '@angular/core';
import { envinronment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, take, map, catchError, throwError } from 'rxjs';
import { Login } from '../shared/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = `${envinronment.apiURL}/account`;
  private http = inject(HttpClient)
  private router = inject(Router);

  login(credentials: Login): Observable<string> {
    return this.http.post<{ token?: string }>(`${this.baseURL}/login`, credentials).pipe(
      tap(response => {
        if (!response?.token) {
          throw new Error('Falha no login: Credenciais inválidas.');
        }
        this.saveToken(response.token);
      }),
      map(response => response.token as string),
      catchError(error => {
        console.error('Erro no login:', error);
        return throwError(() => new Error('Falha ao realizar login. Verifique suas credenciais.'))
      })
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
