import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  products: any = ['Drinks', 'Bundles', 'Recipes', 'About']
  constructor(private router: Router) {}
}
