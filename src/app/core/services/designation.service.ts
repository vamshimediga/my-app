import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../models/designation.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://localhost:7075/api/Designation';

  // GET: api/Designation
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // GET: api/Designation/{id}
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // POST: api/Designation
  create(designation: Designation): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      designation
    );
  }

  // PUT: api/Designation/{id}
  update(
    id: number,
    designation: Designation
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      designation
    );
  }

  // DELETE: api/Designation/{id}
  delete(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );
  }
}