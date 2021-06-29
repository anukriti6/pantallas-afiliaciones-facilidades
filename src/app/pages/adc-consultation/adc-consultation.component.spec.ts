import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcConsultationComponent } from './adc-consultation.component';

describe('AdcConsultationComponent', () => {
  let component: AdcConsultationComponent;
  let fixture: ComponentFixture<AdcConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdcConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
