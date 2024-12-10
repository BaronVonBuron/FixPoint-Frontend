import { TestBed } from '@angular/core/testing';

import { GetTechniciansService } from './get.technicians.service';

describe('GetTechniciansService', () => {
  let service: GetTechniciansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTechniciansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
