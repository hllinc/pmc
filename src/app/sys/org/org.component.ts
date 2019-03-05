import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Org} from '../models/org';
import {OrgService} from './org.service';
import {NzFormatEmitEvent, NzModalService, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  // 表单对象
  validateForm: FormGroup;

  orgPropLoading = true;
  // 树数据
  nodes = [];

  activedNode: NzTreeNode;

  @ViewChild('treeCom') treeCom;

  constructor(private fb: FormBuilder, private orgService: OrgService, private modalService: NzModalService) {
    this.orgService.getOrgRoot().subscribe(data => {
      if (data.code === 'ok') {
        this.nodes = [new NzTreeNode(data.result[0])];
      }
    });
  }

  nzClick(data: NzFormatEmitEvent): void {
    if (this.activedNode) {
      // delete selectedNodeList(u can do anything u want)
      this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);
    }
    data.node.isSelected = true;
    this.activedNode = data.node;
    // console.log(event, event.selectedKeys, event.keys, event.nodes, this.treeCom.getSelectedNodeList());
    // const selectedOrg = event.node;
    if (this.activedNode) {
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
        this.validateForm.controls[ i ].updateValueAndValidity();
      }
    }
  }

  mouseAction(name: string, e: NzFormatEmitEvent): void {
    if (name === 'expand') {
      setTimeout(_ => {
        if (e.node.getChildren().length === 0 && e.node.isExpanded) {
          e.node.addChildren([
            {
              name: 'childAdd-1',
              info: '121212',
              id: '10031-' + (new Date()).getTime()
            },
            {
              name: 'childAdd-2',
              info: '121212',
              id: '10032-' + (new Date()).getTime(),
              isLeaf: true
            }]);
        }
      }, 1000);
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
      info: [null],
      subSystemId: [null]
    });
  }
}
