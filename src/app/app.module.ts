import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgLeafletUniversalModule } from 'projects/ng-leaflet-universal/src/public-api';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgLeafletUniversalModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
