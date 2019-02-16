<template>
  <div class="menu-hot-comment">
    <div class="menu-item-head" v-if="showTitle">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="我的热评" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div class="comment-item clearfix"> 
      <div class="left-comment comment clearfix">
        <div class="box">
          <div class="img">
            <img src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephHUWcyiaicIvPicbqzYNWwqx3pWhVp7XdLqSIsmoJLAqZOhV5kLUDatws0wEVf1Y6bGYJzNgoXZ7uw/132" />
          </div>
          <div>
            <p>💥小超人</p>
            <el-rate v-model="value"></el-rate>
            <div class="msg">小白重疾真不错</div>
          </div>
        </div>
        <div class="box" v-if=" userType === '2'">
          <div class="img">
            <img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJMSsWsRX41Hq5A19Nrab09uwjIpeql8dbrqSIb6sWS9XEGLkUd9tia5xJ7Glnc69felzfM8Y69whA/132" />
          </div>
          <div>
            <p>闪</p>
            <el-rate v-model="value"></el-rate>
            <div class="msg">车险服务很到位</div>
          </div>
        </div>
      </div>
      <div class="right-comment comment clearfix">
        <div class="box" v-if="userType === '3' ">
          <div class="img">
            <img src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erW6V8Dic3C7ibDnQvK4hOke3M4I27kG1E57JoT3KUQgWTsFqxNfGr9OsrarcGKFQ6YZTCQDT6WDhOA/132" />
          </div>
          <div>
            <p>Jida~</p>
            <el-rate v-model="value"></el-rate>
            <div class="msg">认真负责，万能代理人</div>
          </div>
        </div>
        <div class="box" v-if="userType === '2'">
          <div class="img">
            <img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIoyBFTZpJLf2u6JShu2vw9fMyf8VrhZXPbCdzkGlia486BXcFQEn4RVdebWWqk1wjca9zUibUuhQiag/132" />
          </div>
          <div>
            <p>安于现状</p>
            <el-rate v-model="value1"></el-rate>
            <div class="msg">我的钱怎么还没到账</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Comment extends Vue {
  @Prop({ default: false })
  private showTitle!: boolean
  private value: number = 5
  private value1: number = 1
  private get userType () {
    return this.$store.state.user.userType
  }
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
    display: flex;

    .comment {
      flex: 1;
    }
    .box {
      margin: 15px 0;
      display: flex;
      .img {
        width: 80px;
        display: flex;
        align-items:center;
        img {
          display: inline-block;
          width: 40px;
          height: 40px;
          margin-left: 30px;
          border-radius: 50%;
          border: 1px solid #ccc6;
          background: #f10;
        }
      }
    }
  }
}
</style>
