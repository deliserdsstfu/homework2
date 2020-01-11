import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CountryService} from '../service/country.service';

@Injectable({
  providedIn: 'root'
})
export class CountryOptionsResolver implements Resolve<Observable<any>> {
  constructor(private countryService: CountryService) {
  }

  resolve() {
    return this.countryService.retrieveCountryOptions();
  }
}
