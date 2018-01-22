import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {OrgService} from './org.service';
import {User} from '../../models/user';
import {UserService} from '../user/user.service';

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

  public tableLoading = true;

  public users: User[];

  public userTableCols = [{
    field: 'username',
    header: '用户名'
  }, {
    field: 'age',
    header: '年龄'
  }];

  constructor(private orgService: OrgService, private userService: UserService) {

  }

  ngOnInit() {
    this.orgService.getOrgData().subscribe(data => {
      this.orgTree = data;
      this.treeLoading = false;
    });

    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.tableLoading = false;
    });
  }

  public confirmDelete(): void {
    // this.confirmationService.confirm({
    //     message: '确定要删除吗？',
    //     accept: () => {
    //         console.log('删除节点');
    //     }
    // });
  }

  public editOrSave(event): void {
    if (this.isNew) {
      const newNode: any = {
        label: this.orgName,
        data: this.orgCode,
        expandedIcon: 'fa-folder-open',
        collapsedIcon: 'fa-folder'
      };
      if (this.selectedNode) {
        if (!this.selectedNode.children) {
          this.selectedNode.children = [];
        }
        this.selectedNode.children.push(newNode);
      } else {
        this.orgTree.push(newNode);
      }
      return;
    }
    if (!this.disabled) {
      const node = this.findNodeRecursive(this.orgTree);
      if (node) {
        node.label = this.orgName;
        node.data = this.orgCode;
      }
    }
    this.disabled = !this.disabled;
  }

  private findNodeRecursive(nodes: any): any {
    if (nodes instanceof Array && nodes.length !== 0) {
      let result = null;
      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];
        console.log(element);
        if (element.data === this.orgCode) {
          result = element;
          break;
        } else if (element.children) {
          this.findNodeRecursive(element.children);
        }
      }
      return result;
    }
  }

  public nodeSelect(event): void {
    this.disabled = true;
    this.isNew = false;
    this.orgName = this.selectedNode.label;
    this.orgCode = this.selectedNode.data;
  }

  public prepareForNewOrg(): void {
    this.disabled = false;
    this.isNew = true;
    this.orgName = '';
    this.orgCode = '';
  }

}
