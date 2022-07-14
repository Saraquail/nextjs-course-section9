import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import { NotificationContext } from "../../store/notification-context";
import MainHeader from "./main-header";

function Layout(props) {
  const notificationCxt = useContext(NotificationContext);

  const activeNotification = notificationCxt.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </Fragment>
  );
}

export default Layout;
