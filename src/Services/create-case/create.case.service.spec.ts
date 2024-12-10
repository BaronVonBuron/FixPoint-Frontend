import { TestBed } from '@angular/core/testing';

import { CreateCaseService } from './create.case.service';

describe('CreateCaseService', () => {
  let service: CreateCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
