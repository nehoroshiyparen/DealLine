import { Notification } from "../../types";

export interface NotificationResponse {
    notifications: Notification[];
}

export interface DefaultNotificationResponse {
    message: string;
    errors: [];
}