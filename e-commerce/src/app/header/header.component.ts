import {Component, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  products: any[] = [
    {
      "name": "Drinks",
      "sections": ["Shop all", "Cold-pressed Juices", "Boosters", "Kombuchas", "Plant Milks", "Shakes", "Lemonades"],
      "isDropdownOpen": false
    },
    {
      "name": "Bundles"
    },
    {
      "name": "Recipes"
    },
    {
      "name": "About",
      "sections": ["Contact us", "Our story"],
      "isDropdownOpen": false
    }
  ]
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.products.forEach(product => {
        product.isDropdownOpen = false;
      })
    }
  }
  constructor(private elementRef: ElementRef) {
  }
  toggleDropdown(name: string) {
    this.products.forEach(product => {
      if (product.name == name) {
        product.isDropdownOpen = !product.isDropdownOpen;
      } else {
        product.isDropdownOpen = false;
      }
    })
  }
}
