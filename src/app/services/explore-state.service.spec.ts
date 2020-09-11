import { TestBed } from '@angular/core/testing';

import { ExploreStateService } from './explore-state.service';

describe('ExploreStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExploreStateService = TestBed.get(ExploreStateService);
    expect(service).toBeTruthy();
  });
});
