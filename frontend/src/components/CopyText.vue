<template>
  <div class="copyText">
    <input type="text" class="text" :value="text" readonly />
    <button
      type="button"
      class="button button-secondary"
      @click="copyTextToClipboard"
    >
      <Icon :name="icon" />
      <span class="buttonText">{{ buttonText }}</span>
    </button>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "CopyText",
  components: {
    Icon
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      buttonText: "Copy",
      icon: "clipboard"
    };
  },
  methods: {
    copyTextToClipboard: function() {
      navigator.clipboard.writeText(this.text);
      let oldText = this.buttonText;
      this.buttonText = "Copied!";
      this.icon = "check";
      setTimeout(() => {
        this.buttonText = oldText;
        this.icon = "clipboard";
      }, 1500);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.copyText {
  display: flex;
  align-items: center;
}

input {
  padding: 8px 0;
  font-size: 1.7em;
  font-family: monospace;
  border: none;
  border-radius: 4px 0 0 4px;
  background: transparent;
  color: var(--white);
}

button {
  display: flex;
  align-items: center;
}

.buttonText {
  padding-left: 6px;
}
</style>
