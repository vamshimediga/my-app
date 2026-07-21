import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudents } from '../models/IStudents';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  private api = 'https://localhost:7075/api/Student';

  getStudents(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  addStudent(student: IStudents): Observable<any> {
    return this.http.post<any>(this.api, student);
  }

  updateStudent(student: IStudents): Observable<any> {
    return this.http.put<any>(this.api, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}