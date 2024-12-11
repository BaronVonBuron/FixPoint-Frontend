import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTechnicianComponent } from './new-technician.component';

describe('NewTechnicianComponent', () => {
  let component: NewTechnicianComponent;
  let fixture: ComponentFixture<NewTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTechnicianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
