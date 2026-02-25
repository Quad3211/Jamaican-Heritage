import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/profile`);
  }

  updateProfile(
    data: Partial<{ name: string; email: string }>,
  ): Observable<{ user: User; message: string }> {
    return this.http.put<{ user: User; message: string }>(
      `${this.apiUrl}/profile`,
      data,
    );
  }
}
