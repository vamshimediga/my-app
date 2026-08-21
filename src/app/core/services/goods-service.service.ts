import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/IApiResponse';
import { GoodsServiceDomainModel } from '../models/goods-service.model';

@Injectable({
  providedIn: 'root'
})
export class GoodsServiceApi {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://localhost:7075/api/GoodsService';


  getAll(): Observable<ApiResponse<GoodsServiceDomainModel[]>> {
    return this.http.get<ApiResponse<GoodsServiceDomainModel[]>>(
      this.apiUrl
    );
  }


  getById(
    id: number
  ): Observable<ApiResponse<GoodsServiceDomainModel>> {

    return this.http.get<ApiResponse<GoodsServiceDomainModel>>(
      `${this.apiUrl}/${id}`
    );
  }


  create(
    data: GoodsServiceDomainModel
  ): Observable<ApiResponse<GoodsServiceDomainModel>> {

    return this.http.post<ApiResponse<GoodsServiceDomainModel>>(
      this.apiUrl,
      data
    );
  }


  update(
    id: number,
    data: GoodsServiceDomainModel
  ): Observable<ApiResponse<string>> {

    return this.http.put<ApiResponse<string>>(
      `${this.apiUrl}/${id}`,
      data
    );
  }


  delete(
    id: number
  ): Observable<ApiResponse<string>> {

    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/${id}`
    );
  }


  search(
    search?: string,
    type?: string,
    minPrice?: number,
    maxPrice?: number,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse<GoodsServiceDomainModel[]>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search?.trim()) {
      params = params.set(
        'search',
        search.trim()
      );
    }

    if (type?.trim()) {
      params = params.set(
        'type',
        type.trim()
      );
    }

    if (minPrice !== undefined && minPrice !== null) {
      params = params.set(
        'minPrice',
        minPrice
      );
    }

    if (maxPrice !== undefined && maxPrice !== null) {
      params = params.set(
        'maxPrice',
        maxPrice
      );
    }

    return this.http.get<ApiResponse<GoodsServiceDomainModel[]>>(
      `${this.apiUrl}/search`,
      { params }
    );
  }
}