import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent {
  country: Country;
  constructor(private route: ActivatedRoute, private countryService: CountryService,private location: Location) {
    this.country = new Country();
  }

  goBack(): void {
    this.location.back();
  }

  removeSpacesAndLowerCase(str: string): string {
    if (str) {
      const stringWithoutSpaces = str.replace(/\s/g, '');
      const lowerCaseString = stringWithoutSpaces.toLowerCase();
      return lowerCaseString;

    }
    return '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name') ? <string>params.get('name') : '';
      this.countryService.getCountry(name).subscribe((res) => {
        this.country = res;

      })
    });
  }
}
