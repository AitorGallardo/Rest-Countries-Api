import { Country } from './../../models/country.model';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})
export class CountryCardComponent {
  @Input() country: Country;


  constructor(){
    this.country = new Country();
  }
}
