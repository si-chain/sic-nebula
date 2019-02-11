<template>
  <div class="menu-hot-comment">
    <div class="menu-item-head" v-if="showTitle">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="我的热评" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div class="comment-item" v-for="i in 5" :key="i"> 
      <span>id:4845 </span>
      <span>我是小刘  使用了您提供的理赔服务，成功拿到理赔金额</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Comment extends Vue {
  private menus: any[] = [
    { title: '我的荣誉', icon: 'icon-', bg: '#ccc', color: '#f10' },
    { title: '我的服务', icon: 'icon-', bg: '#fa0', color: 'green' },
    { title: '我的热评', icon: 'icon-', bg: 'blue', color: 'yellow' },
    { title: '任务列表', icon: 'icon-', bg: '#123', color: 'pink' },
    { title: '我的客户', icon: 'icon-', bg: 'pink', color: 'blue' },
    { title: '我的团队', icon: 'icon-', bg: '#f10', color: '#ccc' },
    { title: '我的业绩', icon: 'icon-', bg: 'green', color: '#999' }
  ]
  @Prop({ default: false })
  private showTitle!: boolean
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>
<style lang="scss" scoped>
.menu-hot-comment {
  margin-top: 30px;
  .comment-item {
    text-align: left;
    line-height: 25px;
    margin-left: 10px;
  }
}
</style>
