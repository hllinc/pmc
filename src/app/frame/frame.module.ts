import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {FrameRoutesModule} from './frame.routes';
import {FrameComponent} from './frame.component';
import {HomeComponent} from '../home/home.component';

@NgModule({
  imports: [
    SharedModule,
    FrameRoutesModule
  ],
  declarations: [
    FrameComponent,
    HomeComponent
  ]
})
export class FrameModule { }
