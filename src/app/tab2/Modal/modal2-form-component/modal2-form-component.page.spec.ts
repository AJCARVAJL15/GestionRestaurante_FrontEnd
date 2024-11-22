import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal2FormComponentPage } from './modal2-form-component.page';

describe('Modal2FormComponentPage', () => {
  let component: Modal2FormComponentPage;
  let fixture: ComponentFixture<Modal2FormComponentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal2FormComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
