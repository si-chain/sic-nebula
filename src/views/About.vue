<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <el-button @click="getUser">click me</el-button> -->
    <IOdometer class="tip" :value="num"></IOdometer>
    <el-button @click="add">点击</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IOdometer from '../components/Dometer.vue'
// import 'odometer/themes/odometer-theme-minimal.css'

@Component({
  components: {
    IOdometer
  }
})
export default class About extends Vue {
  private num: number = 7477
  private add () {
    this.num = this.num + 1
  }
}
</script>
<style lang="scss" scoped>
.about {
  .tip {
    color: aqua;
    font-size: 60px;
    font-weight: 600;
  }
}
</style>


