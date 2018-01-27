import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {FrameRoutesModule} from './frame.routes';
import {FrameComponent} from './frame.component';

@NgModule({
  imports: [
    SharedModule,
    FrameRoutesModule
  ],
  declarations: [
    FrameComponent
  ]
})
export class FrameModule { }
