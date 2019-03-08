<template>
  <div class="user-center">
    <!-- <title-item class="help-item-title-left" backgroundColor="#67c23a" name="个人中心" fontSize="12px"></title-item> -->
    <div class="user-content">
      <div class="user-header">
        <div class="img">
          <img src="../../assets/logo.png" width="60" height="60" alt="">
          <p>{{userType === '1' ? 'qike.zhang@baodanyun-inc.com' : userType === '2' ? 'yanping.li@baodanyun-inc.com' : 'boyu.zhang@baodanyun-inc.com'}}</p>
        </div>
        <div class="info">
          <div class="id">
            🆔: {{userType === '1' ? '348912' : userType === '2' ? '678561' : '865613'}}
          </div>
          <div class="register">
            注册时间: {{userType === '1' ? '2017-11-12' : userType === '2' ? '2018-01-15' : '2018-01-15'}}
          </div>
        </div>
      </div>
      <div class="user-content">
        <!-- <div class="user-content-item user-content-left">
          <p>Lv: 9 <i v-for="i in 3" :key="i">🌛</i></p>
          <p>我的设备: 📱 </p>
          <p style="display: flex;">我的勋章:  <el-rate v-model="medal" disabled :max="3"></el-rate></p>
        </div> -->
        <div class="user-content-item user-content-right">
          <transition name="component-fade" mode="out-in">
            <component v-if="type !== 'Comment'" :is="currentView" @change="viewChange"></component>
          </transition>
          <transition name="fade">
            <Comment v-if="type === 'Comment'" :showTitle="type === 'Comment'"  @change="viewChange"></Comment>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserMenu from './components/menu.vue'
import Comment from './components/comment.vue'
import ServiceView from './components/service.vue'
import HonorView from './components/honor.vue'
import TeamView from './components/team.vue'
import CustomView from './components/custom.vue'
import AchievementView from './components/achievement.vue'
import TaskView from './components/task.vue'


@Component({
  components: {
    UserMenu,
    Comment,
    ServiceView,
    HonorView,
    TeamView,
    CustomView,
    AchievementView,
    TaskView
  }
})
export default class UserCenter extends Vue {
  // private view: stirng = 'menu'
  private medal: number = 3
  private type: string = 'UserMenu'
  private get currentView () {
    return this.type
  }
  private get userType () {
    return this.$store.state.user.userType
  }
  private change (val: number) {
    console.log(val)
  }
  private viewChange (viewType: any) {
    this.type = viewType
  }
}
</script>
<style lang="scss">
.user-content {
  .user-header {
    img {
      border: 1px solid #cccc66;
      border-radius: 50%;
    }
    p {
      font-size: 14px;
      line-height: 30px;
      font-weight: 700;
    }
    .info {
      display: flex;
      justify-content: space-between;
      width: 37%;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .user-content {
    display: flex;
    padding-top: 10px;
    .user-content-left {
      width: 180px;
      padding: 15px 0 0 10px;
      p {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        line-height: 30px;
        .icon-moon {
          color: rgb(247, 186, 42);
        }
        .el-rate {
          margin-left: 10px;
          line-height: 40px;
        }
      }
    }
    .user-content-right {
      flex: 1;
      margin-left: 20px;
    }
  }
}

.menu-item-head {
  display: flex;
  justify-content: space-between;
  line-height: 23px;
  padding-bottom: 10px;
  .el-icon-back {
    color: green;
    font-weight: 700;
    margin-right: 20px;
    cursor: pointer;
  }
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
