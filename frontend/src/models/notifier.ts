import { uniqueId } from "lodash-es";
let instance: Notifier;

export class Notifier {
  stickies = new Array<Notification>();
  notifications = new Array<Notification>();
  flashMessages = new Array<Notification>();

  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  async info(message: string, args?: object) {
    this.notifications.push(
      new Notification(uniqueId("message_"), message, args)
    );
    await this.wait(4000);
    this.notifications.pop();
  }

  sticky(
    message: string,
    args?: object,
    onClick?: () => void,
    onDismiss?: () => void
  ) {
    const id = uniqueId("message_");
    const onDismissDefault = () => {
      this.stickies = this.stickies.filter(n => n.id !== id);
    };
    const notification = new Notification(
      id,
      message,
      args,
      onClick,
      onDismiss ?? onDismissDefault
    );

    this.stickies.push(notification);
  }

  async flash(message: string) {
    this.flashMessages.push(new Notification(uniqueId("message_"), message));

    await this.wait(3000);
    this.flashMessages.pop();
  }

  wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

class Notification {
  id: string;
  text: string;
  args?: object;
  onClick?: () => void;
  onDismiss?: () => void;
  constructor(
    id: string,
    text: string,
    args?: object,
    onClick?: () => void,
    onDismiss?: () => void
  ) {
    this.id = id;
    this.text = text;
    this.args = args;
    this.onClick = onClick;
    this.onDismiss = onDismiss;
  }
}
