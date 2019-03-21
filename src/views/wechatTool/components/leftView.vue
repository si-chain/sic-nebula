<template>
  <div class="wechat-left-view" >
    <el-tabs v-model="chatName" type="card">
      <el-tab-pane label="消息汇总" name="chat">
        <div v-loading="loadData" :style="{height: ($store.state.app.viewHeight - 56) + 'px'}" class="user-list-box">
          <div class="user-item" :class="$store.state.wxtool.fromId === item.fromId ? 'is-active' : ''" v-for="item in $store.state.wxtool.chatList" :key="item.fromId" @click="showChatRecord(item)">
            <div class="headImgUrl">
              <img class="head" :src="item.headImgUrl" :onerror="errorImg" :alt="item.nickName">
            </div>
            <div class="user-info">
              <p class="title" v-html="item.remarkName || item.nickName"></p>
              <p class="msg" v-html="item.lastContent"></p>
            </div>
            <el-badge v-if="item.countUnread > 0" :value="item.countUnread"></el-badge>
          </div>
          <el-button v-if="$store.state.wxtool.userListFlag" type="infor" size="mini" @click="addMore('chatName', 'chat', 'chat')">加载更多</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="好友" name="friend">
        <el-tabs v-model="friendName">
          <el-tab-pane label="联系人" name="contacts">
            <div v-loading="loadData" :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in $store.state.wxtool.chatList" :class="$store.state.wxtool.fromId === item.fromId ? 'is-active' : ''" :key="item.fromId" @click="showChatRecord(item)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :onerror="errorImg" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.remarkName || item.nickName"></p>
                  <p class="msg" v-html="item.lastContent"></p>
                </div>
                <el-badge v-if="item.countUnread > 0" :value="item.countUnread"></el-badge>
              </div>
              <el-button v-if="$store.state.wxtool.userListFlag" type="infor" size="mini" @click="addMore('friendName', 'contacts', 'contacts')">加载更多</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="好友" name="friend">
            <div v-loading="loadData" :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in userList" :class="$store.state.wxtool.firendInfo.nickName === item.nickName ? 'is-active' : ''" :key="item.fromId" @click="showFriendInfo(item)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :onerror="errorImg" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.remarkName || item.nickName"></p>
                  <p class="msg">
                    <el-tag size="mini" v-for="tag in item.tagList" :key="tag.id" type="success">{{tag.answer}}</el-tag>
                  </p>
                </div>
              </div>
              <el-button v-if="$store.state.wxtool.userListFlag" type="infor" size="mini" @click="addMore('friendName', 'friend', 'friend')">加载更多</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="群聊" name="group">
        <el-tabs v-model="activeGroup">
          <el-tab-pane label="最近群聊" name="tag">
            <div v-loading="loadData" :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in $store.state.wxtool.chatList" :class="$store.state.wxtool.groupName === item.nickName ? 'is-active' : ''" :key="item.fromId" @click="getGroupUsers(item.fromId, item.nickName)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :onerror="errorImg" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.nickName"></p>
                  <p class="msg" v-html="item.lastContent"></p>
                </div>
              </div>
              <el-button v-if="$store.state.wxtool.userListFlag" type="infor" size="mini" @click="addMore('activeGroup', 'tag', 'tag')">加载更多</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="所有群聊" name="tags">
            <div v-loading="loadData" :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in $store.state.wxtool.groupList" :class="$store.state.wxtool.groupName === item.nickName ? 'is-active' : ''" :key="item.id" @click="getGroupUsers(item.id, item.nickName)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :onerror="errorImg" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.nickName"></p>
                  <p class="msg" v-html="item.lastContent"></p>
                </div>
              </div>
              <el-button v-if="$store.state.wxtool.userListFlag" type="infor" size="mini" @click="addMore('activeGroup', 'chat', 'chat')">加载更多</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class WchatLeftView extends Vue {
  private chatName: string = 'chat'
  private friendName: string = 'contacts'
  private activeGroup: string = 'tag'
  private errorImg: string = `this.src="${require('../../../assets/none-avater.jpeg')}"`
  private userList: any[] = []
  private pageSize: number = 15
  private currentPage: number = 1
  private timer: any = undefined
  private loadData: boolean = false
  private get params () {
    return {
      current: this.currentPage,
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  // 汇总 好友 群聊
  @Watch('chatName')
  private async chatNameChange (val: string, old?: string) {
    if (val !== old) {
      this.pageSize = 15
    }
    this.loadData = true
    const size = 15
    switch (val) {
      case 'chat':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        const data = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          size: val === old ? this.pageSize : size
        })
        this.showChatRecord(data.data.records[0])
        break
      case 'friend':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        const chatList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          size: val === old ? this.pageSize : size,
          chatRecordType: 1
        })
        this.showChatRecord(chatList.data.records[0])
        this.friendName = 'contacts'
        break
      case 'group':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'group')
        this.activeGroup = 'tag'
        const groupList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          size: val === old ? this.pageSize : size,
          chatRecordType: 2
        })
        await this.getGroupUsers(groupList.data.records[0].fromId, groupList.data.records[0].nickName)
        break
      default:
        break
    }
    this.loadData = false
  }
  // 联系人 好友 标签
  @Watch('friendName')
  private async friendNameChange (val: string, old?: string) {
    if (val !== old) {
      this.pageSize = 15
    }
    this.loadData = true
    const size = 15
    switch (val) {
      case 'contacts':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        const chatList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          size: val === old ? this.pageSize : size,
          chatRecordType: 1
        })
        this.showChatRecord(chatList.data.records[0])
        break
      case 'friend':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'info')
        const data = await this.$store.dispatch('wxtool/getfriends', {
          ...this.params,
          size: val === old ? this.pageSize : size,
          current: 1
        })
        this.userList = data.data.records
        this.$store.commit('wxtool/SET_FRIENDINFO', data.data.records[0])
        this.activeGroup = 'tag'
        break
      default:
        break
    }
    this.loadData = false
  }
  // 群聊
  @Watch('activeGroup')
  private async activeGroupChange (val: string, old?: string) {
    if (val !== old) {
      this.pageSize = 15
    }
    this.loadData = true
    const size = 15
    switch (val) {
      case 'tag':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'group')
        const groupList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          size: val === old ? this.pageSize : size,
          chatRecordType: 2
        })
        this.getGroupUsers(groupList.data.records[0].fromId, groupList.data.records[0].nickName)
        break
      default:
        const groupaAllList = await this.$store.dispatch('wxtool/wechatGroupList', {
          ...this.params,
          size: 100
        })
        this.getGroupUsers(groupaAllList.data.records[0].id, groupaAllList.data.records[0].nickName)
        break
    }
    this.loadData = false
  }
  private async addMore (type: string, val: string, old: string) {
    this.pageSize += 15
    switch (type) {
      case 'chatName':
        this.chatNameChange(val, old)
        break
      case 'friendName':
        this.friendNameChange(val, old)
        break
      case 'activeGroup':
        this.activeGroupChange(val, old)
        break
      default:
        break
    }
  }
  private async mounted () {
    const params = {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
    const logged = await this.$store.dispatch('wxtool/IsLogged', params)
    if (logged.data.length <= 0) {
      this.$router.push('/wxtool/login')
    }
    this.loadData = true
    const data = await this.$store.dispatch('wxtool/wechatChatListList', {
      ...params,
      size: this.pageSize
    })
    this.loadData = false
    this.showChatRecord(data.data.records[0])
    this.$store.commit('app/SET_TIMER', setInterval(async () => {
      if (this.chatName === 'chat') {
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          size: this.pageSize
        })
      } else if (this.friendName === 'contacts' && this.chatName === 'friend') {
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          size: this.pageSize,
          chatRecordType: 1
        })
      }
    }, 5000))
  }
  /**
   * @description: 获取单个好友或者群的聊天记录
   */
  private async showChatRecord (item: any) {
    const params = {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid,
      chatRecordType: item.chatRecordType,
      fromId: item.fromId,
      size: 20
    }
    this.$store.commit('wxtool/SET_SENDMSGUSER', {
      chatRecordType: item.chatRecordType,
      toId: item.fromId,
      wechatUserId: item.wechatUserId
    })
    await this.$store.dispatch('wxtool/wechatChatRecordList', params)
  }
  /**
   * @description: 请求群成员
   */
  private async getGroupUsers (id: string, name: string) {
    await this.$store.dispatch('wxtool/wechatGroupMemberList', {groupID: id})
    this.$store.commit('wxtool/SET_GROUPNAME', name)
  }
  // 获取好友信息
  private showFriendInfo (item: any) {
    this.$store.commit('wxtool/SET_VIEWTYPE', 'info')
    this.$store.commit('wxtool/SET_FRIENDINFO', item)
  }
  private beforeDestroy () {
    if (this.$store.state.app.timer) {
      clearInterval(this.$store.state.app.timer)
    }
  }
}
</script>
<style lang="scss" scoped>
.wechat-left-view {
  height: 100%;
  overflow-y: hidden;
  text-align: center;
  .user-list-box {
    overflow-y: auto;
  }
  .user-item {
    display: flex;
    margin-bottom: 5px;
    border: 1px solid #FFFFFF;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    .headImgUrl {
      width: 55px;
      display: flex;
      align-items: center;
      height: 60px;
      justify-content: left;
      padding-left: 5px;
      .head {
        height: 50px;
        width: 50px;
      }
    }
    .el-badge {
      line-height: 60px;
    }
    .user-info {
      p {
        text-align: left;
        margin: 3px 0 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 130px;
      }
      .title {
        font-size: 18px;
      }
      .msg {
        font-size: 16px;
      }
    }
  }
  .user-item:hover {
    border: 1px solid #ccc6
  }
  .tag-box {
    margin-bottom: 10px;
    .tag-item {
      padding: 4px 0;
      margin: 0 20px;
      border: 1px solid #ccc6;
      border-radius: 5px;
      margin-bottom: 8px;
      cursor: pointer;
    }
  }
}
.el-tabs__header {
  margin: 0;
}
.is-active {
  border: 1px solid #67C23A!important;
}
</style>
