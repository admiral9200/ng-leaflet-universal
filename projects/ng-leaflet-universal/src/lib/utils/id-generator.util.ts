export function generate(prefix = 'ng-leaflet-universal') {
  const hexstring = Math.random().toString(16).slice(2);

  return [prefix, hexstring].filter(Boolean).join('-');
}
