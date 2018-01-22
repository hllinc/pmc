import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SysComponent} from './sys.component';
import {SysRoutesModule} from './sys.routes';
import {OrgComponent} from './org/org.component';
import {RoleComponent} from './role/role.component';
import {UserComponent} from './user/user.component';
import {ResourceComponent} from './resource/resource.component';
import {ButtonModule, DataTableModule, PanelModule, TooltipModule, TreeModule} from 'primeng/primeng';
import {OrgService} from './org/org.service';
import {UserService} from './user/user.service';

@NgModule({
  imports: [
    CommonModule,
    SysRoutesModule,
    PanelModule,
    ButtonModule,
    TreeModule,
    DataTableModule,
    TooltipModule
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
