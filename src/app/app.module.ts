import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { ResizableModule } from 'angular-resizable-element';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriComponent } from './map/esri/esri.component';
import { InboxComponent } from './windows/inbox/inbox.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormComponent } from './windows/ticket/form/form.component';
import { ListInboxComponent } from './previews/list-inbox/list-inbox.component';
import { PreviewTicketComponent } from './previews/ticket/preview-ticket.component';
import { PreviewTicketCommentsComponent } from './previews/ticket-comments/preview-comments.component';
import { PreviewSubdivisionComponent } from './previews/subdivision/preview-subdivision.component';


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
    ResizableModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
