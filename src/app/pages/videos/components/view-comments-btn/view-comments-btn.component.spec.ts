import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommentsBtnComponent } from './view-comments-btn.component';

describe('ViewCommentsBtnComponent', () => {
  let component: ViewCommentsBtnComponent;
  let fixture: ComponentFixture<ViewCommentsBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentsBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommentsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
