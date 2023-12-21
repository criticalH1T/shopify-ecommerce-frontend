import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: any[] = [];
  subtotalPrice: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingCartList();
    this.calculateSubtotal();
  }

  shoppingCartList() {
    const finalResultArray = Object.values(
      this.shoppingCartService
        .getCartProducts()
        .reduce((accumulator, product) => {
          const categoryKey = product.categoryCategoryName;
          const idKey = product.id;

          // If the category is not already in the accumulator, initialize it
          if (!accumulator[categoryKey]) {
            accumulator[categoryKey] = {};
          }

          // If the id is not already in the accumulator for the category, initialize it
          if (!accumulator[categoryKey][idKey]) {
            accumulator[categoryKey][idKey] = {
              ...product,
              orderedQuantity: 0,
              orderQuantitySubtotal: 0,
            };
          }

          // Update ordered quantity and subtotal for the category and id
          accumulator[categoryKey][idKey].orderedQuantity += 1;
          accumulator[categoryKey][idKey].orderQuantitySubtotal +=
            product.price;

          return accumulator;
        }, {})
    );

    // Flatten the nested structure into a single array
    this.shoppingCartItems = finalResultArray.flatMap((category) =>
      Object.values(category)
    );
  }

  calculateSubtotal() {
    this.subtotalPrice = parseFloat(
      this.shoppingCartItems
        .reduce((sum, product) => sum + product.orderQuantitySubtotal, 0)
        .toFixed(2)
    );
  }

  removeItem(productId: number) {
    const index = this.shoppingCartItems.findIndex(
      (product) => product.id === productId
    );

    // If the product is found, remove it from the cart
    if (index !== -1) {
      // Update the ordered quantity subtotal before removing the item
      const removedProduct = this.shoppingCartItems[index];
      removedProduct.orderQuantitySubtotal -= removedProduct.price;

      // Remove the item from the cart
      this.shoppingCartItems.splice(index, 1);
      this.calculateSubtotal();
    }
    this.shoppingCartService.removeCartProduct(productId);
  }

  //Navigating to checkout and passing cart data
  NavigateToCheckout() {
    this.shoppingCartService.setCheckoutObject(
      this.shoppingCartItems,
      this.subtotalPrice
    );
    this.router.navigate(['/checkout']);
  }
}
