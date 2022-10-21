import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTSeriesComponent } from './input-tseries.component';

describe('InputTSeriesComponent', () => {
  let component: InputTSeriesComponent;
  let fixture: ComponentFixture<InputTSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTSeriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
