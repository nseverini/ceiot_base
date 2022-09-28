import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMeasurementsComponent } from './device-measurements.component';

describe('DeviceMeasurementsComponent', () => {
  let component: DeviceMeasurementsComponent;
  let fixture: ComponentFixture<DeviceMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceMeasurementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
