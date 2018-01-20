import {Component, OnInit, ElementRef, HostListener, Input} from '@angular/core';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './app-side-menu.component.html',
  styleUrls: ['./app-side-menu.component.scss']
})
export class AppSideMenuComponent implements OnInit {
  public menus = [
    {
      id: '1',
      name: '权限管理',
      isOpen: false,
      icon: 'fa-home',
      children: [
        {name: '组织架构', icon: 'fa-male', route: 'sys/org'},
        {name: '用户管理', icon: 'fa-bug', route: 'sys/user'},
        {name: '角色管理', icon: 'fa-bus', route: 'sys/role'},
        {name: '权限管理', icon: 'fa-send', route: 'sys/resource'}
      ]
    },
    {
      id: '2',
      name: '内容管理',
      isOpen: false,
      icon: 'fa-magic',
      children: [
        {name: '文章管理', icon: 'fa-mobile', route: 'post/posttable/page/1'},
        {name: '评论管理', icon: 'fa-minus', route: 'comment/commenttable/page/1'}
      ]
    },
    {
      id: '3',
      name: '系统监控',
      isOpen: false,
      icon: 'fa-wrench',
      children: [
        {name: '系统状态', icon: 'fa-line-chart', route: 'sys/sysmonitor'},
        {name: '高德地图', icon: 'fa-map-marker', route: 'map/map'}
      ]
    }
  ];

  public isCollapse = false;

  constructor(private elementRef: ElementRef, private eventBusService: EventBusService) {
  }

  ngOnInit() {
    this.eventBusService.topToggleBtn.subscribe(value => {
      this.toggleMenuAll(value);
    });
  }

  private toggleMenuAll(isCollapse: boolean): void {
    this.isCollapse = isCollapse;
    this.menus.forEach(item => {
      item.isOpen = false;
    });
  }

  public toggleMenuItem(event, menu): void {
    menu.isOpen = !menu.isOpen;
    // 折叠状态下只能打开一个二级菜单层
    if (this.isCollapse) {
      const tempId = menu.id;
      this.menus.forEach(item => {
        if (item.id !== tempId) {
          item.isOpen = false;
        }
      });
    }
  }

  @HostListener('body:click', ['$event'])
  public onBodyClick(event): void {
    if (this.isCollapse && (event.clientX > 75)) {
      this.menus.forEach(item => {
        item.isOpen = false;
      });
    }
  }
}
