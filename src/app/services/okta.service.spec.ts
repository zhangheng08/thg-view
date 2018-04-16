import { TestBed, inject } from '@angular/core/testing';

import { OktaService } from './okta.service';

describe('OktaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OktaService]
    });
  });

  it('should be created', inject([OktaService], (service: OktaService) => {
    expect(service).toBeTruthy();
  }));
});
