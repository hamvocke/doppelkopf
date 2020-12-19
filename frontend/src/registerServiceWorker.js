/* eslint-disable no-console */

import { register } from "register-service-worker";
import { Notifier } from "@/models/notifier";

const notifier = new Notifier();

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {},
    cached() {},
    updated(registration) {
      const handleRefreshClick = () => {
        let refreshing = false;
        if (!registration || !registration.waiting) return;
        // Send message to service worker to skip the waiting and activate the new service worker
        registration.waiting.postMessage({ type: "SKIP_WAITING" });

        // wait for new service worker to take over and then refresh the page
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });
      };

      notifier.sticky("new_version_available", null, handleRefreshClick);
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
