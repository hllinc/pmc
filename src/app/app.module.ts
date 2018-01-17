import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {DataService} from './services/data.service';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ButtonModule, CheckboxModule, CodeHighlighterModule, InputTextModule, RadioButtonModule,
  TabViewModule
} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    CodeHighlighterModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
