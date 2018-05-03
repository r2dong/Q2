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

  it('should return agendaweek by default', inject([DefaultViewService], (service: DefaultViewService) => {
    expect(service.getDefaultView()).toBe('agendaWeek');
  }));

  it('should return today\'s date by default', inject([DefaultViewService], (service: DefaultViewService) => {
    expect(service.getDefaultDate()).toBe(new Date().toLocaleDateString());
  }));

  it('set default date should change default date', inject([DefaultViewService], (service: DefaultViewService) => {
    service.setDefaultDate('1')
    expect(service.getDefaultDate()).toBe('1')
  }));

  it('set default view should change default view', inject([DefaultViewService], (service: DefaultViewService) => {
    service.setDefaultView('agendaMonth')
    expect(service.getDefaultView()).toBe('agendaMonth')
  }));
  
});
