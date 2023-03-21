import { Marker } from '../models';

const EARTH_RADIUS = 6371;

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function distanceBetweenCoordinates(from: Point, to: Point) {
  const dLat = degreesToRadians(to[0] - from[0]);
  const dLon = degreesToRadians(to[1] - from[1]);

  const fromLatitude = degreesToRadians(from[0]);
  const toLatitude = degreesToRadians(to[0]);

  /**
   * Haversine formula, which is used to calculate the distance
   * between two points on the Earth’s surface.
   * formula: `a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)`
   */
  const distance_raw =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(fromLatitude) *
      Math.cos(toLatitude);

  /**
   * second part of the formula:
   * `c = 2 * atan2( √a, √(1−a) )`
   */
  const distance =
    2 * Math.atan2(Math.sqrt(distance_raw), Math.sqrt(1 - distance_raw));

  return EARTH_RADIUS * distance;
}

type Point = [latitude: number, longitude: number];

export function calculateCenterBoundingBox(markers: Array<Marker>) {
  const latitudes = markers.map(({ location }) => location.latitude).sort();
  const longitudes = markers.map(({ location }) => location.longitude).sort();

  const [minLat, maxLat] = [latitudes[0], latitudes.pop() ?? 0];
  const [minLng, maxLng] = [longitudes[0], longitudes.pop() ?? 0];

  const center: Point = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];

  const difference = { latitude: maxLat - minLat, longitude: maxLng - minLng };

  const latitude = { min: 0, max: 0 };
  const longitude = { min: 0, max: 0 };

  if (difference.latitude > difference.longitude) {
    latitude.min = minLat;
    latitude.max = maxLat;
  } else {
    longitude.min = minLng;
    longitude.max = maxLng;
  }

  return { latitude, longitude, center };
}

export function calculateZoom(maxDistance = 0) {
  let ratio = EARTH_RADIUS;
  let zoom = 1;

  if (maxDistance > 0) {
    while (ratio > maxDistance) {
      ratio = ratio * 0.52;
      zoom++;
    }
  } else zoom = 14;

  return zoom;
}
