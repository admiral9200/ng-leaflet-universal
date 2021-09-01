import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgLeafletUniversalModule } from 'projects/ng-leaflet-universal/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgLeafletUniversalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
