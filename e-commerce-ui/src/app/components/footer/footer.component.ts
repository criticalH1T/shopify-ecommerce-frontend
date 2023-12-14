import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

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
