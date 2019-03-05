import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSystemComponent } from './sub-system.component';

describe('SubSystemComponent', () => {
  let component: SubSystemComponent;
  let fixture: ComponentFixture<SubSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
