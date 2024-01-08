import { TestBed } from '@angular/core/testing';

import { ApiEndpointsService } from './api-endpoints.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiEndpointsService', () => {
  let service: ApiEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ApiEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
