import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
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
  isDesktopView: boolean = window.innerWidth > 960;
  isBurgerMenuOpen: boolean = false;
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
  constructor(private elementRef: ElementRef,
              private router: Router) {
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  toggleDropdown(name: string) {
    const targetProduct = this.products.find(product => product.name === name);
    if (targetProduct) {
      if (targetProduct.sections) {
        targetProduct.isDropdownOpen = !targetProduct.isDropdownOpen;
      } else {
        this.navigateToPage(name);
      }
    }
    this.products.forEach(product => {
      if (product !== targetProduct) {
        product.isDropdownOpen = false;
      }
    });
  }

  onWindowResize(event: any) {
    this.isDesktopView = event.target.innerWidth >= 960;
    if (document.getElementById("overlay") && this.isBurgerMenuOpen) {
      document.getElementById("overlay").style.display = "block";
    }

  }

  toggleBurgerMenu() {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
    if (this.isBurgerMenuOpen) {
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

  navigateToPage(name: string) {
    let path: string = name.toLowerCase().replace(/ /g, '-');
    this.router.navigate([path]).then(r => {
      if (r) {
        if(this.isDesktopView) {
          this.products.forEach(product => product.isDropdownOpen = false);
        } else {
          this.isBurgerMenuOpen = false;
          document.getElementById("overlay").style.display = "none";
        }
      }
    })
  }
}
