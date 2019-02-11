<template>
  <div class="honor">
    <div class="menu-item-head">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="任务列表" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TaskView extends Vue {
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>

<style lang='scss'>

 
</style>
