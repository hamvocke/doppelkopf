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

  expect(notifier.messages).toHaveLength(1);
  expect(notifier.messages[0].text).toBe("Hello World");
  expect(notifier.messages[0].type).toBe(0);
});

test("should add flash message", () => {
  notifier.flash("Fuchs gefangen");

  expect(notifier.messages).toHaveLength(1);
  expect(notifier.messages[0].text).toBe("Fuchs gefangen");
  expect(notifier.messages[0].type).toBe(1);
});

test("should remove notification after timeout", () => {
  notifier.info("Hello World");

  expect(notifier.messages[0].text).toBe("Hello World");

  jest.runAllTimers();

  expect(notifier.messages).toEqual([]);
});
