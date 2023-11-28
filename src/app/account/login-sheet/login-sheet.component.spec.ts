import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSheetComponent } from './login-sheet.component';

describe('LoginSheetComponent', () => {
  let component: LoginSheetComponent;
  let fixture: ComponentFixture<LoginSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSheetComponent]
    });
    fixture = TestBed.createComponent(LoginSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
