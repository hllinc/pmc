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
    this.activedNode = null;
    this.orgService.getOrgDataBySubSystemId(subSystem.id).subscribe(data => {
      this.nodes = data;
      this.orgLoading = false;
      this.addOrgBtnStatus = false;
      // 重置表单
      this.validateForm.reset();
    });
  }

  nzClick(data: NzFormatEmitEvent): void {
    // const selectedOrg = this.treeCom.getSelectedNodeList()[0];
    // toogle选择模式
    if (data.node === this.activedNode) {
      // 置空当前激活的节点以正常添加根节点
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
      this.deleteOrgBtnStatus = true;
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
          e.node.addChildren(data);
        });
      }
    }
  }

  /**
   * 保存org
   */
  saveOrg(): void {
    const newOrg = this.validateForm.value;
    this.orgService.updateOrg(newOrg).subscribe(data => {
      this.activedNode.origin = newOrg;
    });
  }

  /**
   * 添加节点
   */
  addOrg(): void {
    const org = {
      parentId: this.activedNode ? this.activedNode.origin.id : null,
      name: '新建节点',
      subSystemId: this.selectedSubSystem.id,
      isLeaf: true,
      info: '描述'
    };
    this.orgService.addOrg(org).subscribe(data => {
      const node = {
        id: data.id,
        key: data.id,
        title: org.name
      };
      Object.assign(node, org);
      const newNode = new NzTreeNode(node);
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
      // 可删除
      this.deleteOrgBtnStatus = false;
      // 设置表单值
      this.setFormValue(newNode.origin);
    });
  }

  /**
   * 删除
   */
  deleteOrg(): void {
    this.modalService.confirm({
      nzTitle: '确定删除[' + this.activedNode.origin.name + ']节点数据吗?',
      nzContent: '确定后该节点以及其所有子节点均会被删除且不能恢复！',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.orgService.deleteById(this.activedNode.origin.id).subscribe(data => {
          // 如果是根节点
          if (this.activedNode.level === 0) {
            this.treeCom.nzTreeService.rootNodes.forEach((node, index, array) => {
              if (node === this.activedNode) {
                // 删除节点
                this.treeCom.nzTreeService.rootNodes.splice(index, 1);
                return;
              }
            });
          } else {
            // 如果是子节点
            this.activedNode.getParentNode().getChildren().forEach((node, index, array) => {
              if (node === this.activedNode) {
                // 删除节点
                this.activedNode.getParentNode().getChildren().splice(index, 1);
                // 如果父节点下没有子节点，则将父节点的类型变为叶子节点
                if (this.activedNode.getParentNode().getChildren().length === 0) {
                  this.activedNode.getParentNode().isLeaf = true;
                }
                return;
              }
            });
          }
          // 可删除
          this.deleteOrgBtnStatus = true;
          // 置空当前激活的节点以正常添加根节点
          this.activedNode = null;
          // 重置表单
          this.validateForm.reset();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
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
