import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecialistsComponent } from './product-specialists.component';

describe('ProductSpecialistsComponent', () => {
  let component: ProductSpecialistsComponent;
  let fixture: ComponentFixture<ProductSpecialistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSpecialistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecialistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
