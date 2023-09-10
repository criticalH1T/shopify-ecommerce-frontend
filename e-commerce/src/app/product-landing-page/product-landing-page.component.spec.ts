import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLandingPageComponent } from './product-landing-page.component';

describe('ProductLandingPageComponent', () => {
  let component: ProductLandingPageComponent;
  let fixture: ComponentFixture<ProductLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductLandingPageComponent]
    });
    fixture = TestBed.createComponent(ProductLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
