import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriComponent } from './map/esri/esri.component';
import { InboxComponent } from './info/inbox/inbox.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormComponent } from './ticket/form/form.component';
import { ListInboxComponent } from './display/list-inbox/list-inbox.component';
import { PreviewTicketComponent } from './display/preview-ticket/preview-ticket.component';
import { PreviewTicketCommentsComponent } from './display/preview-ticket-comments/preview-comments.component';
import { PreviewSubdivisionComponent } from './display/preview-subdivision/preview-subdivision.component';


@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    EsriComponent,
   
    NavigationComponent,
    FormComponent,
    ListInboxComponent,
    PreviewTicketComponent,
    PreviewTicketCommentsComponent,
    PreviewSubdivisionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
