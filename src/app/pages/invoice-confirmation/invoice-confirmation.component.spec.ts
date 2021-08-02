import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceConfirmationComponent } from './relate-easinesses.component';

describe('RelateEasinessesComponent', () => {
  let component: InvoiceConfirmationComponent;
  let fixture: ComponentFixture<InvoiceConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
