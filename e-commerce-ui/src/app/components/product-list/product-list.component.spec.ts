import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ActivatedRoute, Data } from '@angular/router';
import { of } from 'rxjs';
import { GridComponent } from '../grid/grid.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  // Mock ActivatedRoute
  const mockResolverData: Data = {
    resolver: [
      {
        id: 1,
        name: 'Immunity Booster',
        description: "Enhances the body's immune system with vitamin C and zinc",
        image_path: '../../../assets/booster.png',
        category: {
          categoryId: 101,
          categoryCategoryName: 'Boosters',
        },
        price: 9.99,
        stockQuantity: 10,
        volume: 300,
      },
    ],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, GridComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(mockResolverData),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
