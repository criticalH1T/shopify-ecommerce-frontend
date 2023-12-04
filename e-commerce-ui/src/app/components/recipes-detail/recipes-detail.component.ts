import {Component, OnInit} from '@angular/core';
import {ApiEndpointsService, Product, Recipe} from "../../services/api-endpoints.service";
import {HelperService} from "../../services/helper.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;
  product: Product | null;

  constructor(private helperService: HelperService,
              private apiEndPointService: ApiEndpointsService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.helperService.recipeDetail.subscribe(recipe => {
      if (recipe == null) {
        const recipeId: string = this.router.snapshot.paramMap.get('recipeId');
        this.apiEndPointService.getRecipeById(recipeId).subscribe(recipe => {
          this.recipe = recipe;
          this.product = recipe.product;
        });
      } else {
        this.recipe = recipe;
        this.product = recipe.product;
      }
    })
  }

  // productQuantity: any = 1;
  //
  // increaseQuantity() {
  //   this.productQuantity++;
  // }
  //
  // checkQuantity() {
  //   if (this.productQuantity < 1 || isNaN(this.productQuantity)) this.productQuantity = 1;
  // }
  //
  // decreaseQuantity() {
  //   if (this.productQuantity >= 2 && !isNaN(this.productQuantity)) this.productQuantity--;
  //   else if (isNaN(this.productQuantity)) this.productQuantity = 1;
  // }

}
