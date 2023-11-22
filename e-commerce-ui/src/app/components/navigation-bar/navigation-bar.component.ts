import {Component, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
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
  isDesktopView: boolean = window.innerWidth > 990;
  showBurgerMenu: boolean = false;
  isSectionOpened: boolean = false;
  selectedProductSections: string[] = [];
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.products.forEach(product => {
        product.isDropdownOpen = false;
      })
    }
  }
  constructor(private elementRef: ElementRef) {
    window.addEventListener('resize', this.onWindowResize.bind(this))
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

  onWindowResize(event: any) {
    this.isDesktopView = event.target.innerWidth > 990;
    if (this.showBurgerMenu){
      document.getElementById("overlay").style.display = "block";
    }

  }

  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu;
    if (this.showBurgerMenu) {
      document.getElementById("overlay").style.display = "block";
      this.onBack();
    } else {
      document.getElementById("overlay").style.display = "none";
    }
  }

  openNavigationSections(product: any ,name: string) {
    if (product.sections) {
      this.isSectionOpened = true;
      this.products.forEach(product => {
        if (product.name === name) {
          this.selectedProductSections = this.selectedProductSections.concat(product.sections);
        }
      })
    }
  }

  onBack() {
    this.isSectionOpened = false;
    this.selectedProductSections = [];
  }
}
