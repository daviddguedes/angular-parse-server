import { TestBed, inject } from '@angular/core/testing';

import { ParseServiceService } from './parse-service.service';

describe('ParseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseServiceService]
    });
  });

  it('should be created', inject([ParseServiceService], (service: ParseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
