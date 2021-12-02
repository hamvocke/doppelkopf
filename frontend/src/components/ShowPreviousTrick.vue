<template>
  <div class="options">
    <div
      v-if="trick"
      class="icon icon-rewind"
      :title="$t('show_last_trick_header')"
      @click="toggleVisibility()"
    >
      <rotate-ccw-icon></rotate-ccw-icon>
    </div>
    <div
      v-if="visible"
      v-on-clickaway="toggleVisibility"
      class="last-trick"
      @click.self="toggleVisibility()"
    >
      <div class="last-trick-content">
        <h2>{{ $t("show_last_trick_header") }}</h2>
        <div class="option">
          <span class="label">
            {{ $t("show_last_trick_label", { name: trick.winner().name }) }}
          </span>
        </div>
        <Trick :trick="trick" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Config } from "@/models/config";
import { mixin as clickaway } from "vue-clickaway";
import { RotateCcwIcon } from "vue-feather-icons";
import { Trick as TrickModel } from "@/models/trick";
import Trick from "@/components/Trick.vue";

@Component({
  components: { RotateCcwIcon, Trick },
  mixins: [clickaway]
})
export default class ShowPreviousTrick extends Vue {
  @Prop()
  trick?: TrickModel;

  config = Config;
  visible: boolean = false;

  toggleVisibility() {
    this.visible = !this.visible;
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

.icon {
  position: absolute;
  border-radius: 4px;
  background-color: var(--shell);
  padding: 8px;
  color: var(--black);
  cursor: pointer;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  z-index: var(--options-icon-layer);
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-rewind {
  top: 60px;
  right: 12px;
}

.last-trick {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: var(--options-menu-layer);
  color: var(--black);
  background-color: color(var(--black) a(80%));
}

.last-trick-content {
  max-width: 40%;
  background-color: var(--shell);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  display: flex;
  flex-direction: column;
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

@media screen and (max-width: 680px) {
  .last-trick-content {
    max-width: 100%;
  }
}
</style>
