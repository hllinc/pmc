import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'angular-tree-component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Org} from '../models/org';
import {OrgService} from './org.service';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  // 表单对象
  validateForm: FormGroup;
  // 当前选中节点对象
  selectedNode: TreeNode;
  // 选中的组织
  selectedOrg: Org = new Org();

  constructor(private fb: FormBuilder, private orgService: OrgService) {
  }

  nodes = [
    {
      id: 1,
      name: 'root1',
      info: '这是根节点',
      enable: true,
      children: [
        {id: 2, name: 'child1'},
        {id: 3, name: 'child2'}
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        {id: 5, name: 'child2.1'},
        {
          id: 6,
          name: 'child2.2',
          children: [
            {id: 7, name: 'subsub'}
          ]
        }
      ]
    }
  ];
  options = {};

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
  }

  treeActivate($event) {
    this.selectedNode = $event.node;
    this.selectedOrg = this.selectedNode.data;
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
  };

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  /**
   * 保存org
   */
  saveOrg() {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      info: [false],
      enable: [false]
    });
    this.orgService.getOrgData().subscribe(data => {
      this.nodes = data;
    });
  }
}
