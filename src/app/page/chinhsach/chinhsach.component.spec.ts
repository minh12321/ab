import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhsachComponent } from './chinhsach.component';
import { AppModule } from '../../app.module';

describe('ChinhsachComponent', () => {
  let component: ChinhsachComponent;
  let fixture: ComponentFixture<ChinhsachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChinhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
