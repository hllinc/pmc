import {Component, OnInit, ViewChild} from '@angular/core';
import {SubSystem} from '../models/sub-system';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzFormatEmitEvent, NzMessageService, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {ResourceService} from './resource.service';
import {Resource} from '../models/resource';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['../org/org.component.scss']
})
export class ResourceComponent implements OnInit {

  // 表单对象
  validateForm: FormGroup;

  // 组织机构属性面板遮罩
  resourcePropLoading = true;
  // 组织机构面板遮罩
  resourceLoading = true;

  // 按钮状态
  addResourceBtnStatus = true;
  deleteResourceBtnStatus = true;
  // 树数据
  nodes = [];

  activedNode: NzTreeNode;

  // 选中的子系统
  selectedSubSystem: SubSystem;

  @ViewChild('treeCom') treeCom;

  constructor(private fb: FormBuilder,
              private resourceService: ResourceService,
              private modalService: NzModalService,
              private messageService: NzMessageService) {
  }

  /**
   * 子系统切换事件
   * @param subSystem
   */
  resourceChangeSubSystemEvent(subSystem: SubSystem) {
    this.selectedSubSystem = subSystem;
    this.activedNode = null;
    this.resourceService.getResourceDataBySubSystemId(subSystem.id).subscribe(data => {
      this.nodes = data;
      this.resourceLoading = false;
      this.addResourceBtnStatus = false;
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
      this.resourcePropLoading = true;
    } else {
      this.activedNode = data.node;
    }
    if (this.activedNode) {
      // this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);
      this.addResourceBtnStatus = false;
      this.deleteResourceBtnStatus = false;
      this.resourcePropLoading = false;
      this.setFormValue(this.activedNode.origin);
    } else {
      this.deleteResourceBtnStatus = true;
      this.validateForm.reset();
    }
  }

  /**
   * 设置表单值
   */
  setFormValue(resource: Resource) {
    this.validateForm.setValue({
      id: resource.id,
      name: resource.name,
      parentId: resource.parentId,
      info: resource.info,
      type: resource.type,
      icon: resource.icon,
      url: resource.url
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
        this.resourceService.getOrgsByParentId(e.node.origin.id).subscribe(data => {
          e.node.addChildren(data);
        });
      }
    }
  }

  /**
   * 保存org
   */
  saveOrg(): void {
    const newResource = this.validateForm.value;
    this.resourceService.updateResource(newResource).subscribe(data => {
      this.messageService.create('success', '保存成功');
      this.activedNode.origin = newResource;
    });
  }

  /**
   * 添加节点
   */
  addOrg(): void {
    const resource = {
      parentId: this.activedNode ? this.activedNode.origin.id : null,
      name: '新建节点',
      subSystemId: this.selectedSubSystem.id,
      isLeaf: true,
      type: 1,
      icon: 'file',
      url: 'http://',
      info: '描述',
      orderNo: 0
    };
    this.resourceService.addResource(resource).subscribe(data => {
      const node = {
        id: data.id,
        key: data.id,
        title: resource.name
      };
      Object.assign(node, resource);
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
      this.deleteResourceBtnStatus = false;
      // 设置表单值
      this.setFormValue(newNode.origin);
      this.messageService.create('success', '添加成功');
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
        this.resourceService.deleteById(this.activedNode.origin.id).subscribe(data => {
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
          this.deleteResourceBtnStatus = true;
          // 置空当前激活的节点以正常添加根节点
          this.activedNode = null;
          // 重置表单
          this.validateForm.reset();
          this.messageService.create('success', '删除成功');
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
      parentId: [null],
      info: [null],
      type: [null, [Validators.required]],
      icon: [null],
      url: [null, [Validators.required]]
    });
  }

}
