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
#point-meter {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 4px;
}

.bar-wrapper {
  display: inline-flex;
}

.bar {
  margin: 0;
  padding: 4px;
}

.re {
  background-color: var(--cyan);
  color: var(--black);
}

.kontra {
  background-color: var(--lightblue);
}
</style>
