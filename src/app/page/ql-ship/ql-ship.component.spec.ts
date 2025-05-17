import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlShipComponent } from './ql-ship.component';

describe('QlShipComponent', () => {
  let component: QlShipComponent;
  let fixture: ComponentFixture<QlShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlShipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
