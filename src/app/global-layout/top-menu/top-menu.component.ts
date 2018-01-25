import {Component, OnInit, ElementRef, HostListener} from '@angular/core';
import {EventBusService} from '../../services/event-bus.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {LoginService} from '../../login/login.service';
import {ConfirmationService} from 'primeng/primeng';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  private toggleBtnStatus = false;
  public showTopMenu = false;

  user: User;

  constructor(private authService: AuthService,
              private loginService: LoginService,
              private elementRef: ElementRef,
              private eventBusService: EventBusService,
              private confirmationService: ConfirmationService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public onTogglerClick(event): void {
    this.toggleBtnStatus = !this.toggleBtnStatus;
    this.eventBusService.topToggleBtn.next(this.toggleBtnStatus);
  }

  logoutEvent() {
    this.showTopMenu = false;
    this.confirmationService.confirm({
      message: '确定退出系统吗？',
      header: '系统提示',
      icon: 'fa-question-circle',
      accept: () => {
        window.location.href = environment.serverHost + '/logout';
      },
      reject: () => {
      }
    });
  }
}
