<template>
  <div class="wechat-left-view" >
    <el-tabs v-model="chatName" type="card">
      <el-tab-pane label="消息汇总" name="chat">
        <div :style="{height: ($store.state.app.viewHeight - 56) + 'px'}" class="user-list-box">
          <div class="user-item" v-for="item in userList" :key="item.fromId" @click="showChatRecord(item)">
            <div class="headImgUrl">
              <img class="head" :src="item.headImgUrl" :alt="item.nickName">
            </div>
            <div class="user-info">
              <p class="title" v-html="item.nickName"></p>
              <p class="msg" v-html="item.lastContent"></p>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="好友" name="friend">
        <el-tabs v-model="friendName">
          <el-tab-pane label="联系人" name="contacts">
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in userList" :key="item.fromId" @click="showChatRecord(item)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.nickName"></p>
                  <p class="msg" v-html="item.lastContent"></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="好友" name="friend">
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in userList" :key="item.fromId" @click="showFriendInfo(item)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.remarkName || item.nickName"></p>
                  <p class="msg" v-html="item.lastContent"></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="标签" name="tag">
            <div class="tag-box">
              <el-button type="primary" icon="el-icon-plus" @click="addTag">添加标签</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="群聊" name="group">
        <el-tabs v-model="activeGroup">
          <el-tab-pane label="最近群聊" name="tag">
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in userList" :key="item.fromId" @click="getGroupUsers(item.fromId, item.nickName)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.nickName"></p>
                  <p class="msg" v-html="item.lastContent"></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="所有群聊" name="tags">
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in userList" :key="item.id" @click="getGroupUsers(item.id, item.nickName)">
                <div class="headImgUrl">
                  <img class="head" :src="item.headImgUrl" :alt="item.nickName">
                </div>
                <div class="user-info">
                  <p class="title" v-html="item.nickName"></p>
                  <p class="msg" v-html="item.lastContent"></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="添加标签"
      :visible.sync="showTag"
      width="50%">
      <addTag v-if="showTag"></addTag>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import addTag from './addTag.vue'

@Component({
  components: {
    addTag
  }
})
export default class WchatLeftView extends Vue {
  private chatName: string = 'chat'
  private friendName: string = 'contacts'
  private activeGroup: string = 'tag'
  private userList: any[] = []
  private showTag: boolean = false
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  // 汇总 好友 群聊
  @Watch('chatName')
  private async chatNameChange (val: string) {
    switch (val) {
      case 'chat':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        const data = await this.$store.dispatch('wxtool/wechatChatListList', {...this.params})
        this.userList = data.data.records
        this.showChatRecord(this.userList[0])
        break
      case 'friend':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        const chatList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          chatRecordType: 1
        })
        this.userList = chatList.data.records
        this.showChatRecord(this.userList[0])
        this.friendName = 'contacts'
        break
      case 'group':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'group')
        const groupList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          chatRecordType: 2
        })
        this.userList = groupList.data.records
        this.getGroupUsers(this.userList[0].fromId, this.userList[0].nickName)
        break
      default:
        break
    }
  }
  // 联系人 好友 标签
  @Watch('friendName')
  private async friendNameChange (val: string) {
    switch (val) {
      case 'contacts':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        const chatList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          chatRecordType: 1
        })
        this.userList = chatList.data.records
        this.showChatRecord(this.userList[0])
        break
      case 'friend':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'info')
        const data = await this.$store.dispatch('wxtool/getfriends', {
          ...this.params,
          size: 100,
          current: 1
        })
        this.userList = data.data.records
        this.$store.commit('wxtool/SET_FRIENDINFO', this.userList[0])
        this.activeGroup = 'tag'
        break
      case 'tag':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'tag')
        const singleList = await this.$store.dispatch('wxtool/getSingleList', {
          ...this.params,
          type: 3,
          size: 100
        })
        console.log(singleList)
        break
      default:
        break
    }
  }
  // 群聊
  @Watch('activeGroup')
  private async activeGroupChange (val: string) {
    switch (val) {
      case 'tag':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'group')
        const groupList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          chatRecordType: 2
        })
        this.userList = groupList.data.records
        this.getGroupUsers(this.userList[0].fromId, this.userList[0].nickName)
        break
      default:
        const groupaAllList = await this.$store.dispatch('wxtool/wechatGroupList', {
          ...this.params,
          size: 100
        })
        this.userList = groupaAllList.data.records
        this.getGroupUsers(this.userList[0].id, this.userList[0].nickName)
        break
    }
  }
  private async mounted () {
    if (!this.$store.state.user.userInfo.cid) {
      const userInfo = await this.$store.dispatch('user/getUserInfo')
    }
    const params = {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
    const data = await this.$store.dispatch('wxtool/wechatChatListList', params)
    this.userList = data.data.records
    this.showChatRecord(this.userList[0])
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
      size: 100
    }
    await this.$store.dispatch('wxtool/wechatChatRecordList', params)
  }
  /**
   * @description: 请求群成员
   */
  private async getGroupUsers (id: string, name: string) {
    await this.$store.dispatch('wxtool/wechatGroupMemberList', {groupID: id})
    await this.$store.commit('wxtool/SET_GROUPNAME', name)
  }
  // 获取好友信息
  private showFriendInfo (item: any) {
    this.$store.commit('wxtool/SET_FRIENDINFO', item)
  }
  // 添加标签
  private addTag () {
    // todo
    this.showTag = true
  }
}
</script>
<style lang="scss" scoped>
.wechat-left-view {
  height: 100%;
  overflow-y: hidden;
  .user-list-box {
    overflow-y: auto;
  }
  .user-item {
    display: flex;
    margin-bottom: 5px;
    border: 1px solid #FFFFFF;
    cursor: pointer;
    .headImgUrl {
      width: 80px;
      display: flex;
      align-items: center;
      height: 60px;
      justify-content: center;
      .head {
        height: 50px;
        width: 50px;
      }
    }
    .user-info {
      p {
        text-align: left;
        margin-top: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 160px;
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
}
.el-tabs__header {
  margin: 0;
}
</style>
