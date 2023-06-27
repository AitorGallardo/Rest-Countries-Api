interface CurrencyObj<T> {
   key: string;
   value: T;
}

export class Country {

   name: string;
   native_name: string;
   population: number;
   flag_img: string;
   flag_alt: string;
   region: string;
   sub_region: string;
   capital: string;
   top_level_domain: string;
   currencies: Array<string>;
   languages: Array<string>;
   border_countries: Array<string>;


   constructor() {
      this.name = '';
      this.native_name = '';
      this.population = 0;
      this.flag_img = '';
      this.flag_alt = '';
      this.region = '';
      this.sub_region = '';
      this.capital = '';
      this.top_level_domain = '';
      this.currencies = [];
      this.languages = [];
      this.border_countries = [];
   }


   static create(json: any): Country {
      const country = new Country();
      if (json) {
         country.name = json.name.common ? json.name.common : '';
         country.native_name = json.name.official ? json.name.official : '';
         country.population = json.population ? json.population : 0;
         country.flag_img = json.flags.png ? json.flags.png : null;
         country.flag_alt = json.flags.alt ? json.flags.alt : null;
         country.region = json.region ? json.region : '';
         country.sub_region = json.subregion ? json.subregion : '';
         country.capital = json.capital ? json.capital : '';
         country.top_level_domain = json.tld ? json.tld : '';
         country.currencies = json.currencies ? this.sanitaizeCurrencies(json.currencies) : [];
         country.languages = json.languages ? Object.values(json.languages) : [];
         country.border_countries = json.borders ? json.borders : [];


      }

      return country;
   }

   private static sanitaizeCurrencies(currencies: any): Array<string> {
      return Object.values(currencies).map((currency: any) => {
         const {name} = currency;
         return name;
      });
   }



}