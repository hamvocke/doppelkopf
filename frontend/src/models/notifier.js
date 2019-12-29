import { uniqueId } from "lodash-es";
let instance;

export class Notifier {
  constructor() {
    if (instance) {
      return instance;
    }

    this.notifications = [];
    this.flashMessages = [];

    instance = this;
  }

  info(message) {
    this.notifications.push({
      id: uniqueId("message_"),
      text: message
    });

    window.setTimeout(() => {
      this.notifications.pop();
    }, 4000);
  }

  flash(message) {
    this.flashMessages.push({
      id: uniqueId("flash_"),
      text: message
    });

    window.setTimeout(() => {
      this.flashMessages.pop();
    }, 4000);
  }
}
