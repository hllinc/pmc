import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {NzModalService} from 'ng-zorro-antd';
import {User} from '../sys/models/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  isCollapsed = false;
  user: User;

  constructor(private authService: AuthService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logoutEvent() {
    this.modalService.confirm({
      nzTitle: '系统提示',
      nzContent: '确定退出系统吗？',
      nzOnOk: () => {
        window.location.href = environment.serverHost + '/logout';
      }
    });
  }

}
