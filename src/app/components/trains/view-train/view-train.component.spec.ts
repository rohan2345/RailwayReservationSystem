import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainComponent } from './view-train.component';

describe('ViewTrainComponent', () => {
  let component: ViewTrainComponent;
  let fixture: ComponentFixture<ViewTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
