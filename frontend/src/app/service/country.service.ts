import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {
  }

  retrieveCountryOptions() {
    return this.http.get <any[]>('/api/country/options');
  }

  getCountries() {
    return this.http.get('/api/country/list');
  }

  createCountry(country) {
    return this.http.post('/api/country/create', country);
  }

  updateCountry(country) {
    return this.http.put('/api/country/' + country.id + '/update', country);
  }

  getCountry(id) {
    return this.http.get('/api/country/' + id + '/get');
  }

  deleteCountry(country) {
    return this.http.delete('/api/country/' + country.id + '/delete');
  }

}
