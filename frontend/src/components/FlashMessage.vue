<template>
  <div class="flashMessage blink">
    <div class="icon" v-if="icon">{{ icon }}</div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "FlashMessage",
  props: {
    message: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
@import "../assets/css/colors.css";

.flashMessage {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.icon {
  font-size: 5em;
  margin: 12px;
}

.message {
  font-size: 3em;
  text-transform: uppercase;
  font-weight: bolder;
}

.blink {
  animation: 2s 0.5s blink;
}

@keyframes blink {
  5% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>
