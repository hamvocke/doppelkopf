import { uniqueId } from "lodash";
let instance;

export class Notifier {
  constructor() {
    if (instance) {
      return instance;
    }

    this.messages = [];

    instance = this;
  }

  info(message) {
    this.messages.push({ id: uniqueId("message_"), text: message });
    window.setTimeout(() => {
      this.messages.pop();
    }, 4000);
  }
}
