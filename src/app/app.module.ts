import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { NotificationSummaryComponent } from './notification-summary/notification-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NotificationSummaryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule implements Extracted { }
interface Extracted {}
