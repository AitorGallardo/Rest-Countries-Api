import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  API_URL = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }


  getAllCountries(): Observable<Country[]> {
    return this.http.get(this.API_URL).pipe(
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

}
