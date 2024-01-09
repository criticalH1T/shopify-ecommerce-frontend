import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const categoryGuard: CanActivateFn = (route) => {
  const category = route.paramMap.get('category');
  const router: Router = inject(Router);

  return inject(ApiEndpointsService).isCategoryValid(category).pipe(
    switchMap((isCategoryValid) => {
      if (isCategoryValid) {
        return of(true);
      } else {
        router.navigate(['/page-not-found']);
        return of(false);
      }
    })
  );
};
