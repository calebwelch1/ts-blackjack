<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './stylesheets/index.css'
import './stylesheets/index.scss'

export default {
  name: 'App',
  data() {
    return {
      currentPage: 'Landing',
    }
  },
  methods: {
    hi() {
      this.currentPage = 'hi';
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap');

* {
  font-family: 'Comfortaa', 'Avenir', 'Arial', 'sans-serif' !important
}

body{
  margin:0 !important;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: slate-grey;
  background-color: transparent;
}
.hi{
  color:black;
}
</style>
