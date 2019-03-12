import {Component, OnInit} from '@angular/core';
import {SubSystem} from '../models/sub-system';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor() {
  }

  /**
   * 子系统切换事件
   * @param subSystem
   */
  orgChangeSubSystemEvent(subSystem: SubSystem) {
  }

  ngOnInit() {
  }

}
