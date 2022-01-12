import { createContext } from "react";

export type SetNotificationType = {
  type: 'success' | 'info' | 'warning' | 'error'
  body: string
}

type NotificationContextType = {
  type: 'success' | 'info' | 'warning' | 'error'
  body: string
  setNotification: ({type, body}: SetNotificationType) => void
}

export const NotificationContext = createContext<NotificationContextType>({
  type: 'info',
  body: '',
  setNotification: () => {}
});
