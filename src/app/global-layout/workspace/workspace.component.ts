import {Component, OnInit, ElementRef} from '@angular/core';
import {EventBusService} from '../../services/event-bus.service';
import {MenuItem} from 'primeng/primeng';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public isCollapsed = false;

  items: MenuItem[];
  home: MenuItem;

  constructor(private authService: AuthService, private elementRef: ElementRef, private eventBusService: EventBusService) {

  }

  ngOnInit() {
    this.eventBusService.topToggleBtn.subscribe(value => {
      this.toggleMenuStatus(value);
    });

    this.items = [
      {label: '系统管理'},
      {label: '组织架构', url: ''}
    ];
    this.home = {icon: 'fa fa-home'};
  }

  private toggleMenuStatus(isCollapse: boolean): void {
    this.isCollapsed = isCollapse;
  }
}
