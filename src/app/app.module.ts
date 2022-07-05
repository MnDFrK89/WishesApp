import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers } from './store/wishes.reducers';
import { FinishedPipeModule } from './pipes/finished-pipe/finished-pipe.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FinishedPipeModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({ app: reducers }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
