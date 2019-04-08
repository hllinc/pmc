import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Org} from '../../models/org';
import {SubSystem} from '../../models/sub-system';
import {SubSystemService} from '../sub-system.service';

@Component({
  selector: 'app-sub-system-form',
  templateUrl: './sub-system-form.component.html',
  styleUrls: ['./sub-system-form.component.css']
})
export class SubSystemFormComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;

  @Input() subSystem: SubSystem;
  // 表单对象
  validateForm: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder, private subSystemService: SubSystemService) {
  }

  /**
   * 设置表单值
   */
  setFormValue(subSystem: SubSystem) {
    this.validateForm.setValue({
      id: subSystem.id,
      name: subSystem.name,
      info: subSystem.info,
      url: subSystem.url
    });
  }

  /**
   * 保存
   */
  saveOrg() {
    const newOrg = this.validateForm.value;
    console.log(newOrg);
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
      name: [null, [Validators.required]],
      info: [null],
      url: [null, [Validators.required]]
    });
    // 初始化表单数据
    if (this.subSystem) {
      this.subSystemService.getSubSystemById(this.subSystem.id).subscribe(data => {
        this.subSystem = data;
        this.setFormValue(this.subSystem);
      });
    }
  }

}
