import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-home',
  templateUrl: './country-home.component.html',
  styleUrls: ['./country-home.component.css']
})
export class CountryHomeComponent {
  inputValue: string = '';
  countries: Array<Country> = [];
  fiteredCountries: Array<Country> = [];

  constructor(private countryService: CountryService, private router: Router){
    this.countryService.getAllCountries().subscribe((res) => {
      this.countries = res;
      this.fiteredCountries = res;

      const hola = res.find((country)=>country.name.toLowerCase().includes('jorda'))
      console.log('hola',hola);
    })
  }

  navigate({name}:{name:string}): void {
    this.router.navigate(['/details',name]);
  }

  onInputChange(target: any): void {
    this.fiteredCountries = this.countryService.filterCountry(this.inputValue,this.countries);
  }
}
