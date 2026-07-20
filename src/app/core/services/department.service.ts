import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'https://localhost:7075/api/Department';

  constructor(private http: HttpClient) {}

  // Get All
  getDepartments(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get By Id
  getDepartment(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Insert
  addDepartment(department: Department): Observable<any> {
    return this.http.post<any>(this.apiUrl, department);
  }

  // Update
  updateDepartment(id: number, department: Department): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, department);
  }

  // Delete
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}