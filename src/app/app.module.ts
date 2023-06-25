import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryPageComponent } from './components/country-page/country-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryCardComponent,
    CountryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
