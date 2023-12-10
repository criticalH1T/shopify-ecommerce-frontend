import {Injectable} from '@angular/core';
import {Product} from "./api-endpoints.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  localStorageKey: string = 'cartItems';
  cartProducts: Product[] = localStorage.getItem(this.localStorageKey)? this.getCartItemsToLocalStorage(this.localStorageKey) : [];

  constructor() {
  }

  addToCart(product: Product) {
    this.cartProducts.push(product);
    this.saveCartItemsToLocalStorage(this.localStorageKey, this.cartProducts);
  }

  getCartProducts(): Product[] {
    return localStorage.getItem(this.localStorageKey)? this.getCartItemsToLocalStorage(this.localStorageKey) : this.cartProducts;
  }

  removeCartProduct(productId: number) {
    this.cartProducts = this.cartProducts.filter(product => product.id !== productId);
    this.saveCartItemsToLocalStorage(this.localStorageKey, this.cartProducts);
  }

  saveCartItemsToLocalStorage(key: string, shoppingCartItems: any) {
    localStorage.setItem(key, JSON.stringify(shoppingCartItems));
  }

  getCartItemsToLocalStorage(key: string): Product[] {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : [];
  }
}
