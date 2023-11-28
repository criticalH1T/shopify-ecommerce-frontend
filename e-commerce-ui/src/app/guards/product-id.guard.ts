import { CanActivateChildFn, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const productIdGuard: CanActivateChildFn = (childRoute) => {
  const category = childRoute.paramMap.get('category');
  const productId = childRoute.paramMap.get('productId');
  const router: Router = inject(Router);

  if (!productId) {
    return of(true);
  }

  return inject(ApiEndpointsService).isProductValidInCategory(productId, category).pipe(
    switchMap((isValid) => {
      if (isValid) {
        return of(true);
      }
      router.navigate(['/page-not-found']);
      return of(false);
    })
  );
};
