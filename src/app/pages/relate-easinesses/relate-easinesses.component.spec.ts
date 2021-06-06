import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelateEasinessesComponent } from './relate-easinesses.component';

describe('RelateEasinessesComponent', () => {
  let component: RelateEasinessesComponent;
  let fixture: ComponentFixture<RelateEasinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelateEasinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelateEasinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
