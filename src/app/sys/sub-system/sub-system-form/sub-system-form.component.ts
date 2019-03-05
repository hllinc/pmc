import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-sub-system-form',
  templateUrl: './sub-system-form.component.html',
  styleUrls: ['./sub-system-form.component.css']
})
export class SubSystemFormComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;

  constructor(private modal: NzModalRef) { }

  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }

  ngOnInit() {
  }

}
