import { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState();

  useEffect(() => {
    if (notification && notification.status !== "pending") {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  function showNotificationHandler(notificationData) {
    setNotification(notificationData);
  }

  function hideNotificationHandler() {
    setNotification(null);
  }

  const notificationContext = {
    notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};
