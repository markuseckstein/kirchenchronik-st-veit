import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { imageData } from '../assets/data';
import { DATA_PROVIDER } from './providers';
import { OverviewModule } from './overview/overview.module';
import { DetailModule } from './detail/detail.module';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    OverviewModule,
    DetailModule
  ],
  providers: [
    { provide: DATA_PROVIDER, useValue: imageData }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
