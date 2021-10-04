import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductSpecialistsComponent } from './assign-product-specialists.component';

describe('AssignProductSpecialistsComponent', () => {
  let component: AssignProductSpecialistsComponent;
  let fixture: ComponentFixture<AssignProductSpecialistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProductSpecialistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductSpecialistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
