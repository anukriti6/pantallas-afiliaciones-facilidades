import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProviderDetailComponent } from './company-provider-detail.component';

describe('CompanyProviderDetailComponent', () => {
  let component: CompanyProviderDetailComponent;
  let fixture: ComponentFixture<CompanyProviderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyProviderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProviderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
