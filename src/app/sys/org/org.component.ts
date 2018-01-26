import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {OrgService} from './org.service';
import {User} from '../models/user';
import {UserService} from '../user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Org} from '../models/org';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  public orgTree: TreeNode[];

  // 当前选中的节点
  public selectedNode: TreeNode;
  public orgName: string;
  public orgCode: string;
  public disabled = true;
  public isNew = false;

  public treeLoading = true;

  org: Org = new Org();

  // 表单验证
  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private orgService: OrgService) { }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      no: [null, [Validators.required]]
    });
    this.orgService.getOrgData().subscribe(data => {
      this.orgTree = data;
      this.treeLoading = false;
    });
  }

  public nodeSelect(event): void {
    this.disabled = true;
    this.isNew = false;
    this.orgName = this.selectedNode.label;
    this.orgCode = this.selectedNode.data;
  }
}
