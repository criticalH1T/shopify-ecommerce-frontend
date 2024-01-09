enum modalAction {
  EDIT = 'Edit',
  ADD = 'Add'
}
export enum categoryChosen {
  RECIPE = 'Recipes',
  PRODUCT = 'Products',
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ApiEndpointsService,
  Product,
  Recipe,
} from '../../services/api-endpoints.service';
import { StateService } from "../../services/state.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.scss'],
})

export class AdminItemsComponent implements OnInit, OnDestroy {

  isCategoryChosen: boolean = false;
  categoryChosen: string | null = null;
  categories: string[] = ['Products', 'Recipes'];
  products: Product[] = [];
  recipes: Recipe[] = [];
  isModalOpen: boolean = false;
  modalTitle: string = 'Umm..';
  modalData: any;
  modalAction: modalAction;

  constructor(public apiEndpointsService: ApiEndpointsService,
    public stateService: StateService) { }
  ngOnInit(): void {
    forkJoin([
      this.apiEndpointsService.getProducts(),
      this.apiEndpointsService.getRecipes()
    ]).subscribe(([products, recipes]) => {
      this.products = products;
      this.recipes = recipes;
      if (this.stateService.getIsCategoryChosen()) {
        this.isCategoryChosen = true;
        this.categoryChosen = this.stateService.getCategoryChosen();
      }
    });
  }

  ngOnDestroy(): void {
    this.stateService.cleanLocalStorage();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveItem(formData: any) {
    switch (this.categoryChosen) {
      case categoryChosen.PRODUCT:
        if (this.modalAction === modalAction.EDIT) {
          this.apiEndpointsService.updateProduct(formData).subscribe(
            response => {
              window.alert(response["responseMessage"]);
            },
            error => {
              window.alert(error.error["responseMessage"]);
            }
          );
        } else {
          this.apiEndpointsService.createProduct(formData).subscribe(
            response => {
              window.alert(response['responseMessage']);
            },
            error => {
              window.alert(error.error["responseMessage"]);
            }
          );
        }
        break;

      case categoryChosen.RECIPE:
        if (this.modalAction === modalAction.EDIT) {
          this.apiEndpointsService.updateRecipe(formData).subscribe(
            response => {
              window.alert(response['responseMessage']);
            },
            error => {
              window.alert(error.error["responseMessage"]);
            }
          );
        } else {
          this.apiEndpointsService.createRecipe(formData).subscribe(
            response => {
              window.alert(response['responseMessage']);
            },
            error => {
              window.alert(error.error["responseMessage"]);
            }
          );
        }
        break;
    }
    this.closeModal();
  }

  openEditModal(item: any, itemType: string) {
    // TODO make enum for product and recipe and use it where needed
    this.modalAction = modalAction.EDIT;
    this.modalTitle = 'Edit ' + itemType;
    this.modalData = { ...item };
    this.isModalOpen = true;
  }

  openAddModal(itemType: string) {
    this.modalAction = modalAction.ADD;
    this.modalTitle = 'Add New ' + itemType;
    this.modalData = {};
    this.isModalOpen = true;
  }

  selectCategory(category: string) {
    this.categoryChosen = category;
    this.isCategoryChosen = !this.isCategoryChosen;
    this.updateCategoryChosen(this.isCategoryChosen, this.categoryChosen);
  }

  deselectCategory() {
    this.isCategoryChosen = false;
    this.categoryChosen = null;
    this.updateCategoryChosen(this.isCategoryChosen, this.categoryChosen);
  }

  updateCategoryChosen(isCategoryChosen: boolean, categoryChosen: string): void {
    this.isCategoryChosen = isCategoryChosen;
    this.categoryChosen = categoryChosen;
    this.stateService.setCategoryChosen(this.isCategoryChosen, this.categoryChosen);
  }

  deleteProduct(product: Product) {
    this.apiEndpointsService.deleteProduct(product.id).subscribe(
      response => {
        if (response.status == 200) {
          this.products = this.products.filter(element => product.id !== element.id);
        } else {
          alert(`Error deleting product with ID ${product.id}: ${response.responseMessage}`);
        }
      }
    );
  }
  deleteRecipe(recipe: Recipe) {
    this.apiEndpointsService.deleteRecipe(recipe.id).subscribe(
      response => {
        if (response.status == 200) {
          this.recipes = this.recipes.filter(element => recipe.id !== element.id);
        } else {
          alert(`Error deleting recipe with ID ${recipe.id}: ${response.responseMessage}`);
        }
      }
    );
  }

  deleteItem(item: any, itemType: string) {
    const confirmation = window.confirm(`Are you sure you want to delete the ${itemType} with id ${item.id}`);
    if (confirmation) {
      itemType === 'Product' ? this.deleteProduct(item) : this.deleteRecipe(item);
    }
  }
}
