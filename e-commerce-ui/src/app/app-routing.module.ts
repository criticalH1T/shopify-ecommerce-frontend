import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductLandingPageComponent} from "./components/product-landing-page/product-landing-page.component";
import {ProductListComponent} from "./components/product-list/product-list.component";

const routes: Routes = [
  {path: '', component: ProductLandingPageComponent},
  { path: 'products/:id', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
