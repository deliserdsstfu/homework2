import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {Observable} from 'rxjs';
import {GenreService} from '../service/genre.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: any[];
  displayedColumns = ['title', 'genre', 'country_name', 'id'];

  constructor(private eventService: EventService, public genreService: GenreService, public userService: UserService) {
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe((response: any[]) => {
        this.events = response;
      });
  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
