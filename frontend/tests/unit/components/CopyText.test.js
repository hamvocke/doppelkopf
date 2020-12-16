import CopyText from "@/components/CopyText";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = () => {};
config.mocks["$tc"] = () => {};

jest.useFakeTimers();
let mockClipboard;

describe("CopyText.vue", () => {
  beforeEach(() => {
    jest.runAllTimers();
    mockClipboard = {
      writeText: jest.fn().mockImplementation(() => Promise.resolve())
    };
    global.navigator.clipboard = mockClipboard;
  });

  test("should show text", () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });
    expect(wrapper.find(".text").element.value).toBe("some text");
  });

  test("should copy text on copy press", () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });

    const button = wrapper.find("button");

    button.trigger("click");

    expect(mockClipboard.writeText).toHaveBeenCalledWith("some text");
  });

  test("should change button text on button click", async () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });

    const button = wrapper.find("button");

    button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.icon.name).toBe("CheckIcon");
    expect(wrapper.vm.buttonText).toBe("copied");
  });

  test("should reset button text after timeout", async () => {
    const wrapper = mount(CopyText, {
      propsData: { text: "some text" }
    });

    const button = wrapper.find("button");

    button.trigger("click");
    jest.runAllTimers();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.buttonText).toBe("copy");
    expect(wrapper.vm.icon.name).toBe("ClipboardIcon");
  });
});
