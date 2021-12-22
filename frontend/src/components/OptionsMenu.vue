<template>
  <div class="options">
    <div
      class="icon icon-options"
      :title="$t('options-header')"
      @click="toggleMenu"
    >
      <settings-icon></settings-icon>
    </div>
    <modal :visible="visible" @clickaway="hideMenu">
      <h2>{{ $t("options-header") }}</h2>
      <div class="option">
        <span class="label">{{ $t("language") }}</span>
        <LanguagePicker />
      </div>

      <div v-if="config.debug" class="option">
        <span class="label">Debug Mode</span>
        <div>
          Enabled
        </div>
        <div>
          {{ config }}
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LanguagePicker from "./LanguagePicker.vue";
import Modal from "./Modal.vue";
import { mixin as clickaway } from "vue-clickaway";
import { Config } from "@/models/config";
import { RotateCcwIcon, SettingsIcon } from "vue-feather-icons";

@Component({
  components: { LanguagePicker, SettingsIcon, RotateCcwIcon, Modal },
  mixins: [clickaway]
})
export default class OptionsMenu extends Vue {
  config = Config;
  visible: boolean = false;

  toggleMenu() {
    this.visible = !this.visible;
  }

  hideMenu() {
    this.visible = false;
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

.icon {
  position: absolute;
  border-radius: 4px;
  background-color: var(--white);
  padding: 8px;
  color: var(--black);
  cursor: pointer;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  z-index: var(--menu-icon-layer);
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-options {
  top: 12px;
  right: 12px;
}

.option {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
}

.label {
  font-weight: bold;
  margin-right: 18px;
}

h2 {
  margin-top: 0;
}
</style>
