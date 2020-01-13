import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouToubeComponent } from './you-toube.component';

describe('YouToubeComponent', () => {
  let component: YouToubeComponent;
  let fixture: ComponentFixture<YouToubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouToubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouToubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
