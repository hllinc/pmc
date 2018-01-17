import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FrameRoutesModule} from './frame.routes';
import {FrameComponent} from './frame.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FrameRoutesModule
  ],
  declarations: [
    FrameComponent,
    HomeComponent
  ]
})
export class FrameModule {
}
