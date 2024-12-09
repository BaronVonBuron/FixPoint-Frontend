import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCaseDashboardComponent } from './customer-case-dashboard.component';

describe('CustomerCaseDashboardComponent', () => {
  let component: CustomerCaseDashboardComponent;
  let fixture: ComponentFixture<CustomerCaseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCaseDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCaseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
