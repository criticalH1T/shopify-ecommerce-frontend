import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
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
    const formData = this.form.value;
    //Passing this data to parent component
    this.saveData.emit(formData);
  }

  buildForm() {
    console.log(this.data);
    // Customizing form contole fields depenign on item type
    switch (this.type) {
      case 'Product':
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
      case 'Recipe':
        console.log(this.form);
        this.form = this.fb.group({
          name: [this.data.name || '', [Validators.required]],
          description: [this.data.description || '', [Validators.required]],
          ingredients: [this.data.ingredients || '', [Validators.required]],
          steps: [this.data.steps || '', [Validators.required]],
          productName: [
            (this.data.product && this.data.product.name) || '',
            [Validators.required],
          ],
          productCategoryName: [
            (this.data.product && this.data.product.categoryCategoryName) || '',
            [Validators.required],
          ],
          productDescription: [
            (this.data.product && this.data.product.description) || '',
            [Validators.required],
          ],
          productPrice: [
            (this.data.product && this.data.product.price) || '',
            [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
          ],
          productStockQuantity: [
            (this.data.product && this.data.product.stockQuantity) || '',
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ],
          productVolume: [
            (this.data.product && this.data.product.volume) || '',
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ],
        });
        this.setupArrayFormControl('ingredients');
        this.setupArrayFormControl('steps');
        break;
    }
    console.log('>>>data>>', this.data);
  }

  //Setting up form control field to array; spliting by ,
  private setupArrayFormControl(controlName: string): void {
    const control: AbstractControl = this.form.get(controlName);

    control.valueChanges.subscribe((value) => {
      const arrayValue = Array.isArray(value)
        ? value
        : value.split(',').map((item) => item.trim());
      this.form.patchValue({ [controlName]: arrayValue }, { emitEvent: false });
    });
  }
}
