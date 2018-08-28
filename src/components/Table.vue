<template>
  <div class="table">
    <Player :player='game.players[1]' position='left' class='left' />
    <Player :player='game.players[2]' position='top' class='top' />

    <div class="center">
      <Trick :currentTrick='game.currentTrick'/>
    </div>

    <Player :player='game.players[3]' position='right' class='right'/>
    <Player :player='game.players[0]' position='bottom' class='bottom' />
  </div>
</template>

<script>
import Player from './Player'
import Trick from './Trick'

export default {
  name: 'Table',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  components: {
    Player, Trick
  }
}
</script>

<style scoped>
.table {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto 50px;
  grid-template-areas:
    "top top top"
    "left center right"
    "left bottom right"
    "controls controls controls";
}
.top {
  grid-area: top;
}

.right {
  grid-area: right;
}

.center {
  grid-area: center;
}

.bottom {
  grid-area: bottom;
}

.left {
  grid-area: left;
}
</style>
