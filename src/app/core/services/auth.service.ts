import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ILoginRequest } from '../models/ILoginRequest';
import { ILoginResponse } from '../models/ILoginResponse';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../models/UserResponse';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/IApiResponse';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.apiUrl}/api/Auth/login`, request);
  }
 getProfile() {
  return this.http.get<ApiResponse<UserResponse>>(`${environment.apiUrl}/api/Auth/profile`);
}
}