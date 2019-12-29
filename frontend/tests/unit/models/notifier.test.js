import { Notifier } from "@/models/notifier";

const notifier = new Notifier();

jest.useFakeTimers();

beforeEach(() => {
  jest.runAllTimers();
});

test("notifier is always the same instance", () => {
  const anotherNotifier = new Notifier();
  expect(notifier).toBe(anotherNotifier);
});

test("should add notification", () => {
  notifier.info("Hello World");

  expect(notifier.flashMessages).toHaveLength(0);
  expect(notifier.notifications).toHaveLength(1);
  expect(notifier.notifications[0].text).toBe("Hello World");
});

test("should add flash message", () => {
  notifier.flash("Fuchs gefangen");

  expect(notifier.notifications).toHaveLength(0);
  expect(notifier.flashMessages).toHaveLength(1);
  expect(notifier.flashMessages[0].text).toBe("Fuchs gefangen");
});

test("should remove notification after timeout", () => {
  notifier.info("Hello World");

  expect(notifier.notifications[0].text).toBe("Hello World");

  jest.runAllTimers();

  expect(notifier.notifications).toEqual([]);
});

test("should remove flash message after timeout", () => {
  notifier.flash("Hello World");

  expect(notifier.flashMessages[0].text).toBe("Hello World");

  jest.runAllTimers();

  expect(notifier.flashMessages).toEqual([]);
});
