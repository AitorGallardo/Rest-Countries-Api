import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent {
  country: Country;
  constructor(private route: ActivatedRoute, public countryService: CountryService, private location: Location, private router: Router) {
    this.country = new Country();
  }

  goBack(): void {
    this.location.back();
  }

  goToBorderCountry(name: string): void {

    this.countryService.getCountryByCode(name).subscribe(res => {
      this.country = res;
      const newUrl = `/details/${this.country.name}`;

      this.location.replaceState(newUrl);
    })

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
      this.countryService.getCountryByName(name).subscribe(res => {
        this.country = res;
      });
    });


  }


}
