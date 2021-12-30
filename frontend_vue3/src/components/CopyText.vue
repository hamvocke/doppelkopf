<template>
  <div class="copyText">
    <input type="text" class="text" :value="text" readonly />
    <button type="button" class="button" @click="copyTextToClipboard">
      <component :is="icon"></component>
      <span class="buttonText">{{ $t(buttonText) }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CheckIcon, ClipboardIcon } from "vue-feather-icons";

@Component({
  components: { CheckIcon, ClipboardIcon }
})
export default class CopyText extends Vue {
  @Prop({ required: true })
  text!: string;

  buttonText = "copy";
  icon = ClipboardIcon;
  copying = false;

  copyTextToClipboard() {
    if (this.copying) {
      return;
    }

    this.copying = true;
    navigator.clipboard.writeText(this.text);
    let oldText = this.buttonText;
    this.buttonText = "copied";
    this.icon = CheckIcon;
    setTimeout(() => {
      this.copying = false;
      this.buttonText = oldText;
      this.icon = ClipboardIcon;
    }, 1500);
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

.copyText {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  flex-grow: 1;
  padding: 8px 0;
  font-size: 1.5em;
  font-family: monospace;
  border: none;
  border-radius: 4px 0 0 4px;
  background: transparent;
}

button {
  margin-right: 0;
}

.buttonText {
  padding-left: 6px;
}
</style>
