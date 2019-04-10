import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd';
import {Role} from '../../models/role';
import {RoleService} from '../role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  @Input() role: Role;
  // 表单对象
  validateForm: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder, private roleService: RoleService) {
  }

  /**
   * 设置表单值
   */
  setFormValue(role: Role) {
    this.validateForm.setValue({
      id: role.id,
      name: role.name,
      info: role.info
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
  getRoleFormValue() {
    console.log('role form.')
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
      name: [null, [Validators.required]],
      info: [null]
    });
    // 初始化表单数据
    if (this.role) {
      this.roleService.selectById(this.role.id).subscribe(data => {
        this.role = data;
        this.setFormValue(this.role);
      });
    }
  }

}
