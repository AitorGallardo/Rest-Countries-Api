import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country.model';
import { FilterObject } from 'src/app/models/types';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-home',
  templateUrl: './country-home.component.html',
  styleUrls: ['./country-home.component.css']
})
export class CountryHomeComponent {
  inputValue: string = '';
  selectedRegion: string = '';
  countries: Array<Country> = [];
  fiteredCountries: Array<Country> = [];

  constructor(private countryService: CountryService, private router: Router) {
    this.countryService.getAllCountries().subscribe((res) => {
      this.countries = res;
      this.fiteredCountries = res;

    })
  }

  navigate({ name }: { name: string }): void {
    this.router.navigate(['/details', name]);
  }

  onInputChange(target: any): void {
    const { value: inputValue } = target;
    const filterObj: FilterObject = { inputValue }
    this.fiteredCountries = this.countryService.filterCountry(filterObj, this.countries);
  }
  onSelectorChange(target: any): void {
    const { value: selectValue } = target;
    const filterObj: FilterObject = { selectValue }
    this.fiteredCountries = this.countryService.filterCountry(filterObj, this.countries);
  }
}
