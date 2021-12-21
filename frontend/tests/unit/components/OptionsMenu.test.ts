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

  test("should not show options modal initially", async () => {
    const wrapper = mount(OptionsMenu);

    await wrapper.setData({ visible: false });

    expect(wrapper.find(".modal").exists()).toBe(false);
  });

  test("should show options modal on icon click", async () => {
    const wrapper = mount(OptionsMenu);

    await wrapper.setData({ visible: false });
    await wrapper.find(".icon.icon-options").trigger("click");

    expect(wrapper.find(".modal").exists()).toBe(true);
  });
});
