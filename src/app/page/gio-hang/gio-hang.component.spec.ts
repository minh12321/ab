import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GioHangComponent } from './gio-hang.component';
import { AppModule } from '../../app.module';

describe('GioHangComponent', () => {
  let component: GioHangComponent;
  let fixture: ComponentFixture<GioHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(GioHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
