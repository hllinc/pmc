import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Org} from '../../sys/models/org';
import {ResourceService} from '../../sys/resource/resource.service';
import {NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';
import {Role} from '../../sys/models/role';
import {RoleResource} from '../../sys/models/role-resource';
import {Util} from '../../utils/util';

@Component({
  selector: 'app-resource-chooser',
  templateUrl: './resource-chooser.component.html',
  styleUrls: ['./resource-chooser.component.css']
})
export class ResourceChooserComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  // 树数据
  nodes = [];
  // 初始选中的节点
  defaultCheckedKeys = [];

  // 传入的角色参数变量
  paramRole: Role;

  /**
   * 传入的角色参数方法
   * @param role
   */
  @Input()
  set role(role: Role) {
    this.paramRole = role;
    this.resourceService.getSubSystemAllResourceBySubSystemId(role.subSystemId).subscribe(data => {
      Util.formatNodeData(data);
      this.nodes = data;
      // 设置默认选中
      this.resourceService.getResourceByRoleId(role.id).subscribe(res => {
        this.defaultCheckedKeys = res.map((item) => {
          return item['resourceId'];
        });
      });
    });
  }

  /**
   * 获取checked状态的keys
   * @param arr
   */
  getCheckedKeys(arr: NzTreeNode[]) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      const node = arr[i];
      result.push(node.key);
      if (node.children.length > 0) {
        result = result.concat(this.getCheckedKeys(node.children));
      }
    }
    return result;
  }

  /**
   * 获取选中的节点
   */
  getSelectedResources(): RoleResource[] {
    let needSaveToDataBaseKeys;
    const halfCheckedList = this.treeCom.nzTreeService.getHalfCheckedNodeList();
    const checkedList = this.treeCom.nzTreeService.getCheckedNodeList();
    const halfCheckedKeys = halfCheckedList.map((item) => {
      return item.key;
    });
    const checkedKeys = this.getCheckedKeys(checkedList);
    needSaveToDataBaseKeys = halfCheckedKeys.concat(checkedKeys);
    return needSaveToDataBaseKeys.map((item) => {
      const rr = new RoleResource();
      rr.resourceId = item;
      rr.roleId = this.paramRole.id;
      return rr;
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
  }

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit() {
  }

}
