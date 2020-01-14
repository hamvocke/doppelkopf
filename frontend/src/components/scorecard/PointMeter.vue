<template>
  <div id="point-meter">
    <div class="bar-wrapper">
      <div class="bar re" :style="reStyle">
        {{ rePoints }} {{ $t("points") }}
      </div>
      <div class="bar kontra" :style="kontraStyle">
        {{ kontraPoints }} {{ $t("points") }}
      </div>
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
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 16px 4px;
}

.bar-wrapper {
  display: inline-flex;
}

.bar {
  margin: 0;
  padding: 8px;
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
</style>
