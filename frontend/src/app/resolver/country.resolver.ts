import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CountryService} from '../service/country.service';
import {EmployeeService} from '../service/employee.service';
import {EventService} from '../service/event.service';

@Injectable({
  providedIn: 'root'
})
export class CountryResolver implements Resolve<Observable<any>> {
  constructor(private countryService: CountryService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.countryService.getCountry(route.paramMap.get('id'));
  }
}
