import {Component, OnInit} from '@angular/core';
import {Product, Recipe} from "../../services/api-endpoints.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;
  product: Product | null;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const recipeId: string = this.activatedRoute.snapshot.paramMap.get('recipeId');
    this.activatedRoute.data.subscribe(recipes => {
      this.recipe = recipes['resolver'].find(recipe => recipe.id == recipeId);
      this.product = this.recipe.product;
    })
  }

}
