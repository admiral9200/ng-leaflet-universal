import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BridgeService {
  cardSelected: Subject<string> = new Subject<string>();
  constructor() {}

  getCardSelected(): Observable<string> {
    return this.cardSelected;
  }
}
