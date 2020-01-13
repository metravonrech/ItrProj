import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyByCategoryComponent } from './company-by-category.component';

describe('CompanyByCategoryComponent', () => {
  let component: CompanyByCategoryComponent;
  let fixture: ComponentFixture<CompanyByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
