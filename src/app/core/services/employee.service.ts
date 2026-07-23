import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/Employee';
import { ApiResponse } from '../models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7075/api/Employee';

  //==============================
  // Get All Employees
  //==============================

  getEmployees(): Observable<ApiResponse<Employee[]>> {

    return this.http.get<ApiResponse<Employee[]>>(this.apiUrl);

  }

  //==============================
  // Get Employee By Id
  //==============================

  getEmployee(id: number): Observable<ApiResponse<Employee>> {

    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`);

  }

  //==============================
  // Add Employee
  //==============================

  addEmployee(employee: Employee): Observable<ApiResponse<Employee>> {

    return this.http.post<ApiResponse<Employee>>(this.apiUrl, employee);

  }

  //==============================
  // Update Employee
  //==============================

  updateEmployee(id: number, employee: Employee): Observable<ApiResponse<Employee>> {

    return this.http.put<ApiResponse<Employee>>(
      `${this.apiUrl}`,
      employee
    );

  }

  //==============================
  // Delete Employee
  //==============================

  deleteEmployee(id: number): Observable<ApiResponse<any>> {

    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);

  }

}