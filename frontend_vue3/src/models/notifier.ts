import { v4 as uuidv4 } from "uuid";
export class Notifier {
  stickies = new Array<Notification>();
  notifications = new Array<Notification>();
  flashMessages = new Array<Notification>();

  async info(message: string, args?: {}) {
    // TODO: get rid of uuids after migrating to vue3
    this.notifications.push(new Notification(uuidv4(), message, args));
    await this.wait(4000);
    this.notifications.pop();
  }

  sticky(
    message: string,
    args?: {},
    onClick?: () => void,
    onDismiss?: () => void
  ) {
    const id = uuidv4();
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
    this.flashMessages.push(new Notification(uuidv4(), message));

    await this.wait(3000);
    this.flashMessages.pop();
  }

  wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export class Notification {
  id: string;
  text: string;
  args: {};
  onClick?: () => void;
  onDismiss?: () => void;
  constructor(
    id: string,
    text: string,
    args?: {},
    onClick?: () => void,
    onDismiss?: () => void
  ) {
    this.id = id;
    this.text = text;
    this.args = args || {};
    this.onClick = onClick;
    this.onDismiss = onDismiss;
  }
}

export const notifier = new Notifier();
