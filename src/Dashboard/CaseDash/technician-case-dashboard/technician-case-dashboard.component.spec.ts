import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianCaseDashboardComponent } from './technician-case-dashboard.component';

describe('TechnicianCaseDashboardComponent', () => {
  let component: TechnicianCaseDashboardComponent;
  let fixture: ComponentFixture<TechnicianCaseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianCaseDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianCaseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
