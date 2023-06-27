import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CountryPageComponent } from './components/country-page/country-page.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryHomeComponent } from './components/country-home/country-home.component';

const routes: Routes = [
  {
    path: '',
    component: CountryHomeComponent
  },
  {
    path: 'details/:name',
    component: CountryPageComponent
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
