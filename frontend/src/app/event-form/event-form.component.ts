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
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  eventFormGroup;
  age;
  countryOptions;
  employeeOptions;

  constructor(private fb: FormBuilder, private eventService: EventService, private route: ActivatedRoute,
              private router: Router, public genreService: GenreService, private userService: UserService, private http: HttpClient) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.countryOptions = data.countryOptions;
    this.employeeOptions = data.employeeOptions;

    this.eventFormGroup = this.fb.group({
      'id': [null],
      'title': ['', [Validators.required]],
      'genre': [null],
      'date': [null, [Validators.required]],
      'plot': ['', [Validators.required, this.badWordValidator()]],
      'duration': [null, [Validators.max(300)]],
      'country': [null],
      'worker': [[]],
      'rating': [null],
      'pictures': [[]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/event/' + id + '/get')
          .subscribe((response) => {
            this.eventFormGroup.patchValue(response, {emitEvent: false});
          });
    }

    this.eventFormGroup.controls.release_date.valueChanges.subscribe(() => {
      const releaseDate = this.eventFormGroup.controls.release_date.value;
      this.age = undefined;
      if (releaseDate) {
        this.age = this.calculateAge(new Date(releaseDate));
      }
    });

    if (data.event) {
      this.eventFormGroup.patchValue(data.event);
    }
  }

  calculateAge(date) {
    const ageDifMs = Date.now() - date;
    if (ageDifMs > 0) {
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return 0;
    }
  }

  createEvent() {
    const event = this.eventFormGroup.value;
    if (event.id) {
      this.eventService.updateEvent(event)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.eventService.createEvent(event)
        .subscribe((response: any) => {
          this.router.navigate(['/event-form/' + response.id]);
        });
    }
  }

  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /bad word/.test(control.value);
      return forbidden ? {'badWord': {value: control.value}} : null;
    };
  }

  titleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.eventService.getEvents()
        .pipe(
          map((events: any[]) => {
            const currentId = this.eventFormGroup.controls.id.value;
            const currentTitle = this.eventFormGroup.controls.title.value;
            const eventWithSameTitle = events.find((m) => {
              return (currentId || m.id !== currentId) && m.title === currentTitle
            });
            if (eventWithSameTitle) {
              return {
                titleAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    }
  }

}
