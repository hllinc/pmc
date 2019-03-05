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
    subSystemService.getSubSystems().subscribe(data => {
      if (data.code === 'ok') {
        this.dataSet = data.result;
      }
    });
  }

  ngOnInit() {
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
          console.log(componentInstance.getFormValue());
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
          console.log(componentInstance.getFormValue());
        }
      }]
    });
  }

  deleteSubSystem(id: number) {

  }

}
