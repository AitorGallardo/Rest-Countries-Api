import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderCountriesComponent } from './border-countries.component';

describe('BorderCountriesComponent', () => {
  let component: BorderCountriesComponent;
  let fixture: ComponentFixture<BorderCountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorderCountriesComponent]
    });
    fixture = TestBed.createComponent(BorderCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
