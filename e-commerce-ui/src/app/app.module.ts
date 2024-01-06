import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductLandingPageComponent } from './components/product-landing-page/product-landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './components/recipes-detail/recipes-detail.component';
import { OurStoryComponent } from './components/our-story/our-story.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserSignInComponent } from './components/user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ProductComponent } from './components/product-detail/product/product.component';
import { SearchBarComponent } from './components/navigation-bar/search-bar/search-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GridProductsComponent } from './components/grid-products/grid-products.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUserRolesComponent } from './components/admin-user-roles/admin-user-roles.component';
import { AdminItemsComponent } from './components/admin-items/admin-items.component';
import { ModalComponent } from './components/modal/modal.component';
import { CamelCaseToSpacePipe } from './pipes/camel-case-to-space.pipe';
import { AdminContactUsComponent } from './components/admin-contact-us/admin-contact-us.component';

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
    ProductComponent,
    SearchBarComponent,
    FooterComponent,
    GridProductsComponent,
    OrderCompletedComponent,
    GridProductsComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminUserRolesComponent,
    AdminItemsComponent,
    ModalComponent,
    CamelCaseToSpacePipe,
    AdminContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
