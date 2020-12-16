import { uniqueId } from "lodash-es";
let instance;

export class Notifier {
  constructor() {
    if (instance) {
      return instance;
    }

    this.stickies = [];
    this.notifications = [];
    this.flashMessages = [];

    instance = this;
  }

  async info(message, args = null) {
    this.notifications.push(
      new Notification(uniqueId("message_"), message, args)
    );
    await this.wait(4000);
    this.notifications.pop();
  }

  sticky(message, args = null, onClick) {
    const id = uniqueId("message_");
    const onDismiss = () => {
      this.stickies = this.stickies.filter(n => n.id !== id);
    };
    const notification = new Notification(
      id,
      message,
      args,
      onClick,
      onDismiss
    );

    this.stickies.push(notification);
  }

  async flash(message) {
    this.flashMessages.push(new Notification(uniqueId("message_"), message));

    await this.wait(3000);
    this.flashMessages.pop();
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

class Notification {
  constructor(id, text, args = null, onClick = null, onDismiss = null) {
    this.id = id;
    this.text = text;
    this.args = args;
    this.onClick = onClick;
    this.onDismiss = onDismiss;
  }
}
