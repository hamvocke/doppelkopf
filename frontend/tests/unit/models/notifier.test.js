import { Notifier } from "@/models/notifier";

const notifier = new Notifier();

jest.useFakeTimers();

test("notifier is always the same instance", () => {
  const anotherNotifier = new Notifier();
  expect(notifier).toBe(anotherNotifier);
});

test("should add notification", () => {
  notifier.info("Hello World");

  expect(notifier.messages).toHaveLength(1);
  expect(notifier.messages[0].text).toBe("Hello World");
});

test("should remove notification after timeout", () => {
  notifier.info("Hello World");

  expect(notifier.messages[0].text).toBe("Hello World");

  jest.runAllTimers();

  expect(notifier.messages).toEqual([]);
});
