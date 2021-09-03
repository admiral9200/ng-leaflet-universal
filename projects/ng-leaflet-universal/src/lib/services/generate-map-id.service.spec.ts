import { TestBed } from '@angular/core/testing';

import { GenerateMapId } from './generate-map-id.service';

describe('GenerateMapId', () => {
  let service: GenerateMapId;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateMapId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
