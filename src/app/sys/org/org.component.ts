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

  @ViewChild('treeCom') treeCom;

  constructor(private fb: FormBuilder, private orgService: OrgService, private modalService: NzModalService) {
    this.orgService.getOrgRoot().subscribe(data => {
      if (data.code === 'ok') {
        // this.nodes = [new NzTreeNode(data.result[0])];
      }
    });
  }

  nodes = [
    new NzTreeNode({
      title: 'root1',
      key: '1001',
      children: []
    }),
    new NzTreeNode({
      title: 'root2',
      key: '1002',
      children: []
    }),
    new NzTreeNode({
      title: 'root3',
      key: '1003'
    })
  ];

  nzClick(event: NzFormatEmitEvent): void {
    // console.log(event, event.selectedKeys, event.keys, event.nodes, this.treeCom.getSelectedNodeList());
    // const selectedOrg = event.node;
    const selectedOrg = this.treeCom.getSelectedNodeList()[0];
    if (selectedOrg) {
      const org: Org = new Org();
      org.id = selectedOrg.key;
      org.name = selectedOrg.title;
      org.no = '1212';
      org.info = '1212';
      org.enable = true;
      this.setFormValue(org);
    } else {
      this.validateForm.reset();
    }
  }

  /**
   * 设置表单值
   */
  setFormValue(org) {
    this.validateForm.setValue(org);
  }

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
              key: '10031-' + (new Date()).getTime()
            },
            {
              title: 'childAdd-2',
              key: '10032-' + (new Date()).getTime(),
              isLeaf: true
            }]);
        }
      }, 1000);
    }
  }

  /**
   * 保存org
   */
  saveOrg(org) {
    this.orgService.updateOrg(org).subscribe(data => {
      this.modalService.success({
        nzTitle: '系统提示',
        nzContent: data.info
      });
    });
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
      no: [null],
      info: [null],
      enable: [null]
    });
  }
}
