import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCaseComponent } from './create-new-case.component';

describe('CreateNewCaseComponent', () => {
  let component: CreateNewCaseComponent;
  let fixture: ComponentFixture<CreateNewCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewCaseComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateNewCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
