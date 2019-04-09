import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SubSystemChooserComponent} from './sub-system-chooser/sub-system-chooser.component';
import { OrgChooserComponent } from './org-chooser/org-chooser.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [SubSystemChooserComponent, OrgChooserComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SubSystemChooserComponent,
    OrgChooserComponent
  ]
})

export class SharedModule {
}
