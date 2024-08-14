
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification-summary',
  templateUrl: './notification-summary.component.html',
  styleUrls: ['./notification-summary.component.css']
})
export class NotificationSummaryComponent implements OnInit {
  notificationSummary: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotificationSummary();
  }

  loadNotificationSummary() {
    this.notificationService.getNotifications().subscribe(summary => {
      this.notificationSummary = summary;
    });
  }
}
