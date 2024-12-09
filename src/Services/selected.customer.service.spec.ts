import { TestBed } from '@angular/core/testing';

import { SelectedCustomerService } from './selected.customer.service';

describe('SelectedCustomerService', () => {
  let service: SelectedCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
