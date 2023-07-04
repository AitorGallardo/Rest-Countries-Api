import { CountryService } from 'src/app/services/country.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-border-countries',
  templateUrl: './border-countries.component.html',
  styleUrls: ['./border-countries.component.css']
})
export class BorderCountriesComponent {
  screenSize: string = 'extra-large';
  @Input() borderCountriesName: string[] = [];
  @Output() onClickCountry = new EventEmitter();


  constructor(private countryService:CountryService) {

  }

  onClick(name:string) {
    this.onClickCountry.emit(name);
  }

  ngOnInit() {
    this.getScreenSize();
  }

  getScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 576) {
      this.screenSize = 'small';
    } else if (screenWidth >= 576 && screenWidth < 992) {
      this.screenSize = 'medium';
    } else if (screenWidth >= 992 && screenWidth < 1200) {
      this.screenSize = 'large';
    } else {
      this.screenSize = 'extra-large';
    }
  }
}
