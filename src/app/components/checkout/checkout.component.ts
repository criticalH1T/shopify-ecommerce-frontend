import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointsService } from '../../services/api-endpoints.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  shoppingCartItems: any[] = [];
  subtotalPrice: number;
  isOrderCompleted: boolean = false;

  constructor(
    private apiEndpointService: ApiEndpointsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.shoppingCartItems = this.shoppingCartService.getCheckoutProducts();
    this.subtotalPrice = this.shoppingCartService.getCheckoutPrice();

    !this.subtotalPrice || !this.shoppingCartItems
      ? this.router.navigate(['/cart'])
      : this.paypalCheckout();
  }

  async paypalCheckout() {
    const order = await window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'black',
          label: 'pay',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.subtotalPrice.toString(),
                  currency_code: 'CAD',
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            if (details.status === 'COMPLETED') {
              this.isOrderCompleted = true;
              //sending order to backend when completed
              await lastValueFrom(
                this.apiEndpointService.setOrderItems(this.shoppingCartItems)
              );
              this.shoppingCartService.removeCartProducts();
              this.router.navigate(['/order-completed'], {
                queryParams: { customerId: details.id },
              });
            }
          } catch (error) {
            console.error('Error capturing order:', error);
            alert('Error capturing order. Please try again later.');
          }
        },

        onError: (error: any) => {
          console.error('PayPal error:', error);
          alert('Something went wrong with PayPal. Please try again later.');
          this.router.navigate(['/home']);
        },
      })
      .render(this.paymentRef.nativeElement);
  }
}
