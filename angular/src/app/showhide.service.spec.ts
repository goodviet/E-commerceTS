import { TestBed } from '@angular/core/testing';

import { ShowhideService } from './showhide.service';

describe('ShowhideService', () => {
  let service: ShowhideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowhideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
