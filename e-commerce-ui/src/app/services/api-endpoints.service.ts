import {HelperService} from "./helper.service";

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

export interface Recipe {
  id: number,
  product: Product,
  name: string,
  description: string,
  ingredients: [],
  steps: [],
  image_path: string
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {
  private apiUrl = "http://localhost:8080";
  private bearerToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZWN1cmVFbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE3MDE3MzQxMTUsImV4cCI6MTcwMTgzNzc5NX0.ZEdcoEJex3pQg-4JbUBz8NK3BNvtLxpY4IsgUFWjLls";
  private headers = new HttpHeaders();

  constructor(private http: HttpClient,
              private helperService: HelperService) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + this.bearerToken);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {headers: this.headers});
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, {headers: this.headers});
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`, { headers: this.headers });
  }

  getRecipeById(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`, { headers: this.headers });
  }

  isRecipeValid(recipeId: string): Observable<boolean> {
    return this.getRecipes().pipe(
      map(recipes => recipes.some(recipe => recipe.id.toString() === recipeId)),
      catchError(() => of(false))
    );
  }

  isCategoryValid(categoryName: string): Observable<boolean> {
    return this.getCategories().pipe(
      map(categories => categories.some(category => this.helperService.transformToRouterString(category.categoryName) === categoryName)),
      catchError(() => of(false))
    );
  }

  isProductValidInCategory(productId: string, categoryName: string): Observable<boolean> {
    return this.getProducts().pipe(
      map(products => products.some(product => product.id.toString() === productId && this.helperService.transformToRouterString(product.categoryCategoryName) === categoryName)),
      catchError(() => of(false))
    );
  }
}
