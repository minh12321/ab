import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinsanphamComponent } from './thongtinsanpham.component';

describe('ThongtinsanphamComponent', () => {
  let component: ThongtinsanphamComponent;
  let fixture: ComponentFixture<ThongtinsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongtinsanphamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongtinsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
