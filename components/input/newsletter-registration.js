import classes from "./newsletter-registration.module.css";
import { useRef, useContext } from "react";
import { NotificationContext } from "../../store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCxt = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;

    notificationCxt.showNotification({
      title: "Signing up...",
      message: "Registering",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json;
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong");
          });
        }
      })
      .then((data) => {
        notificationCxt.showNotification({
          title: "Success!",
          message: "You have successfully registered for the newsletter",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCxt.showNotification({
          title: "Error!",
          message:
            err.message || "There was an error registering for the newsletter",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
