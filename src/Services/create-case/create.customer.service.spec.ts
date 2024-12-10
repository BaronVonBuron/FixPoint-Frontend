import { TestBed } from '@angular/core/testing';

import { CreateCustomerService } from './create.customer.service';

describe('CreateCustomerService', () => {
  let service: CreateCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
