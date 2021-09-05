import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MapComponent } from 'projects/ng-leaflet-universal/src/lib/map/map.component';
import { Marker } from 'projects/ng-leaflet-universal/src/lib/models/marker.interface';
import {
  ROUTE_GEOMETRIE,
  ROUTE_OVERVIEW,
} from 'projects/ng-leaflet-universal/src/lib/models/route-options.interface';

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
      icon: 'https://picsum.photos/200/200',
      location: {
        latitude: 18.498113509026137,
        longitude: -69.99517712890616,
      },
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
    // {
    //   id: 'abc123',
    //   icon: 'https://picsum.photos/200/200',
    //   location: {
    //     latitude: 18.47383,
    //     longitude: -66.93851,
    //   },
    //   card: {
    //     image: { url: 'https://picsum.photos/200/200' },
    //     title: { text: 'The place', customStyleClass: 'awesome-title' },
    //     subtitle: { text: 'The best place' },
    //     content: {
    //       text: '<p> This is the content that will be used in the <b> card </b> </p>',
    //     },
    //     address: { text: 'Neverland, NM 88203' },
    //     callToActions: [
    //       {
    //         text: 'View details',
    //         link: 'https://myawesomeapp.domain/Location-1',
    //         customStyleClass: 'my-details-button',
    //       },
    //       {
    //         text: 'Directions',
    //         backgroundColor: '#007319',
    //         textColor: '#fff',
    //         link: `https://www.google.com/maps/@-81.1288,-81.4579,18.13z`,
    //         icon: 'fas fa-directions',
    //       },
    //     ],
    //     customStyleClass: 'custom-card-style',
    //   },
    // },
    // {
    //   id: 'abc123',
    //   icon: 'https://picsum.photos/200/200',
    //   location: {
    //     latitude: 18.01031,
    //     longitude: -66.62398,
    //   },
    //   card: {
    //     image: { url: 'https://picsum.photos/200/200' },
    //     title: { text: 'The place', customStyleClass: 'awesome-title' },
    //     subtitle: { text: 'The best place' },
    //     content: {
    //       text: '<p> This is the content that will be used in the <b> card </b> </p>',
    //     },
    //     address: { text: 'Neverland, NM 88203' },
    //     callToActions: [
    //       {
    //         text: 'View details',
    //         link: 'https://myawesomeapp.domain/Location-1',
    //         customStyleClass: 'my-details-button',
    //       },
    //       {
    //         text: 'Directions',
    //         backgroundColor: '#007319',
    //         textColor: '#fff',
    //         link: `https://www.google.com/maps/@-81.1288,-81.4579,18.13z`,
    //         icon: 'fas fa-directions',
    //       },
    //     ],
    //     customStyleClass: 'custom-card-style',
    //   },
    // },
  ];

  ngAfterViewInit(): void {
    this.mapComponent.updateMarkers(this.markers);

    this.mapComponent
      .getRoute(
        {
          latitude: -69.936224,
          longitude: 18.485419,
        },
        {
          latitude: -69.93884067510572,
          longitude: 18.48514785,
        },
        {
          steps: true,
          overview: ROUTE_OVERVIEW.FALSE,
          annotations: false,
          geometries: ROUTE_GEOMETRIE.POLYLINE,
          alternatives: 2,
        }
      )
      .subscribe((res) => {
        // console.log(res);
      });
  }
}
