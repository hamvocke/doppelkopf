import CopyText from "@/components/CopyText.vue";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = () => {};
config.mocks["$tc"] = () => {};

jest.useFakeTimers();
let mockClipboard: any;

describe("CopyText.vue", () => {
  beforeEach(() => {
    jest.runAllTimers();
    mockClipboard = {
      writeText: jest.fn().mockImplementation(() => Promise.resolve())
    };
    Object.assign(navigator, {
      clipboard: mockClipboard
    });
  });

  test("should show text", () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });
    expect((wrapper.find(".text").element as HTMLInputElement).value).toBe(
      "some text"
    );
  });

  test("should copy text on copy press", async () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });

    const button = wrapper.find("button");

    await button.trigger("click");

    expect(mockClipboard.writeText).toHaveBeenCalledWith("some text");
  });

  test("should change button text on button click", async () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });

    const button = wrapper.find("button");

    await button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.icon.name).toBe("CheckIcon");
    expect(wrapper.vm.$data.buttonText).toBe("copied");
  });

  test("should reset button text after timeout", async () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });

    const button = wrapper.find("button");

    await button.trigger("click");
    jest.runAllTimers();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.buttonText).toBe("copy");
    expect(wrapper.vm.$data.icon.name).toBe("ClipboardIcon");
  });
});
