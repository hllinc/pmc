/**
 * Created by hllinc on 2018/1/19 14:39
 */
import {FrameComponent} from './frame.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../services/auth-guard.service';
import {HomeComponent} from '../home/home.component';

export const frameRoutes = [
  {
    path: '',
    component: FrameComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'sys',
        canActivate: [AuthGuard],
        loadChildren: '../sys/sys.module#SysModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(frameRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FrameRoutesModule {
}
