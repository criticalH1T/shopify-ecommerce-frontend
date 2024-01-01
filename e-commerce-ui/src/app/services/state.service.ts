import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly CATEGORY_CHOSEN_KEY = 'isCategoryChosen';
  private readonly CATEGORY_KEY = 'categoryChosen';

  constructor() { }

  getIsCategoryChosen(): boolean {
    return JSON.parse(localStorage.getItem(this.CATEGORY_CHOSEN_KEY) || 'false');
  }

  getCategoryChosen(): string {
    return JSON.parse(localStorage.getItem(this.CATEGORY_KEY));
  }

  setCategoryChosen(isCategoryChosen: boolean, categoryChosen: string): void {
    localStorage.setItem(this.CATEGORY_CHOSEN_KEY, JSON.stringify(isCategoryChosen));
    localStorage.setItem(this.CATEGORY_KEY, JSON.stringify(categoryChosen));
  }

  cleanLocalStorage() {
    localStorage.removeItem(this.CATEGORY_CHOSEN_KEY);
    localStorage.removeItem(this.CATEGORY_KEY);
  }

}
