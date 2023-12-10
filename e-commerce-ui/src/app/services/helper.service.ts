import {BehaviorSubject} from "rxjs";

export enum ProductFilters {
  ALPHABETICALLY_ASCENDING = 'Alphabetically, A-Z',
  ALPHABETICALLY_DESCENDING = 'Alphabetically, Z-A',
  PRICE_ASCENDING = 'Price, Low to High',
  PRICE_DESCENDING = 'Price, High to Low',
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Out of Stock'
}

export enum Products {
  ALL_PRODUCTS = 'Shop All',
  COLD_PRESSED_JUICES = 'Cold-pressed Juices',
  BOOSTERS = 'Boosters',
  KOMBUCHAS = 'Kombuchas',
  SHAKERS = 'Shakers',
  LEMONADES = 'Lemonades',
  BUNDLES = 'Bundles'
}

export enum Routes {
  SHOP_ALL = 'shop-all',
  COLD_PRESSED_JUICES = 'cold-pressed-juices',
  BOOSTERS = 'boosters',
  KOMBUCHAS = 'kombuchas',
  SHAKERS = 'shakers',
  LEMONADES = 'lemonades',
  BUNDLES = 'bundles'
}

import {Injectable} from '@angular/core';
import { Router} from "@angular/router";
import {AbstractControl} from "@angular/forms";
import {Product} from "./api-endpoints.service";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  recipeDetail: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private router: Router) {
  }

  productListFilters(filterName: string, list: any): any {
    const holderList: any[] = [...list];
    switch (filterName) {
      case ProductFilters.ALPHABETICALLY_ASCENDING:
        return holderList.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      case ProductFilters.ALPHABETICALLY_DESCENDING:
        return holderList.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
      case ProductFilters.PRICE_ASCENDING:
        return holderList.sort((a, b) => a.price - b.price);
      case ProductFilters.PRICE_DESCENDING:
        return holderList.sort((a, b) => b.price - a.price);
      case ProductFilters.IN_STOCK:
        return holderList.filter(item => item.stockQuantity > 0);
      case ProductFilters.OUT_OF_STOCK:
        return holderList.filter(item => item.stockQuantity < 0);
      default:
        return holderList;
    }
  }

  transformToRouterString(string: string): string {
    return string.toLowerCase().replace(/ /g, '-');
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password: string = control.value;
    const hasNumber = /\d/.test(password);
    const hasCapital = /[A-Z]/.test(password);
    const minLength = password.length >= 8;

    if (!hasNumber || !hasCapital || !minLength) {
      return { invalidPassword: true };
    }

    return null;
  }

  navigateToProductDetails(id: number, category: string) {
    this.router.navigate([`${this.transformToRouterString(category)}/${id}`])
  }
}
