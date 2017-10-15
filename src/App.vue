<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created: function () {
    this.$store.dispatch('FETCH_COMMENTS')
    this.$store.dispatch('ADD_YONGHU')
  }
}
</script>

<style>
</style>
