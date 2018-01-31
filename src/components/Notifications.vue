<template>
  <div class="notifications" >
    <div class="message" v-for='message in messages'>
      {{ message }}
    </div>
  </div>
</template>

<script>
import { Notifier } from '@/models/notifier'

export default {
  name: 'Notifications',
  data: function () {
    return {
      messages: new Notifier().messages
    }
  }
}
</script>

<style scoped>

.message {
  position: relative;
  top: 0px;
  margin: 0px auto 6px;
  width: 80%;
  padding: 6px;
  background: rgba(255, 255, 255, 0.3);
  color: #333;
}

</style>
