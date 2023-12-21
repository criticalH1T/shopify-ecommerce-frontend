import { Injectable } from '@angular/core';
import { Product } from './api-endpoints.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private localStorageKey: string = 'cartItems';
  private cartProducts: Product[] = localStorage.getItem(this.localStorageKey)
    ? this.getCartItemsToLocalStorage(this.localStorageKey)
    : [];
  private checkoutProducts: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private checkoutPrice: BehaviorSubject<number> = new BehaviorSubject<number>(
    null
  );

  constructor() {}

  addToCart(product: Product) {
    this.cartProducts.push(product);
    this.saveCartItemsToLocalStorage(this.localStorageKey, this.cartProducts);
  }

  getCartProducts(): Product[] {
    return localStorage.getItem(this.localStorageKey)
      ? this.getCartItemsToLocalStorage(this.localStorageKey)
      : this.cartProducts;
  }

  removeCartProducts() {
    window.localStorage.clear();
    this.cartProducts = [];
  }

  removeCartProduct(productId: number) {
    this.cartProducts = this.cartProducts.filter(
      (product) => product.id !== productId
    );
    this.saveCartItemsToLocalStorage(this.localStorageKey, this.cartProducts);
  }

  saveCartItemsToLocalStorage(key: string, shoppingCartItems: any) {
    localStorage.setItem(key, JSON.stringify(shoppingCartItems));
  }

  getCartItemsToLocalStorage(key: string): Product[] {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  setCheckoutObject(products: any, price: number) {
    this.checkoutProducts.next(products);
    this.checkoutPrice.next(price);
  }

  getCheckoutProducts(): any {
    return this.checkoutProducts.value;
  }

  getCheckoutPrice(): number {
    return this.checkoutPrice.value;
  }
}
