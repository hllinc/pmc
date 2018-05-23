import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  isCollapsed = false;

  constructor(private modalService: NzModalService) {
  }

  ngOnInit() {
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
