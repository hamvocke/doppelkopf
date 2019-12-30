<template>
  <div class="notification-container">
    <div class="notifications">
      <transition-group name="message">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="message"
        >
          {{ $t(notification.text) }}
        </div>
      </transition-group>
    </div>
    <div class="flashMessages">
      <FlashMessage
        v-if="flashMessages[0]"
        :message="flashMessages[0].text"
        :icon="flashMessages[0].icon"
      />
    </div>
  </div>
</template>

<script>
import { Notifier } from "@/models/notifier";
import FlashMessage from "@/components/FlashMessage";

const notifier = new Notifier();

export default {
  name: "Notifications",
  components: { FlashMessage },
  data: function() {
    return {
      notifications: notifier.notifications,
      flashMessages: notifier.flashMessages
    };
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.notifications {
  width: 100%;
  position: absolute;
  top: 0px;
  z-index: var(--notification-layer);
}

.message {
  text-align: center;
  margin: 0px auto 6px;
  line-height: 42px;
  height: 100%;
  width: 80%;
  font-size: 1em;
  background: var(--lightblue);
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
