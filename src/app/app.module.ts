import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from  '@angular/common/http';
import { ResizableModule } from 'angular-resizable-element';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriComponent } from './map/esri/esri.component';
import { InboxComponent } from './windows/inbox/inbox.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { FormComponent } from './windows/ticket/form/form.component';
import { ListInboxComponent } from './previews/list-inbox/list-inbox.component';
import { PreviewTicketComponent } from './previews/ticket/preview-ticket.component';
import { PreviewTicketCommentsComponent } from './previews/ticket-comments/preview-comments.component';
import { PreviewSubdivisionComponent } from './previews/subdivision/preview-subdivision.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UppercaseDirective } from './model/directives/uppercase.directive';


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
    PreviewSubdivisionComponent,
    LoginComponent,
    HomeComponent,
    UppercaseDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ResizableModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
