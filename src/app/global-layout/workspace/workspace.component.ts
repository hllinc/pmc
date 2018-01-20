import {Component, OnInit, ElementRef, HostListener} from '@angular/core';
import {EventBusService} from '../../services/event-bus.service';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public isCollapsed = false;

  constructor(private elementRef: ElementRef, private eventBusService: EventBusService) {

  }

  ngOnInit() {
    this.eventBusService.topToggleBtn.subscribe(value => {
      this.toggleMenuStatus(value);
    });
  }

  private toggleMenuStatus(isCollapse: boolean): void {
    this.isCollapsed = isCollapse;
  }
}
