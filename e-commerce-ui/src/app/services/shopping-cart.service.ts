import {Injectable} from '@angular/core';
import {Product} from "./api-endpoints.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartProducts: Product[] = [];

  constructor() {
  }

  addToCart(product: Product) {
    this.cartProducts.push(product);
  }

  getCartProducts(): Product[] {
    return this.cartProducts;
  }

  removeCartProduct(productId: number) {
    this.cartProducts = this.cartProducts.filter(product => product.id !== productId);
  }
}
