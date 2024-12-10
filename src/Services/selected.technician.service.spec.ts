import { TestBed } from '@angular/core/testing';

import { SelectedTechnicianService } from './selected.technician.service';

describe('SelectedTechnicianService', () => {
  let service: SelectedTechnicianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedTechnicianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
