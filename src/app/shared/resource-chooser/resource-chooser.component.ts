import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Org} from '../../sys/models/org';
import {ResourceService} from '../../sys/resource/resource.service';
import {NzFormatEmitEvent} from 'ng-zorro-antd';
import {Role} from '../../sys/models/role';

@Component({
  selector: 'app-resource-chooser',
  templateUrl: './resource-chooser.component.html',
  styleUrls: ['./resource-chooser.component.css']
})
export class ResourceChooserComponent implements OnInit {

  defaultCheckedKeys = [];
  defaultSelectedKeys = [];

  @ViewChild('treeCom') treeCom;
  // 树数据
  nodes = [];
  // 向外发送数据触发器
  @Output() selectedEvent = new EventEmitter<Org>();

  /**
   * 传入的角色参数
   * @param role
   */
  @Input()
  set role(role: Role) {
    this.resourceService.getSubSystemAllResourceBySubSystemId(role.subSystemId).subscribe(data => {
      this.formatNodeData(data);
      this.nodes = data;
      // 设置默认选中
      this.resourceService.getResourceByRoleId(role.id).subscribe(res => {
        this.defaultSelectedKeys = res.map((item) => {
          return item['resourceId'];
        });
      });
    });
  }

  formatNodeData(arr: any) {
    arr.map((item) => {
      item['title'] = item['name'];
      item['key'] = item['id'];
      if (item['children']) {
        this.formatNodeData(item['children']);
      }
      return item;
    });
  }


  getSelectedResources(): any{

  }

  nzEvent(event: NzFormatEmitEvent): void {
    const set = new Set();
    console.log(event.checkedKeys);
  }

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit() {
  }

}
