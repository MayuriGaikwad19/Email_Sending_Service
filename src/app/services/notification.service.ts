import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: any[] = [];
  private lastActiveTime: number = Date.now();
  private inactivityThreshold: number = 5 * 60 * 1000; // 5 minutes
  private maxRetries = 3; // Maximum retry attempts

  constructor() {
    this.setupUserActivityTracking();
  }

  addNotification(notification: any): Observable<any> {
    notification.isActive = this.isUserActive();
    notification.state = 'Pending'; // Initial state
    notification.retries = 0; // Initialize retry count
    this.notifications.push(notification);
    console.log('Notification added:', notification);

    this.scheduleNotification(notification);
    return of({ success: true });
  }

  getNotifications(): Observable<any[]> {
    return of(this.notifications);
  }

  sendNotification(notification: any): Observable<any> {
    console.log('Sending notification:', notification);

    // Simulate random failure for demonstration purposes
    const isSuccess = Math.random() > 0.3; // 70% chance of success

    if (isSuccess) {
      notification.state = 'Sent';
      console.log('Notification sent successfully:', notification);
      return of({ success: true });
    } else {
      notification.state = 'Failed';
      console.log('Notification failed to send:', notification);
      this.handleFailedNotification(notification);
      return of({ success: false });
    }
  }

  private handleFailedNotification(notification: any) {
    if (notification.retries < this.maxRetries) {
      notification.state = 'Retrying';
      notification.retries += 1;
      console.log(`Retrying notification (${notification.retries}/${this.maxRetries}):`, notification);

      // Exponential backoff: 1 min, 5 min, 15 min
      const retryDelay = Math.pow(5, notification.retries) * 1000;

      setTimeout(() => {
        this.sendNotification(notification).subscribe();
      }, retryDelay);
    } else {
      notification.state = 'Dead';
      console.log('Notification delivery failed after maximum retries:', notification);
    }
  }

  // Track user activity (same as in previous steps)
  private setupUserActivityTracking() {
    window.addEventListener('mousemove', () => this.updateLastActiveTime());
    window.addEventListener('keydown', () => this.updateLastActiveTime());
    window.addEventListener('click', () => this.updateLastActiveTime());
  }

  private updateLastActiveTime() {
    this.lastActiveTime = Date.now();
  }

  private isUserActive(): boolean {
    return Date.now() - this.lastActiveTime < this.inactivityThreshold;
  }

  private scheduleNotification(notification: any) {
    let delay = 0;

    switch (notification.urgency) {
      case 'High':
        delay = notification.isActive ? 0 : 30 * 60 * 1000; // Immediate or 30 minutes
        break;
      case 'Medium':
        delay = 60 * 60 * 1000; // 1 hour
        break;
      case 'Low':
        delay = 2 * 60 * 60 * 1000; // 2 hours
        break;
    }

    setTimeout(() => {
      this.sendNotification(notification).subscribe();
    }, delay);
  }
}
