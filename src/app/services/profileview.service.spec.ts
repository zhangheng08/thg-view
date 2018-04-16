import { TestBed, inject } from '@angular/core/testing';

import { ProfileviewService } from './profileview.service';

describe('ProfileviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileviewService]
    });
  });

  it('should be created', inject([ProfileviewService], (service: ProfileviewService) => {
    expect(service).toBeTruthy();
  }));
});
