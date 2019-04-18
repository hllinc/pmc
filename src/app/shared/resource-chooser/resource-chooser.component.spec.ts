import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceChooserComponent } from './resource-chooser.component';

describe('ResourceChooserComponent', () => {
  let component: ResourceChooserComponent;
  let fixture: ComponentFixture<ResourceChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
