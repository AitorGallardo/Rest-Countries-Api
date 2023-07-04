import { Country } from './models/country.model';
import { CountryService } from './services/country.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkTheme = true;
  constructor(private countryService: CountryService,) {
    this.countryService.getAllCountries().subscribe();
  }

  handleTheme(event:boolean){
    this.isDarkTheme = event;
    console.log('theme',event);
  }
}
