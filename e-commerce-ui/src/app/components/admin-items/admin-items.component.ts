import {Component, OnInit} from '@angular/core';
import {ApiEndpointsService, Product, Recipe} from "../../services/api-endpoints.service";

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.scss']
})
export class AdminItemsComponent implements OnInit{

  products: Product[] = [];
  recipes: Recipe[] = [];

  constructor(public apiEndpointsService: ApiEndpointsService) {
  }
  ngOnInit(): void {
    this.apiEndpointsService.getProducts().subscribe(
      products => {
        this.products = products;
      }
    )
    this.apiEndpointsService.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
      }
    )
  }
}
