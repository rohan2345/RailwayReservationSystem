import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookinsComponent } from './view-bookins.component';

describe('ViewBookinsComponent', () => {
  let component: ViewBookinsComponent;
  let fixture: ComponentFixture<ViewBookinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
