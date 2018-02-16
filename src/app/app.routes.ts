import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OverviewComponent } from './overview/overview/overview.component';
import { DetailComponent } from './detail/detail/detail.component';

export const routes: Routes = [
    { path: '', component: MainComponent, pathMatch: 'full' },
    { path: 'overview/:category', component: OverviewComponent },
    { path: 'detail/:category/:file', component: DetailComponent }
];
