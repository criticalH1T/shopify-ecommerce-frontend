import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  socialMediaIcons = [
    "bi bi-facebook",
    "bi bi-instagram",
    "bi bi-twitter-x",
    "bi bi-pinterest"
  ]

  quickLinks = [
    {
      "name": "Drinks",
      "routerLink": "shop-all"
    },
    {
      "name": "Bundles",
      "routerLink": "bundles"
    },
    {
      "name": "Recipes",
      "routerLink": "recipes"
    }
  ]
}
