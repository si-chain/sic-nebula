<template>
  <div class="session-list">
    <WechatLeftView class="left-box"></WechatLeftView>
    <div class="right-box">
      <div v-if="$store.state.wxtool.viewType === 'chat'">
        <div class="form" id="session-list-form">
          <el-form ref="form" :inline="true" :model="formOptions" label-width="80px">
            <el-form-item label="消息类型">
              <el-select size="mini" v-model="formOptions.msgType" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
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
            <el-button v-if="messageFlag" type="infor" size="mini" @click="addMore">加载更多</el-button>
            <div class="record-item" v-for="item in chatRecord" :key="item.id">
              <p class="header">
                <span class="time">{{item.createDate | format('yyyy-MM-dd hh.mm')}}</span>
                <span class="fromNickName" v-html="item.fromNickName"></span>
              </p>
              <div class="item-content">
                <div class="head-box">
                  <img :src="item.fromHeadImgUrl" :onerror="errorImg" :alt="item.fromNickName">
                </div>
                <div class="msg-box">
                  <div class="msg" v-if="item.msgType === 1" v-html="item.content"></div>
                  <img class="msg" width="300" :src="item.content" :onerror="errorImg" v-if="item.msgType === 3 || item.msgType === 47"></img>
                  <audio ref="audio" 
                    v-if="item.msgType === 34"
                    :src="item.content" controls="controls"></audio>
                  <video v-if="item.msgType === 62 || item.msgType === 43" width="500" controls="controls" preload="none">
                    <source :src="item.content" type="video/mp4">
                  </video>
                  <p class="msg" v-if="item.msgType === 49">
                    <a target="_black" :href="item.content" download="test.txt">多媒体消息 点击查看详情</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="send-msg">
            <div class="send-tool">
              <div class="input-box">
                <el-upload
                  :http-request="handleUpload"
                  :limit="1"
                  action
                  :file-list="fileList"
                  :show-file-list="false"
                  class="upload-demo"
                >
                  <span class="iconfont icon-file-upload"></span>
                </el-upload>
                <el-upload
                  :http-request="handleUpload"
                  :limit="1"
                  action
                  :file-list="fileList"
                  :show-file-list="false"
                  class="upload-demo"
                >
                  <span class="iconfont icon-image"></span>
                </el-upload>
              </div>
            </div>
            <div class="send-input">
              <!-- <input type="textarea" > -->
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容,回车发送消息"
                v-model="sendMsg"></el-input>
                <el-button type="success" class="send-btn" @click="onSendMsg(1, sendMsg)" size="mini">发送</el-button>
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
              <img :src="infoView.headImgUrl" :onerror="errorImg" alt="">
            </div>
          </div>
          <div class="info-bady">
            <p>性别：{{infoView.sex === 1 ? '男' :infoView.sex === 2 ? '女' : '未知'}}</p>
            <p>地址：{{infoView.province + infoView.city || '-'}}</p>
            <p>签名：<span v-html="infoView.signature"></span></p>
            <p>好友来源：{{infoView.source || '-' }}</p>
            <el-button type="success" size="mini" @click="addFriendSend(infoView)">发消息</el-button>
          </div>
        </div>
      </div>
      <div v-if="$store.state.wxtool.viewType === 'tag'">
        <div class="group-user-box">
          <div class="header clearfix">
            <h2>{{$store.state.wxtool.friendTagName}}</h2>
            <el-button type="success" size="mini" style="margin: 20px;" @click="addTagUser">添加成员</el-button>
            <el-button type="danger" size="mini" style="margin: 20px;" @click="moveTag">删除</el-button>
          </div>
          <div class="group-user-item" v-for="item in friendTagList" :key="item.nickName">
            <img :src="item.friendHeadImgUrl" :onerror="errorImg" alt="">
            <p class="nickName" v-html="item.friendNickName"></p>
          </div>
        </div>
      </div>
      <div v-if="$store.state.wxtool.viewType === 'group'">
        <div class="group-user-box">
          <h2>{{$store.state.wxtool.groupName}}</h2>
          <div class="group-user-item" v-for="item in GroupUsers" :key="item.nickName">
            <el-tooltip placement="bottom">
              <div slot="content">
                <p v-html="item.nickName"></p>
                <p>群昵称：<span v-html="item.displayName"></span></p>
                <p v-if="item.source">来源：<span v-html="item.source"></span></p>
                标签：<el-tag size="mini" v-for="tag in item.tagList" :key="tag.id" type="success">{{tag.answer}}</el-tag>

              </div>
              <img :src="item.headImgUrl" :onerror="errorImg" alt="">
            </el-tooltip>
            <div style="height: 50px;">
              <p class="nickName" v-html="item.nickName" style=""></p>
              <el-tag size="mini" v-for="tag in item.tagList" :key="tag.id" type="success">{{tag.answer}}</el-tag>
            </div>
            
            <p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import WechatLeftView from './components/leftView.vue'
import Cuoss from 'cuoss'

@Component({
  components: {
    WechatLeftView
  }
})
export default class SessionList extends Vue {
  private showMore: boolean = false
  private sendMsg: string = ''
  private errorImg: string = `this.src="${require('../../assets/none-avater.jpeg')}"`
  private fileList: any[] = []
  private formHeight: string = 'calc(100vh - 115px - 160px)'
  private pageSize: number = 20
  private get chatRecord () {
    return this.$store.state.wxtool.chatRecord
  }
  private get friendTagList () {
    return this.$store.state.wxtool.friendTagList
  }
  private formOptions: any = {
    current: 1,
    size: 100,
    msgType: '',
    startDate: '',
    endDate: '',
    content: ''
  }
  @Watch('$store.state.wxtool.fromId')
  private formIdChange () {
    this.formOptions = {
      current: 1,
      size: 100,
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
      this.formHeight = `calc(100vh - ${dom.scrollHeight}px - 53px - 160px)`
    }, 500)
  }
  @Watch('fromId')
  private fromIdChange () {
    this.pageSize = 20
  }
  private get GroupUsers () {
    return this.$store.state.wxtool.groupUser
  }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private get fromId () {
    return this.$store.state.wxtool.fromId
  }
  private get messageFlag () {
    return this.$store.state.wxtool.messageFlag
  }
  private get queryOption () {
    return {
      ...this.params,
      chatRecordType: this.$store.state.wxtool.RecordType,
      fromId: this.$store.state.wxtool.fromId,
      groupMemberIds: '',
      size: this.pageSize
    }
  }
  private get infoView () {
    return this.$store.state.wxtool.firendInfo
  }
  private More () {
    this.showMore = !this.showMore
  }
  private created () {
    const that = this
    document.onkeyup = (e: KeyboardEvent) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        that.onSendMsg(1, this.sendMsg)
      }
    }
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
    this.chatView()
  }
  // 条件查询
  private onSubmit () {
    // todo
    const query = Object.assign(this.queryOption, this.formOptions)
    this.$store.dispatch('wxtool/wechatChatRecordList', this.queryOption)
  }
  // 删除tag
  private async moveTag () {
    const data = await this.$store.dispatch('wxtool/wechatDeleteSingle')
    if (data.errcode === 200) {
      this.$notify({
        title: '提示',
        message: `${this.$store.state.wxtool.friendTagName}标签，已删除`,
        type: 'success'
      })
      const list = await this.$store.dispatch('wxtool/getSingleList', {
        ...this.params,
        type: 3,
        size: 100
      })
      this.$store.commit('wxtool/SET_FRIENDTAGNAME', list[0].answer || '')
      await this.$store.dispatch('wxtool/wechatFriendTagList', {
        ...this.params,
        size: 100,
        tagId: this.$store.state.wxtool.singleList[0].id
      })
    } else {
      this.$notify({
        title: '提示',
        message: `${this.$store.state.wxtool.friendTagName}标签，因${data.data}删除失败`,
        type: 'error'
      })
    }
  }
  // 添加标签成员
  private addTagUser () {
    // todo
  }
  private async onSendMsg (msgType: number, msg: string) {
    const data = await this.$store.dispatch('wxtool/sendMessage', {
      ...this.params,
      ...this.$store.state.wxtool.sendMsgUser,
      'msgType': msgType,
      content: msg
    })
    if (data.errcode === 200) {
      this.sendMsg = ''
      await this.$store.dispatch('wxtool/wechatChatRecordList', this.queryOption)
    }
  }
  // 获取更多聊天记录
  private async addMore () {
    this.pageSize += 10
    await this.$store.dispatch('wxtool/wechatChatRecordList', this.queryOption)
  }
  // 判断文件类型
  private checkFileType (file: File) {
    if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
      return 'file'
    } else {
      return 'image'
    }
  }
  // 发送文件信息
  private handleUpload (files: any) {
    const filetype = this.checkFileType(files.file)
    const cuoss = new Cuoss({
      type: 'public',
      baseURL: '/api'
    })
    const that = this
    cuoss.upload(files.file, {
      parseFail (error: any) {
        that.$message.error(error)
      },
      uploadSuccess (res: any) {
        that.onSendMsg(filetype === 'file' ? 49 : 3, res.url)
        that.fileList = []
      },
      uploadProgress (progress: any) {
        that.$notify.success({
          title: `${progress < 100 ? '文件发送中' : '发送成功'}`,
          message: `${progress < 100 ? `文件进度${progress}%` : '发送成功'}`
        })
      },
      uploadFail (error: any) {
        that.$notify.error({
          title: '失败',
          message: error.toString()
        })
      },
      parseProgress (res: any) {
        // 解析文件
      },
      parseSuccess (md5: any) {
        // 解析成功
      }
    })
  }
  // 添加好友聊天
  private async addFriendSend (user: any) {
    this.$store.commit('wxtool/SET_SENDMSGUSER', {
      chatRecordType: 1,
      toId: user.id,
      wechatUserId: user.wechatUserId
    })
    this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
    await this.$store.dispatch('wxtool/wechatChatRecordList', {
      ...this.params,
      chatRecordType: this.$store.state.wxtool.sendMsgUser.chatRecordType,
      wechatUserId: this.$store.state.wxtool.sendMsgUser.wechatUserId,
      fromId: this.$store.state.wxtool.sendMsgUser.toId
    })
  }
}
</script>
<style lang="scss" scoped>
.session-list {
  font-size: 14px;
  height: 100%;
  display: flex;
  text-align: center;
  .left-box {
    width: 250px;
    height: 100%;
  }
  .send-msg {
    height: 160px;
    border-top: 1px solid #ccc;
    text-align: left;
    .send-tool {
      height: 36px;
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
      .input-box {
        display: flex;
        .upload-demo {
          margin-right: 10px;
        }
      }
      span {
        font-size: 22px;
        cursor: pointer;
      }
    }
    .send-input {
      height: 110px;
      width: 100%;
      position: relative;
      input {
        width: 100%;
      }
      .send-btn {
        position: absolute;
        right: 10px;
        bottom: 5px;
      }
      >>>.el-textarea__inner {
        border: none;
      }
    }
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
      padding: 10px 0;
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
          max-width: 50%;
          padding: 10px;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
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
    .header {
      .el-button {
        float: right
      }
    }
    h2 {
      padding: 20px 0;
      // float: left;
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
  .el-upload-list {
    display: none!important;
  }
}
</style>

