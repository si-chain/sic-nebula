<!--
 * @Author: jhd
 * @Date: 2019-01-15 10:43:58
 * @Description: layout file
 -->

<template>
  <div :class="classObject" class="app-wrapper">
    <LeftMenu class="sidebar-container"></LeftMenu>
    <div class="main-container" >
      <NavBar></NavBar>
      <el-row :gutter="2">
        <el-col :span="2" v-if="subMenu.length > 0">
          <div class="submenu app-container-item">
            <h5 v-if="$store.state.user.userType === '1'" style="line-height: 44px;">数据中心</h5>
            <h5 v-else-if="$store.state.user.userType === '4'" style="line-height: 44px;"></h5>
            <!-- <h5 v-else>任务中心</h5> -->
            <el-menu
              :default-active="defaultActive"
              text-color="#000000"
              active-text-color="#413d3d"
              class="el-menu-vertical-demo">
              <router-link v-for="(item, index) in subMenu" :key="index" :to="item.path" v-if="item.meta.show && !item.meta.isLink">
                <el-menu-item :class="$route.path === item.path ? 'is-active' : ''" :index="index + 1 + ''">
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </router-link>
              <a target="_black" class="custom-button" :href="item.path" v-for="(item, index) in subMenu" :key="index" v-if="item.meta.isLink">{{item.name}}</a>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="22" style="padding-left: 0!important;">
          <div class="app-container-item app-content">
            <transition name="fade-transform" mode="out-in">
              <!-- <keep-alive > -->
                <router-view ></router-view>
              <!-- </keep-alive> -->
            </transition>
          </div>  
        </el-col>
        <!-- <el-col :span="2">
          <div class="app-container-item" style="border-left:solid 1px #e6e6e6;">
            <HelpCenter name="帮助中心"></HelpCenter>
          </div>
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import NavBar from '../components/NavBar.vue'
import LeftMenu from '../components/leftMenu.vue'
import HelpCenter from '../components/helpCenter.vue'

@Component({
  components: {
    NavBar,
    LeftMenu,
    HelpCenter
  }
})
export default class Layout extends Vue {
  private defaultActive: string = '1'
  private get classObject (): object {
    return {
      hideSidebar: !this.$store.state.app.sidebar.opend,
      openSidebar: !this.$store.state.app.sidebar.opend,
      withoutAnimation: this.$store.state.app.sidebar.withoutAnimation
    }
  }
  private async mounted (): Promise<void> {
    await this.$store.dispatch('user/UserType')
    const userType = this.$store.state.user.userType
    const menu = await this.$store.dispatch('app/setRouter', this.$router)
    switch (userType) {
      case '1':
        await this.$store.dispatch('app/setSubMenu', menu.options.routes[0].children)
        break
      case '2':
        await this.$store.dispatch('app/setSubMenu', menu.options.routes[4].children)
        break
      case '3':
        await this.$store.dispatch('app/setSubMenu', menu.options.routes[5].children)
        break
      case '4':
        await this.$store.dispatch('app/setSubMenu', menu.options.routes[6].children)
        break
      case '5':
        await this.$store.dispatch('app/setSubMenu', menu.options.routes[9].children)
        break
      case '6':
        await this.$store.dispatch('app/setSubMenu', menu.options.routes[10].children)
        break
      default:
        break
    }
    this.subMenu.map( (item: any, index: number) => {
      if (item.path === this.$route.path) {
        this.defaultActive = `${index + 1}''`
      }
    })
    if (this.$route.path === '/data') {
      this.$router.push(this.subMenu[0].path)
    }
  }
  private get subMenu () {
    return this.$store.state.app.submenu
  }
  private async created () {
    const userInfo = await this.$store.dispatch('user/getUserInfo')
    this.$store.commit('app/SET_VIEWHEIGHT', document.documentElement.clientHeight - 50)
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/variable.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.app-container-item-wrap{
  display: flex;
}
.app-container-item {
  overflow-y: auto;
  height: calc(100vh - 50px);
}
.submenu{
  width: 100%;
  border-right: solid 1px #e6e6e6;
  .el-menu {
    border-right: none;
  }
  .is-active {
    background-color: $bg-color!important;
  }
}
.bg-purple {
  background: #d3dce6;
  height: 100px;
}
.app-content {
  background: #ffffff;

}
.el-col-20 {
  text-align: left;
}
.custom-button {
  color: #484545;
  padding: 20px;
}
</style>
 
