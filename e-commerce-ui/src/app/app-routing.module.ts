import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductLandingPageComponent} from "./components/product-landing-page/product-landing-page.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {RecipesListComponent} from "./components/recipes-list/recipes-list.component";
import {RecipesDetailComponent} from "./components/recipes-detail/recipes-detail.component";
import {OurStoryComponent} from "./components/our-story/our-story.component";
import {ContactUsComponent} from "./components/contact-us/contact-us.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {UserSignInComponent} from "./components/user-sign-in/user-sign-in.component";
import {UserSignUpComponent} from "./components/user-sign-up/user-sign-up.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProductLandingPageComponent
  },
  {
    path: 'bundles',
    component: ProductListComponent
  },
  {
    path: 'our-story',
    component: OurStoryComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'user-sign-in',
    component: UserSignInComponent
  },
  {
    path: 'user-sign-up',
    component: UserSignUpComponent
  },
  {
    path: 'recipes',
    children: [
      {
        path: '',
        component: RecipesListComponent
      },
      {
        path: ':recipeId',
        component: RecipesDetailComponent
      }
    ]
  },
  {
    path: ':category',
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':productId',
        component: ProductDetailComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
