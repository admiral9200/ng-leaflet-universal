import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MapComponent } from 'projects/ng-leaflet-universal/src/lib/map.component';
import { Marker } from 'projects/ng-leaflet-universal/src/lib/models/marker.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'angular-leaflet-universal';

  @ViewChild(MapComponent) mapComponent: MapComponent;

  markers: Marker[] = [
    {
      id: 'abc123',
      icon: 'https://picsum.photos/200/200',
      location: {
        latitude: 18.477969373525823,
        longitude: -69.93744767947386,
      },
      cardActivated: false,
    },
    {
      id: 'abc123',
      icon: 'https://picsum.photos/200/200',
      location: {
        latitude: 18.498113509026137,
        longitude: -69.99517712890616,
      },
      cardActivated: false,
    },
    {
      id: 'abc123',
      icon: 'https://picsum.photos/200/200',
      location: {
        latitude: 18.47383,
        longitude: -66.93851,
      },
      cardActivated: true,
      card: {
        image: { url: 'https://picsum.photos/200/200' },
        title: { text: 'The place', customStyleClass: 'awesome-title' },
        subtitle: { text: 'The best place' },
        content: {
          text: '<p> This is the content that will be used in the <b> card </b> </p>',
        },
        address: { text: 'Neverland, NM 88203' },
        callToActions: [
          {
            text: 'View details',
            link: 'https://myawesomeapp.domain/Location-1',
            customStyleClass: 'my-details-button',
          },
          {
            text: 'Directions',
            backgroundColor: '#007319',
            textColor: '#fff',
            link: `https://www.google.com/maps/@-81.1288,-81.4579,18.13z`,
            icon: 'fas fa-directions',
          },
        ],
        customStyleClass: 'custom-card-style',
      },
    },
    {
      id: 'abc123',
      location: {
        latitude: 19.11683,
        longitude: -70.63595,
      },
      html: /*html*/ `
        <span class="marker-style">
          Hi
        </span>
      `,
      card: {
        customHtml: /*html*/ `
        <div style="cursor: pointer">
        <a>Av. Jonh F. Kennedy, Plaza Galería 360, Santo Domingo.</a> 
      </div>
        `,
      },
    },
  ];

  ngAfterViewInit(): void {
    this.mapComponent?.updateMarkers(this.markers);
  }
}
