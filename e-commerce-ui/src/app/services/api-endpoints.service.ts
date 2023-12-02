export interface Product {
  id: number;
  categoryId: number;
  categoryCategoryName: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  volume: number;
  imageUrl: string;
}

export interface Category {
  id: number;
  categoryName: string;
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {
  private apiUrl = "http://localhost:8080";
  private bearerToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldmEuY29uZXZza2lAZ21haWwuY29tIiwiaWF0IjoxNzAxNTM0Nzc3LCJleHAiOjE3MDE1MzYyMTd9.AwJLbZpoqTYKT5lEWOu8i852dokxACajD5G6DjPuy3U";
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.bearerToken);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {headers: this.headers});
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, {headers: this.headers});
  }

  isCategoryValid(categoryName: string): Observable<boolean> {
    return this.getCategories().pipe(
      map(categories => categories.some(category => category.categoryName.toLowerCase().replace(/ /g, '-') === categoryName)),
      catchError(() => of(false))
    );
  }

  isProductValidInCategory(productId: string, categoryName: string): Observable<boolean> {
    return this.getProducts().pipe(
      map(products => products.some(product => product.id.toString() === productId && product.categoryCategoryName.toLowerCase().replace(/ /g, '-') === categoryName)),
      catchError(() => of(false))
    )
  }
}
