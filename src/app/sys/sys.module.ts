import {NgModule} from '@angular/core';
import {SysComponent} from './sys.component';
import {SysRoutesModule} from './sys.routes';
import {OrgComponent} from './org/org.component';
import {RoleComponent} from './role/role.component';
import {UserComponent} from './user/user.component';
import {ResourceComponent} from './resource/resource.component';
import {OrgService} from './org/org.service';
import {UserService} from './user/user.service';
import {SharedModule} from '../shared/shared.module';
import {SubSystemComponent} from './sub-system/sub-system.component';
import {SubSystemService} from './sub-system/sub-system.service';
import { SubSystemFormComponent } from './sub-system/sub-system-form/sub-system-form.component';

@NgModule({
  imports: [
    SharedModule,
    SysRoutesModule
  ],
  declarations: [
    SysComponent,
    OrgComponent,
    RoleComponent,
    UserComponent,
    ResourceComponent,
    SubSystemComponent,
    SubSystemFormComponent
  ],
  providers: [
    SubSystemService,
    OrgService,
    UserService
  ],
  entryComponents: [
    SubSystemFormComponent
  ]
})
export class SysModule {
}
