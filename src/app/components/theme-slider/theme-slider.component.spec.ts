import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSliderComponent } from './theme-slider.component';

describe('ThemeSliderComponent', () => {
  let component: ThemeSliderComponent;
  let fixture: ComponentFixture<ThemeSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeSliderComponent]
    });
    fixture = TestBed.createComponent(ThemeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
