import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgOptimizedImage, CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductLandingPageComponent } from './components/product-landing-page/product-landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './components/recipes-detail/recipes-detail.component';
import { OurStoryComponent } from './components/our-story/our-story.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserSignInComponent } from './components/user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import {HttpClientModule} from "@angular/common/http";
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ProductComponent } from './components/product-detail/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductLandingPageComponent,
    LoginComponent,
    CheckoutComponent,
    NavigationBarComponent,
    ProductListComponent,
    ProductDetailComponent,
    PageNotFoundComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    OurStoryComponent,
    ContactUsComponent,
    ShoppingCartComponent,
    UserSignInComponent,
    UserSignUpComponent,
    ValidationMessagesComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
