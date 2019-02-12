<template>
  <div class="user-center-menu">
    <div class="menu-content">
      <el-row :gutter="15">
        <el-col v-for="(menu, index) in menus" :key="index" :span="6">
          <div class="menu-item clearfix" :style="{background: menu.bg}" @click="changeView(menu.type)">
            <i class="iconfont" :class="menu.icon" :style="{color: menu.color}"></i>
            <span>{{menu.title}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Comment from './comment.vue'
@Component({
  components: {
    Comment
  }
})
export default class UserMenu extends Vue {
  private menus: any[] = [
    { title: '我的荣誉', type: 'HonorView', icon: 'icon-honor', bg: '#e89d79', color: '#f10' },
    { title: '我的服务', type: 'ServiceView', icon: 'icon-service', bg: '#25e25f', color: 'green' },
    { title: '我的热评', type: 'Comment', icon: 'icon-comment', bg: '#36985d', color: 'yellow' },
    { title: '任务列表', type: 'TaskView', icon: 'icon-task', bg: '#ec2915', color: 'pink' },
    { title: '我的客户', type: 'CustomView', icon: 'icon-user', bg: '#0fc70f', color: 'blue' },
    { title: '我的团队', type: 'TeamView', icon: 'icon-team', bg: '#5ce2b0', color: '#ccc' },
    { title: '我的业绩', type: 'AchievementView', icon: 'icon-achievement', bg: '#f2e169', color: '#999' }
  ]
  private changeView (type: any) {
    this.$emit('change', type)
  }
}
</script>
<style lang="scss" scoped>
.menu-content {
  // display: flex;
  .menu-item {
    padding: 20px 0px;
    margin-bottom: 15px;
    // width: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
}

</style>
