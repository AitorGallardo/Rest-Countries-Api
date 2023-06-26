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
 
    static create(json:any): Country {
       const event = new Country();
       if (json) {
          event.name = json.name.common ? json.name.common : '';
          event.native_name = json.name.official ? json.name.official : '';
          event.population = json.population ? json.population : 0;
          event.flag_img = json.flags.png ? json.flags.png : null;
          event.flag_alt = json.flags.alt ? json.flags.alt : null;
          event.region = json.region ? json.region : '';
          event.sub_region = json.subregion ? json.subregion : '';
          event.capital = json.capital ? json.capital : '';
          event.top_level_domain = json.tld ? json.tld : '';
          event.currencies = json.currencies ? json.currencies : [];
          event.languages = json.languages ? json.languages : [];
          event.border_countries = json.borders ? json.borders : [];
       }
 
       return event;
    }
 
 }