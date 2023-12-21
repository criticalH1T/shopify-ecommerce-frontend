import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ApiEndpointsService} from "../services/api-endpoints.service";
import {of, switchMap} from "rxjs";

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  return inject(ApiEndpointsService).isAdmin().pipe(
    switchMap((isAdmin) => {
      if(isAdmin) {
        return of(true);
      } else {
        router.navigate(['/page-not-found']);
        return of(false);
      }
    })
  );
};
