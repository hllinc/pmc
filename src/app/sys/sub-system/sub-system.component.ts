import {Component, OnInit} from '@angular/core';
import {SubSystemService} from './sub-system.service';
import {NzModalService} from 'ng-zorro-antd';
import {SubSystemFormComponent} from './sub-system-form/sub-system-form.component';
import {SubSystem} from '../models/sub-system';

@Component({
  selector: 'app-sub-system',
  templateUrl: './sub-system.component.html',
  styleUrls: ['./sub-system.component.css']
})
export class SubSystemComponent implements OnInit {

  dataSet = [];

  constructor(private subSystemService: SubSystemService, private modalService: NzModalService) {

  }

  ngOnInit() {
    this.loadSubSystemTable();
  }

  /**
   * 加载列表
   */
  loadSubSystemTable() {
    this.subSystemService.getSubSystems().subscribe(data => {
      if (data.code === 'ok') {
        this.dataSet = data.result;
      }
    });
  }

  addSubSystem() {
    const modal = this.modalService.create({
      nzTitle: '添加子系统',
      nzContent: SubSystemFormComponent,
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
              if (data.code === 'ok') {
                modal.close();
                this.modalService.success({
                  nzTitle: '系统提示',
                  nzContent: data.info
                });
                this.loadSubSystemTable();
              }
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
              if (data.code === 'ok') {
                modal.close();
                this.modalService.success({
                  nzTitle: '系统提示',
                  nzContent: data.info
                });
                this.loadSubSystemTable();
              }
            });
          }
        }
      }]
    });
  }

  deleteSubSystem(id: number) {
    this.subSystemService.deleteSubSystem(id).subscribe(data => {
      if (data.code === 'ok') {
        this.modalService.success({
          nzTitle: '提示',
          nzContent: data.info
        });
        this.loadSubSystemTable();
      }
    });
  }

}
