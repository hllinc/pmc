import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Org} from '../models/org';
import {OrgService} from './org.service';
import {NzFormatEmitEvent, NzModalService, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
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

  // 选中的子系统
  selectedSubSystem: SubSystem;

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
    this.selectedSubSystem = subSystem;
    this.orgService.getOrgDataBySubSystemId(subSystem.id).subscribe(data => {
      if (data.code === 'ok') {
        this.nodes = data.result;
        this.orgLoading = false;
        this.addOrgBtnStatus = false;
        // 重置表单
        this.validateForm.reset();
      }
    });
  }

  nzClick(data: NzFormatEmitEvent): void {
    // const selectedOrg = this.treeCom.getSelectedNodeList()[0];
    // toogle选择模式
    if (data.node === this.activedNode) {
      this.activedNode = null;
    } else {
      this.activedNode = data.node;
    }
    if (this.activedNode) {
      // this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);
      this.addOrgBtnStatus = false;
      this.deleteOrgBtnStatus = false;
      this.orgPropLoading = false;
      this.setFormValue(this.activedNode.origin);
    } else {
      this.validateForm.reset();
    }
  }

  /**
   * 设置表单值
   */
  setFormValue(org: Org) {
    this.validateForm.setValue({
      id: org.id,
      name: org.name,
      parentId: org.parentId,
      info: org.info
    });
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  /**
   * 树节点展开事件
   * @param name
   * @param e
   */
  expandEvent(name: string, e: NzFormatEmitEvent): void {
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
    this.orgService.updateOrg(newOrg).subscribe(data => {
      if (data.code === 'ok') {
        this.activedNode.origin = newOrg;
        this.modalService.success({
          nzTitle: '提示',
          nzContent: data.info
        });
      } else {
        this.modalService.warning({
          nzTitle: '提示',
          nzContent: data.info
        });
      }
    });
  }

  /**
   * 添加节点
   */
  addOrg() {
    const org = {
      id: null,
      key: null,
      parentId: this.activedNode ? this.activedNode.origin.id : null,
      name: '新建节点',
      subSystemId: this.selectedSubSystem.id,
      isLeaf: true,
      info: '描述',
      title: ''
    };
    this.orgService.addOrg(org).subscribe(data => {
      if (data.code === 'ok') {
        org.id = data.result;
        org.key = org.id;
        org.title = org.name;
        const newNode = new NzTreeNode(org);
        if (this.activedNode) {
          // 设置父节点不是子节点
          this.activedNode.isLeaf = false;
          // 添加子节点到该父节点下
          this.activedNode.addChildren([newNode]);
          // 设置父节点展开
          this.activedNode.setExpanded(true);
        } else {
          // 添加根节点
          this.treeCom.nzTreeService.rootNodes.push(newNode);
        }
        // 选中新增节点
        this.activedNode = newNode;
        this.activedNode.setSelected(true);
        // 重置表单
        this.setFormValue(newNode.origin);
      }
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      info: [null],
      parentId: [null]
    });
  }
}
