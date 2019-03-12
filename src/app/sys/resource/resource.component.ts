import { Component, OnInit } from '@angular/core';
import {SubSystem} from '../models/sub-system';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  constructor() { }
  /**
   * 子系统切换事件
   * @param subSystem
   */
  orgChangeSubSystemEvent(subSystem: SubSystem) {
  }
  ngOnInit() {
  }

}
