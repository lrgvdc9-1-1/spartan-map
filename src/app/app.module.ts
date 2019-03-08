import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriComponent } from './map/esri/esri.component';
import { InboxComponent } from './info/inbox/inbox.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormComponent } from './ticket/form/form.component';
import { ListInboxComponent } from './display/list-inbox/list-inbox.component';
import { PreviewTicketComponent } from './display/preview-ticket/preview-ticket.component';
import { PreviewCommentsComponent } from './display/preview-comments/preview-comments.component';
import { PreviewSubdivisionComponent } from './display/preview-subdivision/preview-subdivision.component';

@NgModule({
  declarations: [
    AppComponent,
    EsriComponent,
    InboxComponent,
    NavigationComponent,
    FormComponent,
    ListInboxComponent,
    PreviewTicketComponent,
    PreviewCommentsComponent,
    PreviewSubdivisionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
