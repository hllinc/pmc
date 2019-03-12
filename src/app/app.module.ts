import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DataService} from './services/data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {LoginService} from './login/login.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';

import {NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS, NZ_I18N, zh_CN} from 'ng-zorro-antd';

// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';

import {AppRoutesModule} from './app.routes';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

// const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];
// 引入全部的图标，不推荐 ❌
import * as AllIcons from '@ant-design/icons-angular/icons';
import {ErrorInterceptor} from './inject/ErrorInterceptor';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    NgZorroAntdModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DataService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
