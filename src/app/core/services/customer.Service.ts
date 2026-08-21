import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/IApiResponse';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7075/api/Customer';

  getCustomers(): Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiUrl);
  }

  getCustomer(id: number): Observable<ApiResponse<Customer>> {
    return this.http.get<ApiResponse<Customer>>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<ApiResponse<Customer>> {
    return this.http.post<ApiResponse<Customer>>(this.apiUrl, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }
}