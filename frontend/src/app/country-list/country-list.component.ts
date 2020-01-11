import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {Observable} from 'rxjs';
import {GenreService} from '../service/genre.service';
import {UserService} from '../service/user.service';
import {CountryService} from '../service/country.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  countries: any[];
  displayedColumns = ['name', 'capital', 'size', 'id'];

  constructor(private countryService: CountryService, public genreService: GenreService, public userService: UserService) {
  }

  ngOnInit() {
    this.countryService.getCountries()
        .subscribe((response: any[]) => {
          this.countries = response;
        });
  }

  deleteEvent(country: any) {
    this.countryService.deleteCountry(country)
        .subscribe(() => {
          this.ngOnInit();
        });
  }
}
