import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdcComponent } from './company-adc.component';

describe('CompanyAdcComponent', () => {
  let component: CompanyAdcComponent;
  let fixture: ComponentFixture<CompanyAdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
