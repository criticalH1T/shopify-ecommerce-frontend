import {Component, OnInit} from '@angular/core';
import {ApiEndpointsService, Order, OrderItem} from "../../services/api-endpoints.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order[];
  showOrderItemsToggle: boolean = false;
  orderItems: OrderItem[];
  selectedOrderId: number;
  ngOnInit(): void {
    this.apiEndpointsService.getOrdersWithitems().subscribe(
        orders => {
            this.orders = orders;
            // assign first order's orderItems to display
            this.orderItems = orders[0].orderItems;
            this.selectedOrderId = orders[0].id;
        }
    )
  }

  constructor(private apiEndpointsService: ApiEndpointsService,
              public helperService: HelperService) {
  }

    showOrderItems(order: Order) {
      this.orderItems = order.orderItems;
      this.selectedOrderId = order.id;
      this.showOrderItemsToggle = !this.showOrderItemsToggle;
    }
}
