
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  notifications: any[] = []; // Array to hold notifications

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Load existing notifications when the component initializes
    this.loadNotifications();
  }

  sendNotification(urgency: string, isActive: boolean) {
    const notification = {
      urgency,
      isActive,
      userId: 'mayuri123',
      status: 'pending',
    };

    this.notificationService.addNotification(notification).subscribe((response) => {
      if (response.success) {
        this.notificationService.sendNotification(notification).subscribe((sendResponse) => {
          if (sendResponse.success) {
            console.log('Notification successfully sent!');
            this.loadNotifications(); // Reload notifications
          }
        });
      }
    });
  }

  loadNotifications() {
    // Retrieve notifications from the service
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }
}
