import { HelperService } from './helper.service';

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
  id: number;
  product: Product;
  name: string;
  description: string;
  ingredients: [];
  steps: [];
  image_path: string;
}

export interface adminResponse {
  responseMessage: string,
  status: number
}

export interface User {
  userId: number,
  firstName: string,
  lastName: string,
  address: string,
  role: string,
}
export interface OrderItem {
  id: number,
  order: Order,
  quantity: number,
  subtotal: number,
  product: Product
}

export interface Order {
  id: number,
  orderDate: Date,
  orderTotal: number,
  orderItems: OrderItem[],
  user: User
}


import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointsService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private helperService: HelperService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      withCredentials: true,
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, {
      withCredentials: true,
    });
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`, {
      withCredentials: true,
    });
  }

  getOrdersWithItems(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`, {withCredentials: true});
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {withCredentials: true});
  }

  deleteUser(user_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${user_id}`, {withCredentials: true})
  }

  switchUserRole(user_id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${user_id}`,null, {withCredentials: true});
  }

  isRecipeValid(recipeId: string): Observable<boolean> {
    return this.getRecipes().pipe(
      map((recipes) =>
        recipes.some((recipe) => recipe.id.toString() === recipeId)
      ),
      catchError(() => of(false))
    );
  }

  setOrderItems(orderItems: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/order_items`, orderItems, {
      withCredentials: true,
    });
  }

  isCategoryValid(categoryName: string): Observable<boolean> {
    return this.getCategories().pipe(
      map((categories) =>
        categories.some(
          (category) =>
            this.helperService.transformToRouterString(
              category.categoryName
            ) === categoryName
        )
      ),
      catchError(() => of(false))
    );
  }

  isProductValidInCategory(
    productId: string,
    categoryName: string
  ): Observable<boolean> {
    return this.getProducts().pipe(
      map((products) =>
        products.some(
          (product) =>
            product.id.toString() === productId &&
            this.helperService.transformToRouterString(
              product.categoryCategoryName
            ) === categoryName
        )
      ),
      catchError(() => of(false))
    );
  }
  isAdmin(): Observable<boolean> {
    return this.http.get<adminResponse>(`${this.apiUrl}/admin`, {withCredentials: true}).pipe(
      map(response => response.status == 200),
      catchError(() => of(false))
    );
  }
}
