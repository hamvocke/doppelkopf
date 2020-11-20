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

  async info(message, args = null) {
    this.notifications.push({
      id: uniqueId("message_"),
      text: message,
      args: args
    });

    await this.wait(4000);
    this.notifications.pop();
  }

  async flash(message) {
    this.flashMessages.push({
      id: uniqueId("flash_"),
      text: message
    });

    await this.wait(3000);
    this.flashMessages.pop();
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
