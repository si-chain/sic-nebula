<template>
  <div class="session-list">
    <WechatLeftView class="left-box"></WechatLeftView>
    <div class="right-box">
      <div v-if="$store.state.wxtool.viewType === 'chat'">
        <div class="form" id="session-list-form">
          <el-form ref="form" :inline="true" :model="formOptions" label-width="80px">
            <el-form-item label="消息类型">
              <el-select size="mini" v-model="formOptions.msgType" placeholder="请选择">
                <el-option label="文本" value="1"></el-option>
                <el-option label="图片" value="3,47"></el-option>
                <el-option label="语音" value="34"></el-option>
                <el-option label="视频" value="43,62"></el-option>
                <el-option label="文件" value="49"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input size="mini" v-model="formOptions.content"></el-input>
            </el-form-item>
            
            <el-form-item v-if="!showMore">
              <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="text" @click="More">{{showMore ? '隐藏' : '更多'}}</el-button>
            </el-form-item>
            <transition name="el-zoom-in-top">
              <div v-if="showMore" class="transition-box">
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="formOptions.startDate"
                    value-format="yyyy-MM-dd HH:mm:SS"
                    type="datetime"
                    size="mini"
                    placeholder="开始时间">
                  </el-date-picker>至
                  <el-date-picker
                    v-model="formOptions.endDate"
                    value-format="yyyy-MM-dd HH:mm:SS"
                    type="datetime"
                    size="mini"
                    placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </div>
            </transition>   
          </el-form>
        </div>
        <div class="view-box">
          <div class="record-view" id="record-view" :style="{height: formHeight}">
            <div class="record-item" v-for="item in chatRecord" :key="item.id">
              <p class="header">
                <span class="time">{{item.createDate | format('yyyy-MM-dd hh.mm')}}</span>
                <span class="fromNickName">{{item.fromNickName}}</span>
              </p>
              <div class="item-content">
                <div class="head-box">
                  <img :src="item.fromHeadImgUrl" alt="item.fromNickName">
                </div>
                <div class="msg-box">
                  <p class="msg" v-if="item.msgType === 1" v-html="item.content"></p>
                  <img class="msg" width="300" :src="item.content" v-if="item.msgType === 3 || item.msgType === 47"></img>
                  <audio ref="audio" 
                    v-if="item.msgType === 34"
                    :src="item.content" controls="controls"></audio>
                  <video v-if="item.msgType === 62 || item.msgType === 43" width="500" hei :src="item.content" controls="controls"></video>
                  <p class="msg" v-if="item.msgType === 49">
                    <a target="_black" :href="item.content" download="test.txt">文件</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$store.state.wxtool.viewType === 'info'">
        <div class="friend-info">
          <div class="friend-info-header">
            <div class="left-box-info">
              <p class="nickName" v-if="infoView.remarkName">备注：{{infoView.remarkName}}</p>
              <p class="nickName">昵称：<span v-html="infoView.nickName"></span></p>
              <p class="pyInitial" v-if="infoView.pyInitial">昵称拼音：{{infoView.pyInitial}}</p>
            </div>
            <div class="header-box">
              <img :src="infoView.headImgUrl" alt="">
            </div>
          </div>
          <div class="info-bady">
            <p>性别：{{infoView.sex === 1 ? '男' : '女'}}</p>
            <p>地址：{{infoView.province + infoView.city || '-'}}</p>
            <p>签名：<span v-html="infoView.signature"></span></p>
            <p>好友来源：{{infoView.source || '-' }}</p>
          </div>
        </div>
      </div>
      <div v-if="$store.state.wxtool.viewType === 'tag'">
        标签信息
      </div>
      <div v-if="$store.state.wxtool.viewType === 'group'">
        <div class="group-user-box">
          <h2>{{$store.state.wxtool.groupName}}</h2>
          <div class="group-user-item" v-for="item in GroupUsers" :key="item.nickName">
            <img :src="item.headImgUrl" alt="">
            <p class="nickName" v-html="item.nickName"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import WechatLeftView from './components/leftView.vue'
import VueVideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css'

@Component({
  components: {
    WechatLeftView,
    VueVideoPlayer
  }
})
export default class SessionList extends Vue {
  private showMore: boolean = false
  private formHeight: string = 'calc(100vh - 115px)'
  private get chatRecord () {
    return this.$store.state.wxtool.chatRecord
  }
  private formOptions: any = {
    current: 1,
    size: 20,
    msgType: '',
    startDate: '',
    endDate: '',
    content: ''
  }
  @Watch('$store.state.wxtool.fromId')
  private formIdChange () {
    this.formOptions = {
      current: 1,
      size: 20,
      msgType: '',
      startDate: '',
      endDate: '',
      content: ''
    }
  }
  @Watch('chatRecord')
  private chatRecordChange () {
    this.$nextTick( () => {
      if (this.$store.state.wxtool.viewType === 'chat') {
        const dom: any = document.getElementById('record-view')
        dom.scrollTop = dom.scrollHeight || 0
      }
    })
  }
  @Watch('showMore')
  private changeshowMore () {
    setTimeout(() => {
      const dom: any = document.getElementById('session-list-form')
      this.formHeight = `calc(100vh - ${dom.scrollHeight}px - 53px)`
    }, 500)
  }
  // @Watch('$store.state.wxtool.viewType')
  // private viewTypeChange (val: string) {
  //   switch (val) {
  //     case 'chat':
  //       this.chatView()
  //       break
  //     case 'info':
  //       console.log('info')
  //       break
  //     default:
  //       break
  //   }
  // }
  private get GroupUsers () {
    return this.$store.state.wxtool.groupUser
  }
  private get queryOption () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid,
      chatRecordType: this.$store.state.wxtool.RecordType,
      fromId: this.$store.state.wxtool.fromId,
      groupMemberIds: ''
    }
  }
  private get infoView () {
    return this.$store.state.wxtool.firendInfo
  }
  private More () {
    this.showMore = !this.showMore
  }
  // 获取聊天记录
  private async chatView () {
    if (!this.$store.state.user.userInfo.cid) {
      const userInfo = await this.$store.dispatch('user/getUserInfo')
    }
    const queryOption = {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
    const logged = await this.$store.dispatch('wxtool/IsLogged', queryOption)
    if (logged.data.length <= 0) {
      this.$router.push('/wxtool/login')
    }
  }
  private async mounted () {
    // todo 
  }
  // 条件查询
  private onSubmit () {
    // todo
    const query = Object.assign(this.queryOption, this.formOptions)
    this.$store.dispatch('wxtool/wechatChatRecordList', this.queryOption)
  }
}
</script>
<style lang="scss" scoped>
.session-list {
  font-size: 14px;
  height: 100%;
  display: flex;
  .left-box {
    width: 250px;
    height: 100%;
  }
  .right-box {
    flex: 1;
    height: 100%;
    position: relative;
    border: 1px solid #ccc;
    overflow-y: hidden;
    .form {
      background: #ffffff;
      padding-top: 10px;
      border-bottom: 1px solid #ccc;
    }
    .record-view {
      width: 100%;
      height: calc(100vh - 100px);
      overflow-y: auto;
    }
  }
  .record-item {
    padding: 20px 0 0 20px;
    text-align: left;
    .header {
      font-size: 14px;
      color: #43b80d;
      margin-bottom: 5px;
      span {
        margin-right: 20px;
      }
    }
    .item-content {
      display: flex;
      .head-box {
        width: 60px;
        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
        }
      }
      .msg-box {
        flex: 1;
        .msg {
          font-size: 16px;
          display: inline-block;
          background: #ccc6;
          max-width: 70%;
          padding: 10px;
          color: #999999;
          border-radius: 10px;
        }
      }
    }
  }
  .friend-info {
    padding: 60px;
    .info-bady {
      text-align: left;
      margin-left: 23%;
      line-height: 3;
      color: #999;
    }
  }
  .friend-info-header {
    display: flex;
    padding: 30px 0;
    // border-bottom: 1px solid #ccc6;
    .left-box-info {
      flex: 1;
      p {
        margin-top: 20px;
      }
      .nickName {
        font-size: 22px;
        font-weight: 600;
      }
    }
    .header-box {
      flex: 1;
    }
  }
  .group-user-box {
    overflow-y: auto;
    height: calc(100vh - 52px);
    h2 {
      padding: 20px 0;
      text-align: left;
      margin-left: 20px;
    }
    .group-user-item {
      float: left;
      width: 100px;
      margin:0 0 15px;
      img {
        width: 80px;
        height: 80px;
      }
      .nickName {
        line-height: 1.5;
        width: 90px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

