import { uniqueId } from "lodash-es";
let instance;

const INFO_TYPE = 0;
const FLASH_TYPE = 1;

export class Notifier {
  constructor() {
    if (instance) {
      return instance;
    }

    this.messages = [];

    instance = this;
  }

  info(message) {
    this.messages.push({
      id: uniqueId("message_"),
      text: message,
      type: INFO_TYPE
    });

    window.setTimeout(() => {
      this.messages.pop();
    }, 4000);
  }

  flash(message) {
    this.messages.push({
      id: uniqueId("flash_"),
      text: message,
      type: FLASH_TYPE
    });

    window.setTimeout(() => {
      this.messages.pop();
    }, 4000);
  }
}
