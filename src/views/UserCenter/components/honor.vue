<template>
  <div class="honor">
    <div class="menu-item-head">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="荣誉殿堂" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div class="honor-content">
      <div v-for="i in [2015, 2016, 2017, 2018]" :key="i">
        {{i}} mdrt 荣誉
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class HonorView extends Vue {
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>

<style lang='scss'>
.honor-content {
  text-align: left;
}
 
</style>
