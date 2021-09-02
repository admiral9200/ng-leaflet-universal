import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/marker.interface';
import {
  RouteOptions,
  TRANSPORTATION,
} from '../models/route-options.interface';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private API_URL = 'https://routing.openstreetmap.de';

  constructor(private http: HttpClient) {}

  // https://routing.openstreetmap.de/routed-foot/route/v1/driving/-69.936224,18.485419;-69.93884067510572,18.48514785?overview=false&alternatives=true&steps=true

  getRoute(
    from: Location,
    to: Location,
    options: RouteOptions,
    transportation?: TRANSPORTATION
  ) {
    return this.http.get(
      `${this.API_URL}/${
        transportation || TRANSPORTATION.CAR
      }/route/v1/driving/${Object.keys(from)
        .map(function (k) {
          return from[k];
        })
        .join(',')};${Object.keys(to)
        .map(function (k) {
          return to[k];
        })
        .join(',')}?${Object.entries(options)
        .map(([key, val]) => `${key}=${val}`)
        .join('&')}`
    );
  }
}
