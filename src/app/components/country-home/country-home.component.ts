import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Country } from 'src/app/models/country.model';
import { FilterObject } from 'src/app/models/types';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-home',
  templateUrl: './country-home.component.html',
  styleUrls: ['./country-home.component.css']
})
export class CountryHomeComponent {
  
  svgIcon: SafeResourceUrl | null = null;

  inputValue: string = '';
  selectValue: string = '';
  countries: Array<Country> = [];
  fiteredCountries: Array<Country> = [];


  constructor(private countryService: CountryService, private router: Router,private sanitizer: DomSanitizer) {

    // this.loadSvgIcon();    
    this.countryService.getAllCountries().subscribe((res) => {
      this.countries = res;
      this.fiteredCountries = res;

    })
  }
  loadSvgIcon() {
    const svgFile = 'assets/search-icon.svg';

    // Read the SVG file as text
    fetch(svgFile)
      .then(response => response.text())
      .then(svgData => {
        // Sanitize and assign the SVG data
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(svgData);
      });
  }


  navigate({ name }: { name: string }): void {
    this.router.navigate(['/details'], { queryParams: { isCode: false } });
  }

  onChange(selectedValue?:string): void {
    const inputValue = this.inputValue;
    this.selectValue = selectedValue ? selectedValue : this.selectValue;
    const selectValue = this.selectValue;
    const filterObj: FilterObject = { inputValue, selectValue }
    this.fiteredCountries = this.countryService.filterCountry(filterObj, this.countries);
  }
}
