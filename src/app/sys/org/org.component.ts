import {Component, OnInit} from '@angular/core';
import {
  IActionMapping, ITreeOptions, KEYS, TREE_ACTIONS, TreeComponent, TreeModel,
  TreeNode
} from 'angular-tree-component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Org} from '../models/org';
import {OrgService} from './org.service';
import {NzModalService} from 'ng-zorro-antd';

const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }
    },
    click: (tree, node, $event) => {
      TREE_ACTIONS.SELECT(tree, node, $event);
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  // 表单对象
  validateForm: FormGroup;
  tree: TreeComponent;
  // 当前选中节点对象
  selectedNode: TreeNode;
  // 选中的组织
  selectedOrg: Org = new Org();

  constructor(private fb: FormBuilder, private orgService: OrgService, private modalService: NzModalService) {
  }

  nodes: Org[];
  options: ITreeOptions = {
    // displayField: 'subTitle',
    displayField: 'name',
    isExpandedField: 'expanded',
    idField: 'id',
    getChildren: (node: TreeNode) => {
      return this.orgService.getOrgsByParentId(node.data.id).toPromise();
    },
    actionMapping,
    nodeHeight: 23,
    allowDrag: (node) => {
      // console.log('allowDrag?');
      return true;
    },
    allowDrop: (node) => {
      // console.log('allowDrop?');
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 3,
    animateAcceleration: 1.2
  }

  onEvent(event) {
    console.log(event);
  }

  onInitialized(tree) {
    this.tree = tree;
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    console.log(treeModel.activeNodes);
  }

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
  }

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

  addOrgTemp() {
    const org = {
      pid: this.selectedOrg.id,
      no: '0001',
      name: '新建节点'
    };
    this.orgService.addOrg(org).subscribe(data => {
      if (data.code === 'ok') {
        if (!this.selectedOrg.children) {
          this.selectedOrg.children = [];
        }
        this.selectedOrg.children.push(data.result);
        this.tree.treeModel.update();
      }
    });
  }

  /**
   * 删除组织
   */
  deleteOrg() {
    this.modalService.confirm({
      title: '系统提示',
      content: '确定删除该组织吗？',
      onOk: () => {
        this.orgService.deleteById(this.selectedOrg.id).subscribe(data => {
          if (data.code === 'ok') {
          } else {
          }
        });
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
    this.orgService.getOrgRoot().subscribe(data => {
      if (data.code === 'ok') {
        this.nodes = data.result;
      }
    });
  }
}
