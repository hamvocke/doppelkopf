import Button from "@/components/Button";
import { mount } from "@vue/test-utils";

describe("Button.vue", () => {
  it("should display button", () => {
    const wrapper = mount(Button, {
      propsData: { onClick: () => {} }
    });

    expect(wrapper.find(".button").exists()).toBe(true);
  });

  it("should trigger click function", () => {
    const callback = jest.fn();
    const wrapper = mount(Button, {
      propsData: { onClick: callback }
    });

    wrapper.find(".button").trigger("click");

    expect(callback).toBeCalled();
  });
});
