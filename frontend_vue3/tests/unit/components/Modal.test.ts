import Modal from "@/components/Modal.vue";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("Modal.vue", () => {
  test("should not show modal", () => {
    const wrapper = mount(Modal, { propsData: { visible: false } });

    expect(wrapper.find(".modal").exists()).toBe(false);
    expect(wrapper.find(".modal-content").exists()).toBe(false);
  });

  test("should show modal", () => {
    const wrapper = mount(Modal, { propsData: { visible: true } });

    expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.find(".modal-content").exists()).toBe(true);
  });

  test("should emit clickaway event", async () => {
    const wrapper = mount(Modal, { propsData: { visible: true } });

    await wrapper.find(".modal").trigger("click");

    expect(wrapper.emitted().clickaway?.length).toBe(1);
  });
});
