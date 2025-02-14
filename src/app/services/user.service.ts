import { User } from './../shared/models/user';
import { inject, Injectable } from '@angular/core';
import { envinronment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = `${envinronment.apiURL}/users`;
  private http = inject(HttpClient)

  constructor() { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}`, user);
  }
}
