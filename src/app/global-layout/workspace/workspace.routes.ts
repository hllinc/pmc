import {WorkspaceComponent} from './workspace.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

export const workspaceRoutes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {path: 'sys', loadChildren: '../../sys/sys.module#SysModule'}
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(workspaceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkspaceRoutesModule {
}
