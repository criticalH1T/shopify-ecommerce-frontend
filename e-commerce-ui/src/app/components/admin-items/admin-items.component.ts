import { Component, OnInit } from '@angular/core';
import {
  ApiEndpointsService,
  Product,
  Recipe,
} from '../../services/api-endpoints.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.scss'],
})
export class AdminItemsComponent implements OnInit {
  products: Product[] = [];
  recipes: Recipe[] = [];
  isModalOpen: boolean = false;
  modalTitle: string = 'Umm..';
  modalData: any;

  constructor(public apiEndpointsService: ApiEndpointsService) {}
  ngOnInit(): void {
    this.apiEndpointsService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.apiEndpointsService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveItem(formData: any) {
    // Implement logic to save/update the item based on formData
    console.log('Saving data:', formData);
    this.closeModal();
  }

  openEditModal(item: any, itemType: string) {
    //TODO make enum for product and recipe and use it where needed
    this.modalTitle = 'Edit ' + itemType;
    this.modalData = { ...item };
    this.isModalOpen = true;
  }

  openAddModal(itemType: string) {
    this.modalTitle = 'Add New ' + itemType;
    this.modalData = {};
    this.isModalOpen = true;
  }
}
