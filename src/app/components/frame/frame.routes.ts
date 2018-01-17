/**
 * Created by hllinc on 2018/1/17 16:03
 */
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../services/auth-guard.service';
import {FrameComponent} from './frame.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';

const frameRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FrameComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
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
