import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SubSystem} from '../../sys/models/sub-system';
import {SubSystemService} from '../../sys/sub-system/sub-system.service';

@Component({
  selector: 'app-sub-system-chooser',
  templateUrl: './sub-system-chooser.component.html',
  styleUrls: ['./sub-system-chooser.component.css']
})
export class SubSystemChooserComponent implements OnInit {
  selectedSubSystem: SubSystem;
  subSystems: SubSystem[];

  @Output() changeSubSystemEvent = new EventEmitter();

  constructor(private subSystemService: SubSystemService) {
    this.subSystemService.getSubSystems().subscribe(data => {
      this.subSystems = data.result;
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
