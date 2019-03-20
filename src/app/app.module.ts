import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from  '@angular/common/http';
import { ResizableModule } from 'angular-resizable-element';
import {DragDropModule} from '@angular/cdk/drag-drop';
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
import { MapToolbarComponent } from './windows/map-toolbar/map-toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapBookmarkComponent } from './windows/map-bookmark/map-bookmark.component';
import { ProfileSettingsComponent } from './windows/profile-settings/profile-settings.component';
import { BookmarkTableComponent } from './previews/bookmark-table/bookmark-table.component';
import { FilterminePipe } from './model/filtermine.pipe';


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
    UppercaseDirective,
    MapToolbarComponent,
    MapBookmarkComponent,
    ProfileSettingsComponent,
    BookmarkTableComponent,
    FilterminePipe
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    ResizableModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
