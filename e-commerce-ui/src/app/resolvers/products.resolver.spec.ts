import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productsResolver } from './products.resolver';

describe('productsResolver', () => {
  const executeResolver: ResolveFn<boolean> = async (...resolverParameters) => {
    const result = await TestBed.runInInjectionContext(() => productsResolver(...resolverParameters));
    return result ? true : false;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
