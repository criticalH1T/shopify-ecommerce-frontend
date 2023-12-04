import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {of, switchMap} from "rxjs";
import {ApiEndpointsService} from "../services/api-endpoints.service";

export const recipeIdGuard: CanActivateChildFn = (childRoute, state) => {
  const recipeId: string = childRoute.paramMap.get('recipeId');
  const router: Router = inject(Router);

  if (!recipeId) {
    return of(true);
  }

  return inject(ApiEndpointsService).isRecipeValid(recipeId).pipe(
    switchMap((isValid) => {
      if(isValid) {
        return of(true);
    }
    router.navigate(['/page-not-found']);
    return of(false);
    })
  );
};
