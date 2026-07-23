import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/IApiResponse';
import { FileUploadResponseDto } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7075/api/Employee';

  upload(file: File): Observable<any> {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  download(fileName: string): Observable<Blob> {

    return this.http.get(
      `${this.apiUrl}/download/${fileName}`,
      {
        responseType: 'blob'
      }
    );
  }

  delete(fileName: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/delete-file/${fileName}`
    );
  }
  getFiles(): Observable<ApiResponse<FileUploadResponseDto[]>> {

    return this.http.get<ApiResponse<FileUploadResponseDto[]>>(
      `${this.apiUrl}/files`
    );

  }
}