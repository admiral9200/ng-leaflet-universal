import { MarkerCard } from './marker-card.interface';

export interface Marker {
  id: string;
  location: Location;
  icon: string;
  card: MarkerCard;
}

export interface Location {
  latitude: number;
  longitude: number;
  [key: string]: any;
}
