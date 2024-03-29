import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiEndpointsService, Recipe} from "../../services/api-endpoints.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  constructor(private apiEndpointService: ApiEndpointsService,
              private router: Router,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  recipes: Recipe[] = [];
  subscriptions: Subscription[] = [];

  navigateToRecipeDetails(item: any) {
    const recipe = this.recipes.find((recipe) => recipe.id === item.id);
    const recipeId = recipe.id;
    this.helperService.recipeDetail.next(recipe);
    this.router.navigate(['/recipes', recipeId]);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.data.subscribe(
      (recipes) => {
        this.recipes = recipes['resolver'];
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
