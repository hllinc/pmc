import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SubSystem} from '../../sys/models/sub-system';
import {SubSystemService} from '../../sys/sub-system/sub-system.service';

@Component({
  selector: 'app-sub-system-chooser',
  templateUrl: './sub-system-chooser.component.html',
  styleUrls: ['./sub-system-chooser.component.css']
})
export class SubSystemChooserComponent implements OnInit {
  isLoading = true;
  // 选中的子系统
  selectedSubSystem: SubSystem;
  // 子系统列表
  subSystems: SubSystem[];

  // 向外发送数据触发器
  @Output() changeSubSystemEvent = new EventEmitter<SubSystem>();

  constructor(private subSystemService: SubSystemService) {
    this.subSystemService.getSubSystems(1, 20).subscribe(data => {
      this.subSystems = data.list;
      this.isLoading = false;
    });
  }

  /**
   * 子系统改变事件
   */
  changeEvent() {
    this.changeSubSystemEvent.emit(this.selectedSubSystem);
  }

  ngOnInit() {
  }

}
