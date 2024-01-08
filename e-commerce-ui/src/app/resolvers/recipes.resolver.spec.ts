import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { recipesResolver } from './recipes.resolver';

describe('recipesResolver', () => {
  const executeResolver: ResolveFn<boolean> = async () => {
    const result = await TestBed.runInInjectionContext(() => recipesResolver());
    return result ? true : false;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
