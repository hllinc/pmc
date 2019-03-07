import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSystemChooserComponent } from './sub-system-chooser.component';

describe('SubSystemChooserComponent', () => {
  let component: SubSystemChooserComponent;
  let fixture: ComponentFixture<SubSystemChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSystemChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSystemChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
