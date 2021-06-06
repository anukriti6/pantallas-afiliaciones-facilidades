import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelateAnchorCompanyComponent } from './relate-anchor-company.component';

describe('RelateAnchorCompanyComponent', () => {
  let component: RelateAnchorCompanyComponent;
  let fixture: ComponentFixture<RelateAnchorCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelateAnchorCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelateAnchorCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
