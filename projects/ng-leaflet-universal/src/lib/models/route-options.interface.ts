export interface RouteOptions {
  alternatives?: boolean | number;
  steps?: boolean;
  annotations?: boolean;
  geometries?: ROUTE_GEOMETRIE;
  overview?: ROUTE_OVERVIEW;
  [key: string]: any;
}

export enum TRANSPORTATION {
  CAR = 'routed-car',
  FOOT = 'routed-foot',
  BIKE = 'routed-bike',
}

export enum ROUTE_GEOMETRIE {
  POLYLINE = 'polyline',
  POLYLINE6 = 'polyline6',
  GEOJSON = 'geojson',
}

export enum ROUTE_OVERVIEW {
  FULL = 'full',
  SIMPLIFIED = 'simplified',
  FALSE = 'false',
}
