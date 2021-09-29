import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecialistsRelationComponent } from './product-specialists-relation.component';

describe('ProductSpecialistsRelationComponent', () => {
  let component: ProductSpecialistsRelationComponent;
  let fixture: ComponentFixture<ProductSpecialistsRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSpecialistsRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecialistsRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
