<template>
  <div class="logo-container">
    <div class="logo">
      <div class="outline right"></div>
      <div class="outline left"></div>
      <div class="card right">
        <div class="suit hearts">♥</div>
      </div>
      <div class="card left">
        <div class="suit clubs">♣</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 280px;
  width: 360px;
}

.card {
  z-index: 0;
  background-color: var(--white);
  border-radius: 16px;
}

.outline {
  z-index: -1;
  height: 180px;
  width: 120px;
  margin: -8px;
  border-radius: 16px;
  border: 16px solid var(--white);
}

.suit {
  height: 180px;
  width: 120px;
  border: 8px solid var(--blue);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 96px;
  font-family: "Fira Sans Condensed", sans-serif;
  font-weight: 900;
  -webkit-text-stroke-width: 8px;
  -webkit-text-stroke-color: var(--blue);
}

.clubs {
  color: var(--blue);
}

.hearts {
  color: var(--red);
}

.logo:hover .left,
.logo:hover .right {
  transform: none;
}

.left {
  transition: transform ease-in 0.2s;
  position: absolute;
  transform: translate(-42px) rotate(-20deg);
}

.right {
  transition: transform ease-in 0.25s;
  position: absolute;
  transform: translate(64px, 0px) rotate(20deg);
}
</style>
