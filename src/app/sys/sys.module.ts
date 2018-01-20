import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysComponent } from './sys.component';
import {SysRoutesModule} from './sys.routes';
import { OrgComponent } from './org/org.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { ResourceComponent } from './resource/resource.component';

@NgModule({
  imports: [
    CommonModule,
    SysRoutesModule
  ],
  declarations: [
    SysComponent,
    OrgComponent,
    RoleComponent,
    UserComponent,
    ResourceComponent
  ]
})
export class SysModule { }
