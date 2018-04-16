import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwidgetComponent } from './loginwidget.component';

describe('LoginwidgetComponent', () => {
  let component: LoginwidgetComponent;
  let fixture: ComponentFixture<LoginwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
