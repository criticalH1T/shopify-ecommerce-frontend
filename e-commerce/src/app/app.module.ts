import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductLandingPageComponent } from './product-landing-page/product-landing-page.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductLandingPageComponent,
    LoginComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
