import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductLandingPageComponent } from './components/product-landing-page/product-landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductLandingPageComponent,
    LoginComponent,
    CheckoutComponent,
    NavigationBarComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
