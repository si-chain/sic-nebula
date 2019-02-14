<template>
  <div class="aside">
    <div class="icon-menu"><img class="user-avatar" width="30" src="../assets/logo.png"></div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      default-active="0"
      :collapse="isCollapse"
      background-color="#413d3d"
      text-color="#ffffff"
      active-text-color="#413d3d">
      <template v-for="(item,index) in $router.options.routes">
        <!-- <el-submenu v-if="item.meta.leaf && item.meta.show" :index="index + ''">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="(child,inx) in item.children" :key="inx">
            <router-link :to="child.path">
              <el-menu-item :index="index + '-' + inx" v-if="child.meta.show">{{child.name}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu> -->
        <router-link :to=" item.path" v-if="item.meta.show">
          <el-menu-item :index="index + ''" >
              <i class="iconfont" :class="item.meta.icon"></i>
              <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class LeftMenu extends Vue {
  private defaultPath = ''
  private defaultOpen: string[] = []
  private isOpend: boolean = false

  private get isCollapse (): boolean {
    return !this.$store.state.app.sidebar.opend
  }
  @Watch('$route')
  private routeChange (val: any) {
    const that = this
    this.$store.state.app.router.options.routes.map( async (item: any) => {
      if (item.name === val.name && item.children) {
        await that.$store.dispatch('app/setSubMenu', item.children)
        this.$router.push(`${item.children[0].path}`)
        return
      } else if (item.name === val.name && !item.children) {
        await that.$store.dispatch('app/setSubMenu', [])
      }
    })
  }
}
</script>
<style lang="scss">
@import "../assets/scss/variable.scss";

.icon-menu {
  height: 49px;
  color: green;
  width: 100%;
  background-color: #413d3d;
  img {
    margin-top: 10px;
  }
}
.el-menu-item.is-active {
    background-color: #ffffff!important;
    border-left: 1px solid $bg-color;
}
.el-menu-item {
  .iconfont {
    color: #ffffff;
    // font-size: 20px;
  }
}
.is-active {
  .iconfont {
    color: green!important;
  }
  .menuitem {
    color: green!important;
  }
}
</style>

