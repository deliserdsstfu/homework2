import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genreNames = {
    p: 'Party',
    c: 'Convention',
    g: 'Graduation',
    k: 'Konzert'
  };

  constructor() { }
}
