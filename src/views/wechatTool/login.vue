<template>
  <div class="wechat-login">
    <img :src="scan" alt="">
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class WechatLogin extends Vue {
  private scan: string = ''
  private timer: any = undefined
  private async created () {
    const params = {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
    const data = await this.$store.dispatch('wxtool/getWechatQRscan', params)
    this.scan = data.data.wxQrcode
    this.isLogin()
  }
  private isLogin () {
    if (this.$store.state.app.timer) {
      clearInterval(this.$store.state.app.timer)
      this.$store.commit('app/SET_TIMER', undefined)
      this.isLogin()
    } else {
      this.$store.commit('app/SET_TIMER', setInterval(async () => {
        const data = await this.$store.dispatch('wxtool/IsLogin')
        if (data.data === '登陆成功') {
          setTimeout( () => {
            this.$router.push('/wxtool/session-list')
            this.$store.commit('app/SET_TIMER', undefined)
          }, 1500)
        }
      }, 3000))
    }
  }
  // private beforeDestroy () {
  //   if (this.timer) {
  //     clearInterval(this.timer)
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.session-list {
  font-size: 14px;
}
.wechat-login {
  text-align: center;
  display: flex;
  align-items: center;
  img {
    margin: 0 auto;
  }
}
</style>

