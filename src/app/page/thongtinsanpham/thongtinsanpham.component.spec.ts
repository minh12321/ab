import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinsanphamComponent } from './thongtinsanpham.component';
import { AppModule } from '../../app.module';

describe('ThongtinsanphamComponent', () => {
  let component: ThongtinsanphamComponent;
  let fixture: ComponentFixture<ThongtinsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
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
