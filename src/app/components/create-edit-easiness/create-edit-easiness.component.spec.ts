import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditEasinessComponent } from './create-edit-easiness.component';

describe('CreateEditEasinessComponent', () => {
  let component: CreateEditEasinessComponent;
  let fixture: ComponentFixture<CreateEditEasinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditEasinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditEasinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
