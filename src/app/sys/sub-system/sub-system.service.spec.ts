import { TestBed } from '@angular/core/testing';

import { SubSystemService } from './sub-system.service';

describe('SubSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubSystemService = TestBed.get(SubSystemService);
    expect(service).toBeTruthy();
  });
});
