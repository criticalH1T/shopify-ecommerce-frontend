import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const isUserSignedIn: boolean = sessionStorage.getItem('isUserLoggedIn') !== null;

  if (isUserSignedIn) {
    return true;
  } else {
    alert('In order to checkout, you need to sign in!')
    router.navigate(['/sign-in']);
    return false;
  }
};
