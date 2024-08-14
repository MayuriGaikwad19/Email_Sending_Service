import { TestBed } from '@angular/core/testing';

import { QueuingService } from './queuing.service';

describe('QueuingService', () => {
  let service: QueuingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueuingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
