<template>
  <div v-if="visible" class="modal" @click.self="clickaway">
    <div v-on-clickaway="clickaway" class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { mixin as clickaway } from "vue-clickaway";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ mixins: [clickaway] })
export default class Modal extends Vue {
  @Prop({ default: false })
  visible!: boolean;

  clickaway() {
    this.$emit("clickaway");
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

.modal {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: var(--modal-layer);
  color: var(--black);
  background-color: color(var(--black) a(80%));
}

.modal-content {
  max-width: 80%;
  background-color: var(--white-100);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

@media screen and (max-width: 680px) {
  .modal-content {
    max-width: 100%;
  }
}
</style>
