import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, Inject } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { imageData } from '../assets/data';
import { DATA_PROVIDER } from './providers';
import { OverviewModule } from './overview/overview.module';
import { DetailModule } from './detail/detail.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    OverviewModule,
    DetailModule,
    SharedModule
  ],
  providers: [
    { provide: DATA_PROVIDER, useValue: imageData }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
