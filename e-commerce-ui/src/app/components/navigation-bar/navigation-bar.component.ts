import {Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router, withDebugTracing} from "@angular/router";
import {HelperService, Products} from "../../services/helper.service";
import {ApiEndpointsService, Product} from "../../services/api-endpoints.service";
import {Subscription} from "rxjs";
import {StateService} from "../../services/state.service";
import {EncryptionService} from "../../services/encryption.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  products: any[] = [
    {
      "name": "Drinks",
      "sections": [Products.ALL_PRODUCTS, Products.COLD_PRESSED_JUICES, Products.BOOSTERS, Products.KOMBUCHAS, Products.SHAKERS, Products.LEMONADES],
      "isDropdownOpen": false
    },
    {
      "name": Products.BUNDLES
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
  isSearchBarOpened: boolean = false;
  allProducts: Product[] = [];
  subscriptions: Subscription[] = [];
  isAdmin: boolean | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!(event.target instanceof HTMLSpanElement)) {
      this.products.forEach(product => {
        product.isDropdownOpen = false;
      })
    }
  }

  constructor(private router: Router,
              private helperService: HelperService,
              private apiEndPointService: ApiEndpointsService,
              private stateService: StateService,
              private encryptionService: EncryptionService,
              private authenticationService: AuthenticationService) {
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  ngOnInit(): void {
      this.subscriptions.push(this.apiEndPointService.getProducts().subscribe(products => {
        this.allProducts.push(...products);
        this.isAdmin = this.getIsAdmin();
      }));
      this.authenticationService.isAdmin.subscribe(value => {
        this.isAdmin = value;
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getIsAdmin() {
    let isAdmin = this.stateService.getLocalStorageItem('isAdmin');
    if (isAdmin != null) {
      isAdmin = this.encryptionService.decryptData(isAdmin);
      return isAdmin === 'false' ? false : !!isAdmin;
    } else return null;
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

  openNavigationSections(product: any, name: string) {
    if (product.sections) {
      this.isSectionOpened = true;
      this.products.forEach(product => {
        if (product.name === name) {
          this.selectedProductSections = this.selectedProductSections.concat(product.sections);
        }
      })
    } else {
      this.navigateToPage(name);
    }
  }

  onBack() {
    this.isSectionOpened = false;
    this.selectedProductSections = [];
  }

  navigateToPage(name: string) {
    let path: string = this.helperService.transformToRouterString(name);
    this.router.navigate([path]).then(r => {
      if (r) {
        if (this.isDesktopView) {
          this.products.forEach(product => product.isDropdownOpen = false);
        } else {
          this.isBurgerMenuOpen = false;
          document.getElementById("overlay").style.display = "none";
        }
      }
    })
  }

  openSearchBar() {
    this.isSearchBarOpened = true;
  }

  closeSearchBar() {
    this.isSearchBarOpened = false;
  }

  manageUserSession() {
    const isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');
    if(isUserLoggedIn) {
      const confirm = window.confirm('Are you sure you want to sign out?');
      if(confirm) {
        this.router.navigate(['/home']);
        this.authenticationService.logOutUser();
        this.isAdmin = null;
      }
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}
