import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamComponent } from './sanpham.component';
import { AppModule } from '../../app.module';

describe('SanphamComponent', () => {
  let component: SanphamComponent;
  let fixture: ComponentFixture<SanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
