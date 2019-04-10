import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {NzFormatEmitEvent, NzModalRef, NzTreeNode} from 'ng-zorro-antd';
import {UserService} from '../user.service';
import {OrgService} from '../../org/org.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User;
  // 表单对象
  validateForm: FormGroup;

  // 树数据
  nodes = [];

  expandKeys = [];

  constructor(private modal: NzModalRef, private fb: FormBuilder, private subSystemService: UserService,
              private orgService: OrgService) {
  }

  /**
   * 设置表单值
   */
  setFormValue(user: User) {
    this.validateForm.setValue({
      id: user.id,
      username: user.username,
      orgId: user.orgId,
      email: user.email,
      phone: user.phone
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
      phone: [null]
    });
    this.orgService.getOrgDataBySubSystemId(this.user.subSystemId).subscribe(data => {
      const tempNodes = [];
      for (let i = 0; i < data.length; i++) {
        const o = data[i];
        tempNodes.push({
          title: o.name,
          key: o.id,
          isLeaf: o.isLeaf
        });
      }
      this.nodes = tempNodes;
      // 初始化表单数据
      if (this.user && this.user.id) {
        this.subSystemService.getUserById(this.user.id).subscribe(userData => {
          this.user = userData;
          this.setFormValue(this.user);
        });
      }
    });
  }

  /**
   * 树节点展开事件
   * @param name
   * @param e
   */
  expandEvent(name: string, e: NzFormatEmitEvent): void {
    if (name === 'expand') {
      if (e.node.getChildren().length === 0 && e.node.isExpanded) {
        this.orgService.getOrgsByParentId(e.node.key).subscribe(data => {
          const tempChildrenNodes = [];
          for (let i = 0; i < data.length; i++) {
            const o = data[i];
            tempChildrenNodes.push({
              title: o.name,
              key: o.id,
              isLeaf: o.isLeaf
            });
          }
          e.node.addChildren(tempChildrenNodes);
        });
      }
    }
  }
}
