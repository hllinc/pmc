import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Org} from '../models/org';
import {OrgService} from './org.service';
import {NzFormatEmitEvent, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {SubSystemService} from '../sub-system/sub-system.service';
import {SubSystem} from '../models/sub-system';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  // 表单对象
  validateForm: FormGroup;

  // 组织机构属性面板遮罩
  orgPropLoading = true;
  // 组织机构面板遮罩
  orgLoading = true;

  // 按钮状态
  addOrgBtnStatus = true;
  deleteOrgBtnStatus = true;
  // 树数据
  nodes = [];

  activedNode: NzTreeNode;

  @ViewChild('treeCom') treeCom;

  constructor(private fb: FormBuilder,
              private orgService: OrgService,
              private modalService: NzModalService) {
  }

  /**
   * 子系统切换事件
   * @param subSystem
   */
  orgChangeSubSystemEvent(subSystem: SubSystem) {
    this.orgService.getOrgDataBySubSystemId(subSystem.id).subscribe(data => {
      if (data.code === 'ok') {
        this.nodes = data.result;
        this.orgLoading = false;
      }
    });
  }

  nzClick(data: NzFormatEmitEvent): void {
    data.node.isSelected = true;
    this.activedNode = data.node;
    // console.log(event, event.selectedKeys, event.keys, event.nodes, this.treeCom.getSelectedNodeList());
    // const selectedOrg = event.node;
    if (this.activedNode) {
      this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);
      this.deleteOrgBtnStatus = false;
      this.addOrgBtnStatus = false;
      this.orgPropLoading = false;
      this.setFormValue(this.activedNode.origin);
    }
  }

  /**
   * 设置表单值
   */
  setFormValue(org: Org) {
    this.validateForm.setValue({
      id: org.id,
      name: org.name,
      info: org.info
    });
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  mouseAction(name: string, e: NzFormatEmitEvent): void {
    if (name === 'expand') {
      if (e.node.getChildren().length === 0 && e.node.isExpanded) {
        this.orgService.getOrgsByParentId(e.node.origin.id).subscribe(data => {
          if (data.code === 'ok') {
            e.node.addChildren(data.result);
          } else {
            this.modalService.warning({
              nzTitle: '提示',
              nzContent: data.info
            });
          }
        });
      }
    }
  }

  /**
   * 保存org
   */
  saveOrg() {
    const newOrg = this.validateForm.value;
    console.log(newOrg);
  }

  addOrgTemp() {
    const org = {
      pid: '',
      name: '新建节点'
    };
    this.orgService.addOrg(org).subscribe(data => {
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      info: [null]
    });
  }
}
