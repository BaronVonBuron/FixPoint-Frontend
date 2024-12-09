import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNotesComponent } from './case-notes.component';

describe('CaseNotesComponent', () => {
  let component: CaseNotesComponent;
  let fixture: ComponentFixture<CaseNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
