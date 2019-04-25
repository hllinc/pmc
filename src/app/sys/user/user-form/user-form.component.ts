import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {NzFormatEmitEvent, NzModalRef, NzTreeNode} from 'ng-zorro-antd';
import {UserService} from '../user.service';
import {OrgService} from '../../org/org.service';
import {RoleService} from '../../role/role.service';
import {Role} from '../../models/role';
import {Util} from '../../../utils/util';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User;
  // 表单对象
  validateForm: FormGroup;

  roles: Role[];

  // 树数据
  nodes = [];

  constructor(private modal: NzModalRef, private fb: FormBuilder, private userService: UserService,
              private orgService: OrgService, private roleService: RoleService) {
  }

  /**
   * 设置表单值
   */
  setFormValue(user: User) {
    if (user.org) {
      this.nodes = [{
        title: user.org.name,
        key: user.org.id,
        isLeaf: user.org.isLeaf
      }];
    }
    this.validateForm.setValue({
      id: user.id,
      username: user.username,
      orgId: user.orgId,
      email: user.email,
      phone: user.phone,
      roles: user.roles.map(role => role.id)
    });
  }

  validateFormValue() {
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  /**
   * 获取表单数据
   */
  getFormValue() {
    this.validateFormValue();
    if (this.validateForm.valid) {
      return this.validateForm.value;
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null],
      username: [null, [Validators.required]],
      orgId: [null, [Validators.required]],
      email: [null, [Validators.email]],
      phone: [null],
      roles: [null, [Validators.required]]
    });
    // 加载角色列表
    this.roleService.getRolesByPage(1, 100, this.user.subSystemId).subscribe(data => {
      this.roles = data.list;
    });
    // 加载组织机构树
    this.orgService.getOrgTreeBySubSystemId(this.user.subSystemId).subscribe(data => {
      Util.formatNodeData(data);
      this.nodes = data;
    });
    // 初始化表单数据
    if (this.user && this.user.id) {
      this.userService.getUserById(this.user.id).subscribe(userData => {
        this.user = userData;
        this.setFormValue(this.user);
      });
    }
  }
}
