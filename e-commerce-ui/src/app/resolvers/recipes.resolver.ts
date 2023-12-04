import {inject} from "@angular/core";
import {ApiEndpointsService, Recipe} from "../services/api-endpoints.service";
import {Observable} from "rxjs";

export const recipesResolver: () => Observable<Recipe[]> = () => {
  return inject(ApiEndpointsService).getRecipes();
};
