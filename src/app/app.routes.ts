/**
 * Created by hllinc on 2018/1/17 16:07
 */
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './services/auth-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    // canActivate: [AuthGuard],
    component: LoginComponent
  },
  {
    path: 'frame',
    canActivate: [AuthGuard],
    loadChildren: './frame/frame.module#FrameModule'
  },
  {
    path: '**', // 注：这个404路由一定要写在最后，否则会影响其他路由的匹配
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutesModule {
}
