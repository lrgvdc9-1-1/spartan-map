import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from  '@angular/common/http';
import { ResizableModule } from 'angular-resizable-element';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';


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
import { ConfirmComponent } from './windows/confirm/confirm.component';
import { BasemapsListComponent } from './windows/basemaps-list/basemaps-list.component';
import { AttachOptionsComponent } from './windows/attach-options/attach-options.component';
import { IdentifyComponent } from './windows/identify/identify.component';
import { RightClickMenuComponent } from './windows/right-click-menu/right-click-menu.component';
import { FeatureTableComponent } from './windows/feature-table/feature-table.component';
import { TestComponent } from './windows/test/test.component';
import { DocsComponent } from './previews/docs/docs.component';
import {DocsWindowComponent} from './windows/docs-window/docs-window.component';
import { SafePipe } from './safe.pipe';
import { MeasurementComponent } from './windows/measurement/measurement.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

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
    FilterminePipe,
    ConfirmComponent,
    BasemapsListComponent,
    AttachOptionsComponent,
    IdentifyComponent,
    RightClickMenuComponent,
    FeatureTableComponent,
    TestComponent,
    DocsComponent,
    DocsWindowComponent,
    SafePipe,
    MeasurementComponent
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    ResizableModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
