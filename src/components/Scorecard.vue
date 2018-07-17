<template>
  <div class="scorecard" >
    <table>
      <tr>
        <th class="player" v-for='player in scorecard.players'>{{ player.name }}</th>
      </tr>
      <tr class="scoreLine" v-for='scoreLine in scorecard.scoreLines'>
        <td v-for='score in scoreLine'>
          {{ score }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Scorecard',
  props: {
    scorecard: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.scorecard {
  background: white;
  display: inline-block;
  padding: 6px;
  margin: 6px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

}

.scorecard th, .scorecard td {
  padding: 6px;
}

</style>
