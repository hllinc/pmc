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
      nzTitle: 'Modal Title',
      nzContent: SubSystemFormComponent,
      nzComponentParams: {
        title: 'title in component',
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzFooter: [{
        label: 'change component tilte from outside',
        onClick: (componentInstance) => {
          componentInstance.title = 'title in inner component is changed';
        }
      }]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    window.setTimeout(() => {
      const instance = modal.getContentComponent();
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  modifySubSystem(subSystem: SubSystem) {
    const modal = this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: SubSystemFormComponent,
      nzComponentParams: {
        title: 'title in component',
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzFooter: [{
        label: 'change component tilte from outside',
        onClick: (componentInstance) => {
          componentInstance.title = 'title in inner component is changed';
        }
      }]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    window.setTimeout(() => {
      const instance = modal.getContentComponent();
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  deleteSubSystem(id: number) {

  }

}
