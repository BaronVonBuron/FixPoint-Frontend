import { TestBed } from '@angular/core/testing';

import { PriorityNamerService } from './priority.namer.service';

describe('PriorityNamerService', () => {
  let service: PriorityNamerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorityNamerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
