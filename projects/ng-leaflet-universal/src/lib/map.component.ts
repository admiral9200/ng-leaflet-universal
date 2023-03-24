import { map, tileLayer, divIcon, Marker as LeafletMarker } from 'leaflet';
import { AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';
import { FeatureGroup } from 'leaflet';
import type { Map } from 'leaflet';

import { generate, getCardHtml } from './utils';
import { Marker } from './models';

@Component({
  selector: 'ng-leaflet-universal',
  template: `
    <div class="map">
      <div class="map-frame">
        <div [id]="id"></div>
      </div>
    </div>
  `,
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Output() mapEvent = new EventEmitter<Marker>();
  @Input() markers: Array<Marker> | null;

  id = generate('div');
  map: Map;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.markers && this.map) {
      this.updateMarkers(this.markers);
    }
  }

  ngAfterViewInit() {
    this.map = map(this.id).setView([18.4, -66.9], 4);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(this.map);

    this.updateMarkers(this.markers);
  }

  updateMarkers(markers: Array<Marker> | null) {
    if (!markers) return;

    const leafletMarkers = markers.map(createLeafletMarker).map((marker, i) => {
      return marker.on('click', () => this.mapEvent.emit(markers[i]));
    });

    const group = new FeatureGroup(leafletMarkers);

    group.addTo(this.map);

    this.map.fitBounds(group.getBounds());
  }
}

function createLeafletMarker(marker: Marker) {
  const leafletMarker = new LeafletMarker({
    lat: marker.location.latitude,
    lng: marker.location.longitude,
  });

  leafletMarker.setIcon(
    divIcon({
      html:
        marker.html ||
        `
      <div class="item-marker">
          <div class="icon-image" style="background-image: url('${marker.icon}')">
          </div>
      </div>`,
      className: 'map-marker-icon',
      iconSize: [26, 30],
      iconAnchor: [13, 30],
    })
  );

  leafletMarker.on('click', function ({ target, latlng }) {
    if (marker.cardActivated && marker?.card) {
      const html = getCardHtml(marker.card);
      const popup = target.getPopup();

      if (popup) popup?.openPopup();
      else {
        target
          .bindPopup(html, {
            autoClose: false,
            maxWidth: 200,
          })
          .openPopup();
      }
    }

    target._map.setView(latlng, 15);
  });

  return leafletMarker;
}
