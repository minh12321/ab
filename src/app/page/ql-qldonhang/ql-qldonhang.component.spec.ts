import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlQldonhangComponent } from './ql-qldonhang.component';

describe('QlQldonhangComponent', () => {
  let component: QlQldonhangComponent;
  let fixture: ComponentFixture<QlQldonhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlQldonhangComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlQldonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
