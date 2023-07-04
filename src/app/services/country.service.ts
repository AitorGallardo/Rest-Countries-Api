import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';
import { CountryDictionary, FilterObject } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryNamesDictionary = new Map<string, string>();
  private countryNamesDictionarySubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private allCountries: Array<Country> = [];

  API_URL = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }


  getAllCountries(): Observable<Country[]> {
    const allUrl = `${this.API_URL}/all`;

    if (this.allCountries.length > 0) {
      this.countryNamesDictionarySubject.next(true);
      this.countryNamesDictionarySubject.complete();
      return of(this.allCountries);
    }

    return this.http.get(allUrl).pipe(
      map(res => {
        const rawCountries = <[]>res;
        const countries: Array<Country> = [];
        rawCountries.map(res => {
          const country = Country.create(res)
          countries.push(country);
          this.countryNamesDictionary.set(country.cca3, country.name)
        });
        this.countryNamesDictionarySubject.next(true);
        this.countryNamesDictionarySubject.complete();
        this.allCountries = countries;
        return countries;
      }));
  }


  getCountryByName(name: string): Observable<Country> {
    const url = `${this.API_URL}name/${name}`;

    return this.http.get(url).pipe(
      map(res => {
        const [rawCountry] = <Array<any>>res;
        const country = Country.create(rawCountry)
        return country;
      }));
  }
  getCountryByCode(code: string): Observable<Country> {
    const url = `${this.API_URL}alpha/${code}`;

    return this.http.get(url).pipe(
      map(res => {

        const [rawCountry] = <Array<any>>res;
        const country = Country.create(rawCountry)
        return country;
      }));
  }

  filterCountry({ inputValue, selectValue }: FilterObject, countries: Array<Country>): Array<Country> {
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

  public getContryName(cca3: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.countryNamesDictionarySubject.subscribe((isCompleted) => {
        if(isCompleted){
          const res = <string>this.countryNamesDictionary.get(cca3);
          resolve(res);
        }
      })
    });
  }


}
