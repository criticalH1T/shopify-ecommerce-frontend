import {Component, OnInit} from '@angular/core';
import {Product} from "../../services/api-endpoints.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-landing-page',
  templateUrl: './product-landing-page.component.html',
  styleUrls: ['./product-landing-page.component.scss']
})
export class ProductLandingPageComponent implements OnInit {

  suggestedProductsTitle: string = 'Meet our bestsellers';
  suggestedProducts: Product[] = [];
  productDetail: Product;

  constructor(public activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.getRandomProductSuggestions();
  }

  getRandomProductSuggestions() {
    this.activatedRoute.data.subscribe(products => {
      this.suggestedProducts = products['resolver'].slice().sort(() => 0.5 - Math.random()).slice(0, 4);
      this.productDetail = products['resolver'].find(product => product.categoryCategoryName = 'Boosters')
    });
  }
}
