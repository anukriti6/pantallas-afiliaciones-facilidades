import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateProviderComponent } from './affiliate-provider.component';

describe('AffiliateProviderComponent', () => {
  let component: AffiliateProviderComponent;
  let fixture: ComponentFixture<AffiliateProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliateProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
