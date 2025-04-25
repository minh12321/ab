import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhToanPopupComponent } from './thanh-toan-popup.component';

describe('ThanhToanPopupComponent', () => {
  let component: ThanhToanPopupComponent;
  let fixture: ComponentFixture<ThanhToanPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanhToanPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanhToanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
