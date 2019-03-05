import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSystemFormComponent } from './sub-system-form.component';

describe('SubSystemFormComponent', () => {
  let component: SubSystemFormComponent;
  let fixture: ComponentFixture<SubSystemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSystemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
