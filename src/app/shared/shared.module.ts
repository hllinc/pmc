import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SubSystemChooserComponent} from './sub-system-chooser/sub-system-chooser.component';
import { OrgChooserComponent } from './org-chooser/org-chooser.component';
import { ResourceChooserComponent } from './resource-chooser/resource-chooser.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [SubSystemChooserComponent, OrgChooserComponent, ResourceChooserComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SubSystemChooserComponent,
    OrgChooserComponent,
    ResourceChooserComponent
  ]
})

export class SharedModule {
}
