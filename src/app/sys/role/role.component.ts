import {Component, OnInit} from '@angular/core';
import {SubSystem} from '../models/sub-system';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {RoleService} from './role.service';
import {RoleFormComponent} from './role-form/role-form.component';
import {Role} from '../models/role';
import {ResourceChooserComponent} from '../../shared/resource-chooser/resource-chooser.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  subSystem: SubSystem;

  pageNum = 1;
  pageSize = 20;
  startRow = 1;

  dataSet = [];

  total = 1;
  loading = false;

  constructor(private roleService: RoleService, private modalService: NzModalService, private messageService: NzMessageService) {

  }

  ngOnInit() {
  }

  /**
   * 子系统切换事件
   * @param subSystem
   */
  orgChangeSubSystemEvent(subSystem: SubSystem) {
    this.subSystem = subSystem;
    this.loadRoleTable(true);
  }

  /**
   * 加载列表
   */
  loadRoleTable(reset: boolean = false) {
    if (reset) {
      this.pageNum = 1;
    }
    this.roleService.getRolesByPage(this.pageNum, this.pageSize, this.subSystem.id).subscribe(data => {
      this.dataSet = data.list;
      this.total = data.total;
      this.startRow = data.startRow;
      this.loading = false;
    });
  }

  /**
   * 添加角色
   */
  addRole() {
    const modal = this.modalService.create({
      nzTitle: '添加角色',
      nzContent: RoleFormComponent,
      nzMaskClosable: false,
      nzComponentParams: {},
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          modal.close();
        }
      }, {
        label: '添加',
        type: 'primary',
        onClick: (componentInstance: RoleFormComponent) => {
          const newRole = componentInstance.getRoleFormValue();
          if (newRole) {
            newRole.subSystemId = this.subSystem.id;
            this.roleService.addRole(newRole).subscribe(data => {
              modal.close();
              this.messageService.create('success', '添加成功');
              this.loadRoleTable();
            });
          }
        }
      }]
    });
  }

  /**
   * 修改角色
   * @param role
   */
  modifyRole(role: Role) {
    const modal = this.modalService.create({
      nzTitle: '编辑角色',
      nzContent: RoleFormComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        role: role
      },
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          modal.close();
        }
      }, {
        label: '保存',
        type: 'primary',
        onClick: (componentInstance: RoleFormComponent) => {
          const newRole = componentInstance.getRoleFormValue();
          if (newRole) {
            newRole.subSystemId = this.subSystem.id;
            this.roleService.updateRole(newRole).subscribe(data => {
              modal.close();
              this.messageService.create('success', '修改成功');
              this.loadRoleTable();
            });
          }
        }
      }]
    });
  }

  /**
   * 删除角色
   * @param id
   */
  deleteRole(id: number) {
    this.roleService.delete(id).subscribe(data => {
      this.messageService.create('success', '删除成功');
      this.loadRoleTable();
    });
  }

  /**
   * 给角色分配资源权限
   * @param role
   */
  setResource(role: Role) {
    const modal = this.modalService.create({
      nzTitle: '给【' + role.name + '】角色分配资源',
      nzContent: ResourceChooserComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        role: role
      },
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          modal.close();
        }
      }, {
        label: '分配',
        type: 'primary',
        onClick: (componentInstance: ResourceChooserComponent) => {
          // setRoleResource
          const rr = componentInstance.getSelectedResources();
          if (rr) {
            this.roleService.setRoleResource(rr).subscribe(data => {
              modal.close();
              this.messageService.create('success', '分配成功');
            });
          }
        }
      }]
    });
  }

}
