import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, first, Subscription} from "rxjs";
import {Product} from "../../services/api-endpoints.service";
import {HelperService, ProductFilters, Products, Routes} from "../../services/helper.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  activeCategory: string = '';
  productList: Product[] = [];
  noFilterProductList: any[] = [];
  categoryBasedInformation: any[] = [
    {
      category: Routes.SHOP_ALL,
      title: Products.ALL_PRODUCTS,
      description: 'Organic, non-GMO, plant-based, and bottled in glass.',
    },
    {
      category: Routes.COLD_PRESSED_JUICES,
      title: Products.COLD_PRESSED_JUICES,
      description: 'Trying to sneak more veggies into someone’s life? Look no further.',
    },
    {
      category: Routes.BOOSTERS,
      title: Products.BOOSTERS,
      description: 'Pocket-sized power-ups to keep you feeling your best.',
    },
    {
      category: Routes.KOMBUCHAS,
      title: Products.KOMBUCHAS,
      description: 'Made fresh with cold-pressed juice and 8g of sugar or less.',
    },
    {
      category: Routes.SHAKERS,
      title: Products.SHAKERS,
      description: 'Rich and satisfying, these make great on-the-go breakfasts.',
    },
    {
      category: Routes.LEMONADES,
      title: Products.LEMONADES,
      description: 'Swing by our stand for low-sugar, thirst-quenching sips.',
    }, {
      category: Routes.BUNDLES,
      title: Products.BUNDLES,
      description: 'Carefully curated kits offering a healthy serving of savings.'
    }
  ];

  dropdownButtons: any[] = [
    {
      type: 'Availability: ',
      filterName: 'Choose a filter',
      sections: [ProductFilters.IN_STOCK, ProductFilters.OUT_OF_STOCK],
      isDropdownOpened: false
    },
    {
      type: 'Sort by: ',
      filterName: 'Choose a filter',
      sections: [ProductFilters.ALPHABETICALLY_ASCENDING, ProductFilters.ALPHABETICALLY_DESCENDING, ProductFilters.PRICE_ASCENDING, ProductFilters.PRICE_DESCENDING],
      isDropdownOpened: false
    }
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!(event.target instanceof HTMLSpanElement)) {
      this.dropdownButtons.forEach(item => {
        item.isDropdownOpened = false;
      })
    }
  }

  constructor(public helperService: HelperService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.handleRouteChange();
    this.subscriptions.push(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.handleRouteChange()));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private handleRouteChange(): void {
    this.activeCategory = this.router.url.slice(1).toString();
    this.getProductsForCategory();
  }

  private getProductsForCategory(): void {
    this.subscriptions.push(this.activatedRoute.data.pipe(first()).subscribe(products => {
      this.productList = [];
      this.noFilterProductList = [];
      if (this.activeCategory === 'shop-all') {
        this.productList.push(...products['resolver']);
      } else {
        this.filterProductsByCategory(products['resolver']);
      }
    }));
  }

  private filterProductsByCategory(products: Product[]): void {
    this.productList.push(
      ...products.filter(product =>
        this.helperService.transformToRouterString(product.categoryCategoryName) === this.activeCategory
      )
    );
  }

  filterBy(filterType: string, subFilterName: string) {
    const targetedFilter = this.dropdownButtons.find(filter => filter.type === filterType);
    if (this.noFilterProductList.length === 0) {
      this.noFilterProductList = [...this.productList];
    }
    const filterProductList = this.helperService.productListFilters(subFilterName, this.noFilterProductList);
    this.productList = [...filterProductList];
    if (targetedFilter) {
      targetedFilter.filterName = subFilterName;
      targetedFilter.isDropdownOpened = false;
    }
  }

  toggleDropdown(filterType: string) {
    const targetedFilter = this.dropdownButtons.find(filter => filter.type === filterType);
    if (targetedFilter) {
      targetedFilter.isDropdownOpened = !targetedFilter.isDropdownOpened;
    }
  }

  resetFilter(filterType: string) {
    const targetedFilter = this.dropdownButtons.find(filter => filter.type === filterType);
    if (this.noFilterProductList.length !== 0) {
      this.productList = [...this.noFilterProductList];
    }
    if (targetedFilter) {
      targetedFilter.filterName = 'Choose a filter';
      targetedFilter.isDropdownOpened = false;
    }
  }
}
