import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChooserComponent } from './org-chooser.component';

describe('OrgChooserComponent', () => {
  let component: OrgChooserComponent;
  let fixture: ComponentFixture<OrgChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
