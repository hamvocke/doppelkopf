<template>
  <div class="tutorial">
    <h1>Tutorial</h1>

    This is a Dulle
    <Card :card="dulle" />
  </div>
</template>

<script>
import Card from "./Card";
import { ten, suits } from "@/models/card";

export default {
  name: "Tutorial",
  components: { Card },
  data () {
    return {
      dulle: ten.of(suits.hearts)
    }
  }
};
</script>

<style scoped>
@import "../assets/css/colors.css";

</style>
