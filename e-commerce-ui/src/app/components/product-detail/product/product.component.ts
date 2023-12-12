import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../services/api-endpoints.service";
import {HelperService} from "../../../services/helper.service";
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {filter} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  productQuantity: number = 1;

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.handleRouteChange();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.handleRouteChange());
  }

  handleRouteChange() {
    this.productQuantity = 1;
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

  addToCart(product) {
    for (let i = 0; i < this.productQuantity; i++) {
      this.shoppingCartService.addToCart(product);
    }
    alert('Item added to your cart!');
    this.productQuantity = 1;
  }
}
