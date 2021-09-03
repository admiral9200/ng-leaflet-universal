import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenerateMapId {
  private generatedIDs: { [index: string]: any } = {};
  constructor() {}
  generateID(type = 'ng-leaflet-universal'): string {
    let id = '';
    do {
      const number = Math.random().toString().slice(2);
      id = type + '-' + number;
    } while (id in this.generatedIDs);
    this.generatedIDs[id] = true;
    return id;
  }

  ngIdGenerator(element: HTMLElement): string {
    if (element && element.id && !(element.id in this.generatedIDs)) {
      return element.id;
    }
    const id = this.generateID(element.tagName.toLowerCase());
    if (element) {
      element.id = id;
    }
    return id;
  }
}
