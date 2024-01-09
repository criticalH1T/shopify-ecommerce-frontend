import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product, Recipe} from "../../services/api-endpoints.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  product: Product | null;
  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const recipeId: string = this.activatedRoute.snapshot.paramMap.get('recipeId');
    this.subscriptions.push(this.activatedRoute.data.subscribe(recipes => {
      this.recipe = recipes['resolver'].find(recipe => recipe.id == recipeId);
      this.product = this.recipe.product;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
