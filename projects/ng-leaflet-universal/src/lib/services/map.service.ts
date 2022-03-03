import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { CardText, MarkerCard } from '../models/marker-card.interface';
import { divIcon, map, Marker, tileLayer } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public map: typeof map;
  public Marker: typeof Marker;
  public divIcon: typeof divIcon;
  public tileLayer: typeof tileLayer;

  // tslint:disable-next-line:ban-types
  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.map = map;
      this.Marker = Marker;
      this.divIcon = divIcon;
      this.tileLayer = tileLayer;
    }
  }

  getCardHtml(card: MarkerCard): string {
    if (card?.customHtml) {
      return card.customHtml;
    }
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
                    ?.map((cta) => {
                      return /* html */ `<a href="${cta.link}"
                      target="_blank"
                      style="
                      background-color: ${cta.backgroundColor || '#007FFF'};
                      color: ${cta.textColor || 'white'};"
                      class="map-card-cta">
                      ${cta.icon ? `<i class="${cta.icon}"></i>` : ''}
                      ${cta.text}</a>`;
                    })
                    .reduce((a, b) => a + b)}
            </div>
        </div>
      </div>`;
  }

  getStyle(text: CardText): string {
    let style = '';

    if (text.color) {
      style += `color: ${text.color};`;
    }
    if (text.size) {
      style += `font-size: ${text.size};`;
    }

    return style;
  }
}
