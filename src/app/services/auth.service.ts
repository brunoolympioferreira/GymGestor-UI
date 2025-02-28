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
  private readonly TOKEN_KEY = 'userToken';

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
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return false; //Sem token, usuário não autenticado
    }

    const tokenData = this.decodeToken(token);
    if (!tokenData || !tokenData.exp) {
      return false; // Token inválido
    }

    const expirationTime = tokenData.exp * 1000; // Convertendo para milissegundos
    const now = Date.now();

    if (expirationTime < now) {
      this.logout(); // Remove o token se expirado
      return false; // Token expirado
    }

    return true;// Usuário autenticado
  }

  private saveToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  private decodeToken(token: string): any {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) return null;

      const payload = atob(tokenParts[1]); // Decodifica o payload do JWT
      return JSON.parse(payload);
    } catch (e) {
      return null; // Retorna null se houver erro na decodificação
    }
  }
}
