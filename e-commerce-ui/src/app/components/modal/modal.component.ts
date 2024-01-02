export enum Type {
  Recipe = 'Recipe',
  Product = 'Product',
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalTitle: string = '';
  @Input() data: any;
  @Input() type: string = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveData = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onClose() {
    this.closeModal.emit();
  }

  onSave() {
    let formData = this.form.value;
    if (this.type === Type.Recipe) {
      formData.steps = formData.steps.split('|').map(item => item.trim());
      formData.ingredients = formData.ingredients.split('|').map(item => item.trim());
    }
    //Passing this data to parent component
    this.saveData.emit(formData);
  }

  buildForm() {
    const stepsValue = (this.data.steps || []).join('|');
    const ingredientsValue = (this.data.ingredients || []).join('|');

    // Customizing form controls fields depending on item type
    switch (this.type) {
      case Type.Product:
        this.form = this.fb.group({
          name: [this.data.name || '', [Validators.required]],
          categoryName: [
            this.data.categoryCategoryName || '',
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
        });
        break;
      case Type.Recipe:
        this.form = this.fb.group({
          name: [this.data.name || '', [Validators.required]],
          description: [this.data.description || '', [Validators.required]],
          ingredients: [ingredientsValue || '', [Validators.required]],
          steps: [stepsValue || '', [Validators.required]],
          productName: [
            (this.data.product && this.data.product.name) || '',
          ],
          productCategoryName: [
            (this.data.product && this.data.product.categoryCategoryName) || '',
          ],
          productDescription: [
            (this.data.product && this.data.product.description) || '',
          ],
          productPrice: [
            (this.data.product && this.data.product.price) || '',
            [Validators.pattern(/^\d+(\.\d+)?$/)],
          ],
          productStockQuantity: [
            (this.data.product && this.data.product.stockQuantity) || '',
            [Validators.pattern('^[0-9]*$')],
          ],
          productVolume: [
            (this.data.product && this.data.product.volume) || '',
            [Validators.pattern('^[0-9]*$')],
          ],
        });
        break;
    }
  }
}
