import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../services/api-endpoints.service";
import {HelperService} from "../../../services/helper.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{
  @Input() product: Product;
  productQuantity: number = 1;

  constructor(private helperService: HelperService) {
  }

  onInputChange() {
    if (isNaN(this.productQuantity) || this.productQuantity < 1) {
      this.productQuantity = 1;
    }
  }

  increaseInput() {
    this.productQuantity++;
  }

  decreaseInput() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  addToCart() {
    const products = this.countProductQuantity(this.productQuantity);
    this.helperService.productsInCart.next(products);
  }

  countProductQuantity(quantity: number): Product[] {
    const products: Product[] = [];
    for (let i = 0; i < quantity; i++) {
      products.push(this.product);
    }
    alert('Item added to your cart!');
    return products;
  }
}
