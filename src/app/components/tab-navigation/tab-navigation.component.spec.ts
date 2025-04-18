import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavigationComponent } from './tab-navigation.component';
import { AppModule } from '../../app.module';

describe('TabNavigationComponent', () => {
  let component: TabNavigationComponent;
  let fixture: ComponentFixture<TabNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
