import { TestBed, inject } from '@angular/core/testing';

import { AddProfileService } from './add-profile.service';

describe('AddProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProfileService]
    });
  });

  it('should be created', inject([AddProfileService], (service: AddProfileService) => {
    expect(service).toBeTruthy();
  }));
});
