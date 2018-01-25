import {Component, OnInit, ElementRef, HostListener} from '@angular/core';
import {EventBusService} from '../../services/event-bus.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {LoginService} from '../../login/login.service';

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
              private eventBusService: EventBusService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public onTogglerClick(event): void {
    this.toggleBtnStatus = !this.toggleBtnStatus;
    this.eventBusService.topToggleBtn.next(this.toggleBtnStatus);
  }

  logoutEvent() {
    this.loginService.logout().subscribe(data => {

    });
  }
}
