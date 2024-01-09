import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(public router: Router) {

  }

  public gridCards: any[] = [
    {
      "componentName": "/roles",
      "iconName": "bi bi-person-badge",
      "title": "Manage user roles",
    },
    {
      "componentName": "/orders",
      "iconName": "bi bi-bag-check",
      "title": "View orders",
    },
    {
      "componentName": "/items",
      "iconName": "bi bi-box",
      "title": "Modify items",
    },
    {
      "componentName": "/contact-us",
      "iconName": "bi bi-envelope-at",
      "title": "View contacts",
    }
  ]

  goToComponent(card: any) {
    const currentUrl = this.router.url;
    this.router.navigate([currentUrl + card.componentName]);
  }
}
