import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DataService} from './services/data.service';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutesModule} from './app.routes';
import {AuthGuard} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {LoginService} from './login/login.service';
import {MessageModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutesModule,
    MessageModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DataService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
