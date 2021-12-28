<template>
<div>
<div class="container">
  <div class="col-span-12 w-full">
    <div class="grid-col-12 w-full">
        <div class="col-span-12" style="background-color: black; height: 60vh; color: white;">
        <button @click="click">click me :) </button>
        </div>
        <div class="col-span-12" style="background-color: blue; height: 100vh; color: white;">
        </div>
      </div>
    </div>
  <div class="col-span-12 w-full" style="background-color: red; height: 20rem; color: white;">
  </div>
  <div class="col-span-12 w-full" style="background-color: yellow; height: 6rem; color: white;">
  footer :)
  </div>
  </div>
</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: 'HomeRouter',
  data() {
  return {
    none: false,
    message: 'hey there ;)',
  }
 },
  methods: {
   handleClick(tab, event) {
     console.log(tab, event);
   },
   click(): void {
     window.alert(this.message);
   },
 },
});
</script>

<style lang="scss" scoped>

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

/deep/ body {
  margin: 0 !important;
}

.container{
display: grid;
grid-template-columns: repeat(12, minmax(0, 1fr));
height: 100%;
width:100%;
margin:0;
justify-items: center;
overflow: hidden;
}
/deep/.el-tabs__header{
  margin: 0;
}
/deep/.el-tabs__nav {
  float:none;
}
/deep/.el-tabs__active-bar{
  visibility: hidden;
}

/deep/.el-tabs__nav-wrap {
  color:white;
  background-color: black;
  justify-items:center;
}

/deep/.el-tabs__item.is-active {
  position: relative;
  color: white;
}

// /deep/.el-tabs__item.is-active::after {
//   position: absolute;
//   content: '';
//   width: 4rem;
//   height: 0.1rem;
//   top:2rem;
//   right:0.8rem;
//   background-color: white;
//   transition: all .3s;
// }

/deep/.el-tabs__item {
  color: #b7b7b7;
}
</style>
