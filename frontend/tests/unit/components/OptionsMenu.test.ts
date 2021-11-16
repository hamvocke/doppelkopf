import OptionsMenu from "@/components/OptionsMenu.vue";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("OptionsMenu.vue", () => {
  test("should show options icon", async () => {
    const wrapper = mount(OptionsMenu);

    await wrapper.setData({ visible: true });

    expect(wrapper.find(".icon.icon-options").exists()).toBe(true);
  });

  test("should not show options", async () => {
    const wrapper = mount(OptionsMenu);

    await wrapper.setData({ visible: false });

    expect(wrapper.find(".options-menu").exists()).toBe(false);
  });

  test("should show options", async () => {
    const wrapper = mount(OptionsMenu);

    await wrapper.setData({ visible: false });
    await wrapper.find(".icon.icon-options").trigger("click");

    expect(wrapper.find(".options-menu").exists()).toBe(true);
  });

  test("should contain language picker", async () => {
    const wrapper = mount(OptionsMenu);

    await wrapper.setData({ visible: true });

    expect(wrapper.find(".options-menu #languages").exists()).toBe(true);
  });
});
