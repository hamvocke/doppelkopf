import WaitingRoom from "@/views/WaitingRoom.vue";
import { Config } from "@/models/config";
import { mount, config } from "@vue/test-utils";


config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("WaitingRoom.vue", () => {
  test.todo("should render waiting players");
});
