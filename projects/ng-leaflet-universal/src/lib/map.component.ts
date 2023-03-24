import { AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { map, tileLayer, divIcon, Marker as LeafletMarker } from 'leaflet';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { Map } from 'leaflet';

import { calculateCenterBoundingBox, calculateZoom } from './utils';
import { distanceBetweenCoordinates, generate } from './utils';
import { Marker, MarkerCard } from './models';

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
export class MapComponent implements AfterViewInit {
  @Output() mapEvent = new EventEmitter<Marker>();
  @Input() markers: Array<Marker>;

  id = generate('div');
  maxDistance = 0;

  map: Map;

  ngAfterViewInit() {
    this.map = map(this.id).setView([0, 0], 1);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(this.map);

    this.updateMarkers(this.markers);
  }

  updateMarkers(markers: Array<Marker>) {
    if (!markers) return;

    const { center, minimum, maximum } = calculateCenterBoundingBox(markers);

    markers.forEach((item) => this.addMarker(item));

    this.maxDistance = distanceBetweenCoordinates(minimum, maximum);
    this.map.setView(center, calculateZoom(this.maxDistance));
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
    const leafletMarker = new LeafletMarker({
      lat: marker.location.latitude,
      lng: marker.location.longitude,
    });

    const icon = divIcon({
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
        const { latitude, longitude } = marker.location;

        this.displayCard(marker, leafletMarker);

        this.map.setView([latitude, longitude], 15);
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
