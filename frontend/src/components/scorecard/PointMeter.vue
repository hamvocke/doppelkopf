<template>
  <div id="point-meter">
    <div class="scale">
      <span class="dark"></span>
      <span class="bright"></span>
      <span class="dark"></span>
      <span class="bright"></span>
      <span class="dark"></span>
      <span class="bright"></span>
      <span class="dark"></span>
      <span class="bright"></span>
    </div>
    <div class="bar-wrapper">
      <div class="bar re" :style="reStyle"></div>
      <div class="bar kontra" :style="kontraStyle"></div>
    </div>
    <div class="points">
      <span>{{ rePoints }} {{ $t("points") }}</span>
      <span>{{ kontraPoints }} {{ $t("points") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PointMeter",
  props: {
    rePoints: {
      type: Number,
      required: true
    },
    kontraPoints: {
      type: Number,
      required: true
    }
  },
  computed: {
    reStyle() {
      return `width: ${this.rePoints * 2}px`;
    },
    kontraStyle() {
      return `width: ${this.kontraPoints * 2}px`;
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/vars.css";

#point-meter {
  margin: 16px auto;
}

.scale {
  position: relative;
  margin-top: -18px;
  top: 18px;
  display: flex;
  height: 18px;
  width: 100%;
  background: transparent;
}

.scale > span {
  position: relative;
  flex-grow: 1;
}

.scale > span.dark {
  background: var(--black);
  opacity: 0.1;
  mix-blend-mode: color-burn;
  border-radius: 0 0 0 0;
}

.scale > span.bright {
  background: var(--white);
  opacity: 0.1;
  mix-blend-mode: color-burn;
  border-radius: 8px;
}

.bar-wrapper {
  display: inline-flex;
}

.bar {
  margin: 0;
  padding: 8px 0;
}

.kontra {
  background-color: var(--cyan);
  border-bottom: 5px solid color(var(--cyan) shade(25%));
  border-radius: 0 8px 8px 0;
  color: var(--black);
}

.re {
  background-color: var(--lightblue);
  border-bottom: 5px solid color(var(--lightblue) shade(25%));
  border-radius: 8px 0 0 8px;
  color: var(--white);
}

.points {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px 0;
}

.points > span:first-child {
  padding-left: 8px;
}

.points > span:last-child {
  padding-right: 8px;
}
</style>
