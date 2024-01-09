import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { productIdGuard } from './product-id.guard';

describe('productIdGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => productIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
