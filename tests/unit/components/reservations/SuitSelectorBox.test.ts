import SuitSelectorBox from "@/components/reservations/SuitSelectorBox.vue";
import { Reservation } from "@/models/reservation";
import { mount, config } from "@vue/test-utils";

config.global.mocks["$t"] = (msg: string) => msg;
config.global.mocks["$tc"] = (msg: string) => msg;
config.global.mocks["$i18n"] = { locale: "en" };

describe("SuitSelectorBox.vue", () => {
  test("should render disabled state", () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: true, modelValue: Reservation.None },
    });

    expect(wrapper.find(".selectable-box").exists()).toBe(true);
    expect(wrapper.find(".selectable-box").classes()).toContain("disabled");
  });

  test("should render active state", () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: false, modelValue: Reservation.None },
    });

    expect(wrapper.find(".selectable-box").classes()).not.toContain("disabled");
  });

  test("should show clubs suite by default", () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: false, modelValue: Reservation.None },
    });

    expect(wrapper.find(".selectable-box").text()).toContain("suit-solo-clubs-title");
  });

  test("should emit event on click", async () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: false, modelValue: Reservation.None },
    });

    await wrapper.find(".selectable-box").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
  });

  test("should not emit event on click if component is disabled", async () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: true, modelValue: Reservation.None },
    });

    await wrapper.find(".selectable-box").trigger("click");

    expect(wrapper.emitted()).not.toHaveProperty("update:modelValue");
  });

  test("should show next suite on click", async () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: false, modelValue: Reservation.None, selected: true },
    });

    await wrapper.find(".selectable-box").trigger("click");
    expect(wrapper.text()).toContain("suit-solo-spades-title");

    await wrapper.find(".selectable-box").trigger("click");
    expect(wrapper.text()).toContain("suit-solo-hearts-title");

    await wrapper.find(".selectable-box").trigger("click");
    expect(wrapper.text()).toContain("suit-solo-diamonds-title");

    await wrapper.find(".selectable-box").trigger("click");
    expect(wrapper.text()).toContain("suit-solo-clubs-title");
  });

  test("should highlight and show checkbox when selected", () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: false, modelValue: Reservation.None, selected: true },
    });

    expect(wrapper.find(".checkmark").exists()).toBe(true);
    expect(wrapper.find(".selectable-box").classes()).toContain("selected");
  });

  test("should not show checkbox when box is not selected", () => {
    const wrapper = mount(SuitSelectorBox, {
      props: { disabled: false, modelValue: Reservation.None, selected: false },
    });

    expect(wrapper.find(".checkmark").exists()).toBe(false);
    expect(wrapper.find(".selectable-box").classes()).not.toContain("selected");

  });
});