import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';
import {NzModalService} from 'ng-zorro-antd';
import {User} from '../sys/models/user';
import {AuthService} from '../services/auth.service';
import {Resource} from '../sys/models/resource';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  isCollapsed = false;
  user: User;
  userResources: Resource[] = null;
  subMenu: Resource[];

  constructor(private authService: AuthService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userResources = this.authService.getCurrentUserResources();
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

  /**
   * 根据一级菜单资源id获取子菜单
   * @param {number} id
   * @returns {Resource[]}
   */
  setSubMenuByResourceId(id: number) {
    for (let i = 0; i < this.userResources.length; i++) {
      if (this.userResources[i].id === id) {
        this.subMenu = this.userResources[i].children;
      }
    }
  }
}
