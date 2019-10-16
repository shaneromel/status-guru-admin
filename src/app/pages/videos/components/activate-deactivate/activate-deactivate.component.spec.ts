import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDeactivateComponent } from './activate-deactivate.component';

describe('ActivateDeactivateComponent', () => {
  let component: ActivateDeactivateComponent;
  let fixture: ComponentFixture<ActivateDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateDeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
