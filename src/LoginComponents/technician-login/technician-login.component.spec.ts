import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianLoginComponent } from './technician-login.component';

describe('TechnicianLoginComponent', () => {
  let component: TechnicianLoginComponent;
  let fixture: ComponentFixture<TechnicianLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianLoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TechnicianLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
