import { MarkerCard } from '../models';

export function generate(prefix = 'ng-leaflet-universal') {
  const hexstring = Math.random().toString(16).slice(2);

  return [prefix, hexstring].filter(Boolean).join('-');
}

export const getCardHtml = (card: MarkerCard) =>
  card?.customHtml
    ? card.customHtml
    : `
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
