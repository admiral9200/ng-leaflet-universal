import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import type { Map, LatLngExpression, Marker as LeafletMarker } from 'leaflet';
import { Subject } from 'rxjs';
import L from 'leaflet';

import { Marker, Location, MarkerCard } from './models';
import {
  calculateCenterBoundingBox,
  calculateZoom,
  distanceBetweenCoordinates,
  generate,
} from './utils';

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
})
export class MapComponent implements AfterViewInit {
  @Output() mapEvent = new EventEmitter<Marker>();

  id = generate('div');
  selectedCard = new Subject<string>();
  maxDistance = 0;

  centerPoint: LatLngExpression;
  markers: Array<Marker>;
  map: Map;

  ngAfterViewInit() {
    this.map = L.map(this.id).setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(this.map);

    this.selectedCard.forEach((card) => {
      const marker = this.markers.find(({ id }) => id === card);

      if (marker) this.centerTo(marker.location);
    });
  }

  centerTo(location: Location) {
    this.map.setView([location.latitude, location.longitude], 15);
  }

  updateMarkers(markers = new Array<Marker>()) {
    if (!markers.length) return;

    this.markers = markers;

    markers.forEach((item) => this.addMarker(item));

    const { center, latitude, longitude } = calculateCenterBoundingBox(markers);

    this.centerPoint = center;

    this.maxDistance = distanceBetweenCoordinates(
      [latitude.min, longitude.min],
      [latitude.max, longitude.max]
    );

    this.map.setView(this.centerPoint, calculateZoom(this.maxDistance));
  }

  displayCard(data: Marker, selected: LeafletMarker) {
    if (!data?.card) return;

    const html = this.getCardHtml(data.card);
    const popup = selected.getPopup();

    if (popup) popup?.openPopup();
    else {
      selected
        .bindPopup(html, {
          autoClose: false,
          maxWidth: 200,
        })
        .openPopup();
    }
  }

  addMarker(marker: Marker) {
    const leafletMarker = new L.Marker({
      lat: marker.location.latitude,
      lng: marker.location.longitude,
    });
    const icon = L.divIcon({
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
    });

    leafletMarker.setIcon(icon);

    leafletMarker.addTo(this.map).on('click', () => {
      this.mapEvent.emit(marker);

      if (marker.cardActivated) {
        this.centerTo(marker.location);
        this.displayCard(marker, leafletMarker);
      }
    });
  }

  getCardHtml(card: MarkerCard): string {
    if (card?.customHtml) return card.customHtml;

    return /* html */ `
      <div class="map-card">
        <div class="map-card-body">
          <div class="top-card">
            <img src="${card?.image?.url}" alt="${card?.title?.text}" />
            <div class="content">
              <h2 class="map-card-title">${card?.title?.text}</h2>
              <h4 class="map-card-subtitle">${card?.subtitle?.text}</h4>
              <h5 class="map-address">${card?.address?.text}</h5>
            </div>
          </div>
          <div class="map-card-content">
            ${card?.content?.text}
          </div>
          <div class="cta-wrapper">
            ${card?.callToActions
              ?.map(
                (cta) => `
                <a href="${cta.link}"
                  target="_blank"
                  style="
                  background-color: ${cta.backgroundColor || '#007FFF'};
                  color: ${cta.textColor || 'white'};"
                  class="map-card-cta">
                    ${cta.icon ? `<i class="${cta.icon}"></i>` : ''}
                ${cta.text}</a>
                `
              )
              .reduce((a, b) => a + b)}
            </div>
        </div>
      </div>`;
  }
}
