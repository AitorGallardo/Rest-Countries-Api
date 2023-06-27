import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';
import { FilterObject } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  API_URL = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }


  getAllCountries(): Observable<Country[]> {
    const allUrl = `${this.API_URL}/all`;

    return this.http.get(allUrl).pipe(
      map(res => {

        const rawCountries = <[]>res;
        const countries: Array<Country> = [];
        rawCountries.map(res => {
          const event = Country.create(res)
          countries.push(event);
        });
        return countries;
      }));
  }

  getCountry(name: string): Observable<Country> {
    const url = `${this.API_URL}name/${name}`;

    return this.http.get(url).pipe(
      map(res => {
        const [rawCountry] = <Array<any>>res;
        console.log('raw', rawCountry);
        const country = Country.create(rawCountry)
        return country;
      }));
  }

  filterCountry({ inputValue, selectValue }:FilterObject, countries: Array<Country>): Array<Country> {
    const evalInput = inputValue ?
      (name: string) => this.includesWithLowerCase(name, inputValue)
      : () => true;
    const evalSelect = selectValue ?
      (name: string) => this.includesWithLowerCase(name, selectValue)
      : () => true;

    return countries.filter(({ name, region }) =>
      evalInput(name) && evalSelect(region)
    )
  }

  private includesWithLowerCase(mainValue: string, checkingValue: string): boolean {
    return mainValue.toLowerCase().includes(checkingValue.toLowerCase())
  }


}
