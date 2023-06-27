import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent {
  countries: Array<Country> = [];

  constructor(private countryService: CountryService, private router: Router){
    this.countryService.getAllCountries().subscribe((res) => {
      this.countries = res;
    })
  }

  navigate({name}:{name:string}): void {
    this.router.navigate(['/details',name]);
  }

}
