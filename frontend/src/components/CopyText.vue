<template>
  <div class="copyText">
    <input type="text" :value="text" readonly />
    <button
      class="button button-secondary button-plain"
      @click="copyTextToClipboard()"
    >
      <Icon :name="icon" />
      <span class="text">{{ buttonText }}</span>
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
  padding: 12px 2px;
  font-size: 1.4em;
  font-family: monospace;
  border: none;
  border-radius: 4px 0 0 4px;
}

button {
  margin-left: -3px;
  border-radius: 0 4px 4px 0;
  font-size: 1em;
  padding: 10px 16px 10px 8px;
  background-color: var(--lightgray);
  display: flex;
  align-items: center;
}

.text {
  padding-left: 6px;
}
</style>
