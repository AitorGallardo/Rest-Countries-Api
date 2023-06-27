import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';

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
        const country = Country.create(rawCountry)
        return country;
      }));
  }


}
