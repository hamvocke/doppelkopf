<template>
  <div class="notification-container">
    <transition-group name="message" class="notifications">
      <div
        v-for="sticky in stickies"
        :key="sticky.id"
        class="message clickable"
        @click="sticky.onClick"
      >
        {{ $t(sticky.text, sticky.args) }}
        <button class="close-button" @click.stop.prevent="sticky.onDismiss">
          <x-icon size="20" />
        </button>
      </div>
    </transition-group>
    <transition-group name="message" class="notifications">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="message"
      >
        {{ $t(notification.text, notification.args) }}
      </div>
    </transition-group>
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
import { XIcon } from "vue-feather-icons";

const notifier = new Notifier();

export default {
  name: "Notifications",
  components: { FlashMessage, XIcon },
  data: function() {
    return {
      stickies: notifier.stickies,
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
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto 6px;
  padding: 8px;
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

.close-button {
  background: none;
  border: none;
  color: var(--white);
  margin: 0;
  margin-left: 12px;
  padding: 0;
  cursor: pointer;
}

.clickable {
  cursor: pointer;
}
</style>
