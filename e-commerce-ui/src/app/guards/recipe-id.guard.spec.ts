import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { recipeIdGuard } from './recipe-id.guard';

describe('recipeIdGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => recipeIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
