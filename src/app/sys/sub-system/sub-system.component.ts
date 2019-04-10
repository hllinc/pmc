import {Component, OnInit} from '@angular/core';
import {SubSystemService} from './sub-system.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SubSystemFormComponent} from './sub-system-form/sub-system-form.component';
import {SubSystem} from '../models/sub-system';

@Component({
  selector: 'app-sub-system',
  templateUrl: './sub-system.component.html',
  styleUrls: ['./sub-system.component.css']
})
export class SubSystemComponent implements OnInit {

  pageNum = 1;
  pageSize = 20;
  startRow = 1;

  dataSet = [];

  total = 1;
  loading = true;

  constructor(private subSystemService: SubSystemService, private modalService: NzModalService, private messageService: NzMessageService) {

  }

  ngOnInit() {
    this.loadSubSystemTable();
  }

  /**
   * 加载列表
   */
  loadSubSystemTable(reset: boolean = false) {
    if (reset) {
      this.pageNum = 1;
    }
    this.subSystemService.getSubSystems(this.pageNum, this.pageSize).subscribe(data => {
      this.dataSet = data.list;
      this.total = data.total;
      this.startRow = data.startRow;
      this.loading = false;
    });
  }

  addSubSystem() {
    const modal = this.modalService.create({
      nzTitle: '添加子系统',
      nzContent: SubSystemFormComponent,
      nzMaskClosable: false,
      nzComponentParams: {},
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          modal.close();
        }
      }, {
        label: '添加',
        type: 'primary',
        onClick: (componentInstance) => {
          const newSubSystem = componentInstance.getFormValue();
          if (newSubSystem) {
            this.subSystemService.addSubSystem(newSubSystem).subscribe(data => {
              modal.close();
              this.messageService.create('success', '添加成功');
              this.loadSubSystemTable();
            });
          }
        }
      }]
    });
  }

  modifySubSystem(subSystem: SubSystem) {
    const modal = this.modalService.create({
      nzTitle: '编辑子系统',
      nzContent: SubSystemFormComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        subSystem: subSystem
      },
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          modal.close();
        }
      }, {
        label: '保存',
        type: 'primary',
        onClick: (componentInstance) => {
          const newSubSystem = componentInstance.getFormValue();
          if (newSubSystem) {
            this.subSystemService.modifySubSystem(newSubSystem).subscribe(data => {
              modal.close();
              this.messageService.create('success', '修改成功');
              this.loadSubSystemTable();
            });
          }
        }
      }]
    });
  }

  deleteSubSystem(id: number) {
    this.subSystemService.deleteSubSystem(id).subscribe(data => {
      this.messageService.create('success', '删除成功');
      this.loadSubSystemTable();
    });
  }

}
