import { Component, Input } from '@angular/core';
import { Product } from 'src/app/services/api-endpoints.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() productList: Product[] = [];

  constructor(public helperService: HelperService) {}
}
