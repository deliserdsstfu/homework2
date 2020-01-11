import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CountryService} from '../service/country.service';
import {EmployeeService} from '../service/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeOptionsResolver implements Resolve<Observable<any>> {
  constructor(private employeeService: EmployeeService) {
  }

  resolve() {
    return this.employeeService.retrieveEmployeeOptions();
  }
}
