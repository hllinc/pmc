import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {NzModalRef} from 'ng-zorro-antd';
import {UserService} from '../user.service';
import {Org} from '../../models/org';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User;
  // 表单对象
  validateForm: FormGroup;

  selectedOrg: Org;

  constructor(private modal: NzModalRef, private fb: FormBuilder, private subSystemService: UserService) {
  }

  selectedOrgEvent(org: Org) {
    this.selectedOrg = org;
  }

  /**
   * 设置表单值
   */
  setFormValue(user: User) {
    if (user.orgId) {
      this.selectedOrg = new Org();
      this.selectedOrg.id = user.orgId;
    }
    this.validateForm.setValue({
      id: user.id,
      username: user.username,
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
      const user = this.validateForm.value;
      if (this.selectedOrg) {
        user.orgId = this.selectedOrg.id;
      }
      return user;
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null],
      username: [null, [Validators.required]],
      email: [null, [Validators.email]],
      phone: [null]
    });
    // 初始化表单数据
    if (this.user && this.user.id) {
      this.subSystemService.getUserById(this.user.id).subscribe(data => {
        this.user = data;
        this.setFormValue(this.user);
      });
    }
  }

}
