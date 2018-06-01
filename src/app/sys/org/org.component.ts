import {Component, OnInit} from '@angular/core';
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
  // 选中的组织
  selectedOrg: Org = new Org();

  constructor(private fb: FormBuilder, private orgService: OrgService, private modalService: NzModalService) {
    this.orgService.getOrgRoot().subscribe(data => {
      if (data.code === 'ok') {
        // this.nodes = [new NzTreeNode(data.result[0])];
      }
    });
  }

  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
      children: []
    }),
    new NzTreeNode({
      title   : 'root2',
      key     : '1002',
      children: []
    }),
    new NzTreeNode({
      title: 'root3',
      key  : '1003'
    })
  ];

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
  }
  mouseAction(name: string, e: NzFormatEmitEvent): void {
    if (name === 'expand') {
      setTimeout(_ => {
        if (e.node.getChildren().length === 0 && e.node.isExpanded) {
          e.node.addChildren([
            {
              title: 'childAdd-1',
              key  : '10031-' + (new Date()).getTime()
            },
            {
              title : 'childAdd-2',
              key   : '10032-' + (new Date()).getTime(),
              isLeaf: true
            } ]);
        }
      }, 1000);
    }
  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }
  /**
   * 保存org
   */
  saveOrg() {
    this.orgService.updateOrg(this.selectedOrg).subscribe(data => {
      this.modalService.success({
        nzTitle: '系统提示',
        nzContent: data.info
      });
    });
  }

  addOrgTemp() {
    const org = {
      pid: this.selectedOrg.id,
      name: '新建节点'
    };
    this.orgService.addOrg(org).subscribe(data => {
      if (data.code === 'ok') {
        if (!this.selectedOrg.children) {
          this.selectedOrg.children = [];
        }
      }
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      no: [null, [Validators.required]],
      info: [false],
      enable: [false]
    });
  }
}
