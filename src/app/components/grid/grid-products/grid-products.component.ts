import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from "../../../services/helper.service";
import {Product} from "../../../services/api-endpoints.service";

@Component({
  selector: 'app-grid-products',
  templateUrl: './grid-products.component.html',
  styleUrls: ['./grid-products.component.scss']
})
export class GridProductsComponent {

  @Input() gridProducts: Product[];
  @Input() gridTitle: string;

  constructor(public helperService: HelperService) {}
}
