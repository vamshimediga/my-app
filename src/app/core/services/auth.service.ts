import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ILoginRequest } from '../models/ILoginRequest';
import { ILoginResponse } from '../models/ILoginResponse';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../models/UserResponse';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.apiUrl}/Auth/login`, request);
  }
  getProfile(): Observable<UserResponse> {

    return this.http.get<UserResponse>(
      `${environment.apiUrl}/Auth/GetProfile`
    );

  }
}