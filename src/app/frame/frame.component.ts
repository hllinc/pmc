import {AfterContentInit, Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {NzModalService} from 'ng-zorro-antd';
import {User} from '../sys/models/user';
import {AuthService} from '../services/auth.service';
import {Resource} from '../sys/models/resource';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RoutesRecognized
} from '@angular/router';
import {LoginService} from '../login/login.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, AfterContentInit {
  isCollapsed = false;
  user: User;
  userResources: Resource[] = null;
  subMenu: Resource[];

  constructor(private authService: AuthService, private modalService: NzModalService,
              private router: Router, private loginService: LoginService, private dataService: DataService) {
    // 监听路由改变事件
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 导航结束事件
        if (this.userResources) {
          this.setSubMenuByResourceUrl(router.url.split('/')[2]);
        }
      }
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userResources = this.authService.getCurrentUserResources();
  }

  ngAfterContentInit() {
    // 页面初始加载时设置子菜单数据
    this.setSubMenuByResourceUrl(this.router.url.split('/')[2]);
  }

  logoutEvent() {
    this.modalService.confirm({
      nzTitle: '系统提示',
      nzContent: '确定退出系统吗？',
      nzOnOk: () => {
        this.loginService.logout().subscribe(data => {
          if (data.code === 'ok') {
            this.dataService.clearToken();
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }

  /**
   * 根据一级菜单资源id获取子菜单
   * @param {number} id
   * @returns {Resource[]}
   */
  setSubMenuByResourceUrl(url: string) {
    let menu = null;
    if (this.userResources) {
      for (let i = 0; i < this.userResources.length; i++) {
        if (this.userResources[i].url === url) {
          menu = this.userResources[i].children;
        }
      }
    } else {
      this.modalService.warning({
        nzTitle: '系统提示',
        nzContent: '您当前没有菜单资源权限，请联系管理员为您分配。'
      });
    }
    if (this.subMenu !== menu) {
      this.subMenu = menu;
    }
  }
}
