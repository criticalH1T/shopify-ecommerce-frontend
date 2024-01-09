import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['../checkout/checkout.component.scss'],
})
export class OrderCompletedComponent implements OnInit {
  customerId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.queryParamMap.get('customerId');
  }
}
