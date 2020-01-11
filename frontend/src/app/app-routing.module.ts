import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import {EventFormComponent} from './event-form/event-form.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {CountryOptionsResolver} from './resolver/country-options.resolver';
import {EmployeeOptionsResolver} from './resolver/employee-options.resolver.service';
import {EventResolver} from './resolver/event.resolver';
import {CountryListComponent} from './country-list/country-list.component';
import {CountryFormComponent} from './country-form/country-form.component';
import {CountryResolver} from './resolver/country.resolver';


const routes: Routes = [
  {path: '', redirectTo: 'event-list', pathMatch: 'full'},
  {path: 'event-list', component: EventListComponent, canActivate: [AuthGuard]},
  {
    path: 'event-form',
    component: EventFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      countryOptions: CountryOptionsResolver,
      employeeOptions: EmployeeOptionsResolver,
    }
  },
  {
    path: 'event-form/:id',
    component: EventFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      countryOptions: CountryOptionsResolver,
      employeeOptions: EmployeeOptionsResolver,
      event: EventResolver,
    }
  },
  {path: 'country-list', component: CountryListComponent, canActivate: [AuthGuard]},
  {
    path: 'country-form',
    component: CountryFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'country-form/:id',
    component: CountryFormComponent,
    canActivate: [AuthGuard],
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
