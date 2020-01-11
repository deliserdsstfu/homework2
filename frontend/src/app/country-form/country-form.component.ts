import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../service/event.service';
import {GenreService} from '../service/genre.service';
import {CountryService} from '../service/country.service';
import {EmployeeService} from '../service/employee.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../service/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {

  countryFormGroup;


  constructor(private fb: FormBuilder, private countryService: CountryService, private route: ActivatedRoute,
              private router: Router, private userService: UserService, private http: HttpClient) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;

    this.countryFormGroup = this.fb.group({
      id: [null],
      name: [null],
      capital: [null],
      size: [null],
      citizens: [null],
      pictures: [[]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/country/' + id + '/get')
          .subscribe((response) => {
            this.countryFormGroup.patchValue(response, {emitEvent: false});
          });
    }
    if (data.country) {
      this.countryFormGroup.patchValue(data.country);
    }
  }

  createCountry() {
    const country = this.countryFormGroup.value;
    if (country.id) {
      this.countryService.updateCountry(country)
          .subscribe(() => {
            alert('updated successfully');
          });
    } else {
      this.countryService.createCountry(country)
          .subscribe((response: any) => {
            this.router.navigate(['/country-form/' + response.id]);
          });
    }
  }

}
