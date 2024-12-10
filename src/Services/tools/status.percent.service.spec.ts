import { TestBed } from '@angular/core/testing';

import { StatusPercentService } from './status.percent.service';

describe('StatusPercentService', () => {
  let service: StatusPercentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusPercentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
