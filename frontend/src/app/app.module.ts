import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventListComponent} from './event-list/event-list.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {EventFormComponent} from './event-form/event-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DateComponent} from './date/date.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BarRatingModule} from 'ngx-bar-rating';
import {LoginComponent} from './login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {LogoutComponent} from './logout/logout.component';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {HttperrorInterceptor} from './httperror.interceptor';
import {FileUploadModule} from 'ng2-file-upload';
import {MediainputComponent} from './mediainput/mediainput.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { GoogleMapsModule } from '@angular/google-maps'

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventFormComponent,
    DateComponent,
    LoginComponent,
    LogoutComponent,
    MediainputComponent,
    CountryListComponent,
    CountryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    BarRatingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    MatSnackBarModule,
    FileUploadModule,
    GoogleMapsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttperrorInterceptor,
      multi: true,
      deps: [MatSnackBar]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
