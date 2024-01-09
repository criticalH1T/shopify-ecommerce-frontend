import {Product} from "../../services/api-endpoints.service";
export enum Type {
  RECIPE = 'Recipe',
  PRODUCT = 'Product',
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {ModalDataService} from "../../services/modal-data.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() data: any;
  @Input() type: string = '';
  @Input() products: Product[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveData = new EventEmitter<any>();
  productCategories: {}[];
  productImages: {}[];
  recipeImages: {}[];
  selectedProductCategory: number | null = null;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private modalDataService: ModalDataService) {}

  ngOnInit(): void {
    this.productCategories = this.modalDataService.getProductCategories();
    this.productImages = this.modalDataService.getProductImages();
    this.recipeImages = this.modalDataService.getRecipeImages();
    this.buildForm();
  }

  selectProductCategory() {
    return parseInt(this.productCategories
      .find(category => category['name'] === this.data.categoryCategoryName)['id']);
  }

  onClose() {
    this.closeModal.emit();
  }

  onSave() {
    let formData = this.form.value;
    if (this.type === Type.RECIPE) {
      formData.steps = formData.steps.split('|').map(item => item.trim());
      formData.ingredients = formData.ingredients.split('|').map(item => item.trim());
      formData.product = formData.product != '' ? parseInt(formData.product) : null;
    } else {
      formData.category = parseInt(formData.category);
    }
    formData.id = this.data.id;
    //Passing this data to parent component
    this.saveData.emit(formData);
  }

  buildForm() {
    const stepsValue = (this.data.steps || []).join('|');
    const ingredientsValue = (this.data.ingredients || []).join('|');

    // Customizing form controls fields depending on item type
    switch (this.type) {
      case Type.PRODUCT:
        if (Object.keys(this.data).length != 0) {
          this.selectedProductCategory = this.selectProductCategory();
        }
        this.form = this.fb.group({
          name: [this.data.name || '', [Validators.required]],
          category: [
            this.selectedProductCategory || '',
            [Validators.required],
          ],
          description: [this.data.description || '', [Validators.required]],
          price: [
            this.data.price || '',
            [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
          ],
          stockQuantity: [
            this.data.stockQuantity || '',
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ],
          volume: [
            this.data.volume || '',
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ],
          productImage: [
            this.data.imageUrl || '',
            [Validators.required]
          ],
        });
        break;
      case Type.RECIPE:
        this.form = this.fb.group({
          name: [this.data.name || '', [Validators.required]],
          description: [this.data.description || '', [Validators.required]],
          ingredients: [ingredientsValue || '', [Validators.required]],
          steps: [stepsValue || '', [Validators.required]],
          product: [
            (this.data.product && this.data.product.id) || '',
          ],
          recipeImage: [
            this.data.image_path || '',
            [Validators.required]
          ],
        });
        break;
    }
  }
}
