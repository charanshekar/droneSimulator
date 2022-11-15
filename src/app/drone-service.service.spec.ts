import { TestBed } from '@angular/core/testing';

import { DroneServiceService } from './drone-service.service';

describe('DroneServiceService', () => {
  let service: DroneServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
