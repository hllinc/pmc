import {NgModule} from '@angular/core';

import {AccordionModule, BreadcrumbModule} from 'primeng/primeng';

import {LeftNavComponent} from '../left-nav/left-nav.component';
import {TopMenuComponent} from '../top-menu/top-menu.component';
import {FooterInfoComponent} from '../footer-info/footer-info.component';
import {WorkspaceComponent} from './workspace.component';

import {AppSideMenuComponent} from '../left-nav/app-side-menu/app-side-menu.component';
import {WorkspaceRoutesModule} from './workspace.routes';
import {SharedModule} from '../../shared/shared.module';
import {EventBusService} from '../../services/event-bus.service';

@NgModule({
  imports: [
    SharedModule,
    AccordionModule,
    BreadcrumbModule,
    WorkspaceRoutesModule
  ],
  exports: [],
  declarations: [
    WorkspaceComponent,
    LeftNavComponent,
    TopMenuComponent,
    FooterInfoComponent,
    AppSideMenuComponent
  ],
  providers: [
    EventBusService
  ]
})
export class WorkspaceModule {
}
