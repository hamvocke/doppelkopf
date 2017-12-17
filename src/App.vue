<template>
  <div id="app">
    <h1>Doppelkopf</h1>
    <Card/>
  </div>
</template>

<script>
import Card from './components/Card'

export default {
  name: 'app',
  components: {
    Card
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
