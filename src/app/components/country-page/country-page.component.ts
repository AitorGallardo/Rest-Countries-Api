import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent {

  countryName:  string | null = '';
  constructor(private route: ActivatedRoute) {

  }

  removeSpacesAndLowerCase(str: string | null): string | null {
    if (str) {
      const stringWithoutSpaces = str.replace(/\s/g, '');
      const lowerCaseString = stringWithoutSpaces.toLowerCase();
      return lowerCaseString;

    }
    return null;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      this.countryName = this.removeSpacesAndLowerCase(name);
    });
  }
}
