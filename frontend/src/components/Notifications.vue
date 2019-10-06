<template>
  <div class="notifications" >
    <transition-group name="message">
      <div v-for='message in messages' :key='message.id' class="message">
        {{ $t(message.text) }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { Notifier } from "@/models/notifier";

export default {
  name: "Notifications",
  data: function() {
    return {
      messages: new Notifier().messages
    };
  }
};
</script>

<style scoped>
@import "../assets/css/colors.css";

.notifications {
  width: 100%;
  position: absolute;
  top: 0px;
  z-index: 9999;
}

.message {
  text-align: center;
  margin: 0px auto 6px;
  line-height: 42px;
  height: 100%;
  width: 80%;
  font-size: 1em;
  background: var(--black);
  color: var(--white);
  border-radius: 6px;
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.12);
}

.message-enter-active,
.message-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.message-enter,
.message-leave-to {
  opacity: 0;
  transform: translateY(-48px);
}
</style>
