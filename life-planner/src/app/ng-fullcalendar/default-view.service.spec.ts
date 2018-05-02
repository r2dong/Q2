import { TestBed, inject } from '@angular/core/testing';

import { DefaultViewService } from './default-view.service';

describe('DefaultViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultViewService]
    });
  });

  it('should be created', inject([DefaultViewService], (service: DefaultViewService) => {
    expect(service).toBeTruthy();
  }));
});
