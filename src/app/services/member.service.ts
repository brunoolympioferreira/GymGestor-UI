import { inject, Injectable } from '@angular/core';
import { envinronment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, take, tap, delay } from 'rxjs';
import { Member } from '../shared/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseURL = `${envinronment.apiURL}/members`;
  private http = inject(HttpClient)

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseURL,
      { headers: this.getAuthHeaders() }).pipe(
        take(1)
      );
  }

  getById(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseURL}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        take(1)
      );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  create(member: Member): Observable<Member> {
    return this.http.post<Member>(this.baseURL, member, { headers: this.getAuthHeaders() })
      .pipe(
        take(1)
      );
  }
}
