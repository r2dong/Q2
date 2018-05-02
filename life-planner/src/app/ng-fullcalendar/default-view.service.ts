import { Injectable } from '@angular/core';

@Injectable()
export class DefaultViewService {

  defaultView: string
  defaultDate

  constructor() { }

  setDefaultView(view: string): void {
    this.defaultView = view
  }

  setDefaultDate(date: string): void {
    this.defaultDate = date
  }

  getDefaultView(): string {
    return this.defaultView == undefined ? "agendaWeek" : this.defaultView
  }

  getDefaultDate() {
    return this.defaultDate == undefined ? new Date().toLocaleDateString() : this.defaultDate
  }
}
