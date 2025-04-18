import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSanPhamComponent } from './them-san-pham.component';
import { AppModule } from '../../app.module';

describe('ThemSanPhamComponent', () => {
  let component: ThemSanPhamComponent;
  let fixture: ComponentFixture<ThemSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
