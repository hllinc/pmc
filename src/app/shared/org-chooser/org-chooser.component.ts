import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrgService} from '../../sys/org/org.service';
import {NzFormatEmitEvent, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {Org} from '../../sys/models/org';

@Component({
  selector: 'app-org-chooser',
  templateUrl: './org-chooser.component.html',
  styleUrls: ['./org-chooser.component.css']
})
export class OrgChooserComponent implements OnInit {
  // 向外发送数据触发器
  @Output() selectedEvent = new EventEmitter<Org>();

  @Input()
  set loadOrgData(subSystemId: number) {
    this.activedNode = null;
    this.orgService.getOrgDataBySubSystemId(subSystemId).subscribe(data => {
      this.nodes = data;
    });
  }

  @ViewChild('treeCom') treeCom;
  // 树数据
  nodes = [];

  activedNode: NzTreeNode;

  constructor(private orgService: OrgService,
              private modalService: NzModalService) {
  }

  nzClick(data: NzFormatEmitEvent): void {
    if (data.node === this.activedNode) {
      // 置空当前激活的节点以正常添加根节点
      this.activedNode = null;
    } else {
      this.activedNode = data.node;
    }
    if (this.activedNode) {
      this.selectedEvent.emit(this.activedNode.origin);
    } else {
      this.selectedEvent.emit(null);
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

  ngOnInit() {
  }

}
