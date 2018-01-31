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
import {TreeModule} from 'angular-tree-component';

@NgModule({
  imports: [
    TreeModule,
    SharedModule,
    SysRoutesModule
  ],
  declarations: [
    SysComponent,
    OrgComponent,
    RoleComponent,
    UserComponent,
    ResourceComponent
  ],
  providers: [
    OrgService,
    UserService
  ]
})
export class SysModule {
}
