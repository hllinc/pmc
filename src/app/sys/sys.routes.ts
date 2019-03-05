/**
 * Created by hllinc on 2018/1/19 14:39
 */
import {SysComponent} from './sys.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OrgComponent} from './org/org.component';
import {UserComponent} from './user/user.component';
import {RoleComponent} from './role/role.component';
import {ResourceComponent} from './resource/resource.component';
import {SubSystemComponent} from './sub-system/sub-system.component';

export const sysRoutes = [
  {
    path: '',
    component: SysComponent,
    children: [
      {
        path: '',
        redirectTo: 'sub-system',
        pathMatch: 'full'
      },
      {
        path: 'sub-system',
        component: SubSystemComponent
      },
      {
        path: 'org',
        component: OrgComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: 'resource',
        component: ResourceComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(sysRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SysRoutesModule {
}
