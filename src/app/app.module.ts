import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriComponent } from './map/esri/esri.component';
import { InboxComponent } from './info/inbox/inbox.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormComponent } from './ticket/form/form.component';
import { ListInboxComponent } from './display/list-inbox/list-inbox.component';

@NgModule({
  declarations: [
    AppComponent,
    EsriComponent,
    InboxComponent,
    NavigationComponent,
    FormComponent,
    ListInboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
