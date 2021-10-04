import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductSpecialistsModifyComponent } from './assign-product-specialists-modify.component';

describe('AssignProductSpecialistsModifyComponent', () => {
  let component: AssignProductSpecialistsModifyComponent;
  let fixture: ComponentFixture<AssignProductSpecialistsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProductSpecialistsModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductSpecialistsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
