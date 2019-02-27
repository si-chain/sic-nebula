<template>
  <div class="wechat-left-view" >
    <el-tabs v-model="chatName" type="card">
      <el-tab-pane label="消息汇总" name="chat">
        <div :style="{height: ($store.state.app.viewHeight - 56) + 'px'}" class="user-list-box">
          <div class="user-item" :class="$store.state.wxtool.fromId === item.fromId ? 'is-active' : ''" v-for="item in $store.state.wxtool.chatList" :key="item.fromId" @click="showChatRecord(item)">
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
      <el-tab-pane label="好友" name="friend">
        <el-tabs v-model="friendName">
          <el-tab-pane label="联系人" name="contacts">
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in $store.state.wxtool.chatList" :class="$store.state.wxtool.fromId === item.fromId ? 'is-active' : ''" :key="item.fromId" @click="showChatRecord(item)">
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
          <el-tab-pane label="好友" name="friend">
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in userList" :class="$store.state.wxtool.firendInfo.nickName === item.nickName ? 'is-active' : ''" :key="item.fromId" @click="showFriendInfo(item)">
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
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addTag">添加标签</el-button>
            </div>
            <div class="tag-box">
              <div class="tag-item" v-for="item in $store.state.wxtool.tagList" :key="item.id" :class="$store.state.wxtool.singleTagId === item.id ? 'is-active' : ''" type="primary" plain size="mini" @click="choicTag(item)">{{item.answer}}</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="群聊" name="group">
        <el-tabs v-model="activeGroup">
          <el-tab-pane label="最近群聊" name="tag">
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
              <div class="user-item" v-for="item in $store.state.wxtool.chatList" :class="$store.state.wxtool.groupName === item.nickName ? 'is-active' : ''" :key="item.fromId" @click="getGroupUsers(item.fromId, item.nickName)">
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
              <div class="user-item" v-for="item in $store.state.wxtool.groupList" :class="$store.state.wxtool.groupName === item.nickName ? 'is-active' : ''" :key="item.id" @click="getGroupUsers(item.id, item.nickName)">
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
      <addTag @close="closeTag" v-if="showTag"></addTag>
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
        // this.userList = data.data.records
        this.showChatRecord(data.data.records[0])
        break
      case 'friend':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'chat')
        const chatList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          chatRecordType: 1
        })
        // this.userList = chatList.data.records
        this.showChatRecord(chatList.data.records[0])
        this.friendName = 'contacts'
        break
      case 'group':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'group')
        const groupList = await this.$store.dispatch('wxtool/wechatChatListList', {
          ...this.params,
          chatRecordType: 2
        })
        // this.userList = groupList.data.records
        this.getGroupUsers(groupList.data.records[0].fromId, groupList.data.records[0].nickName)
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
        // this.userList = chatList.data.records
        this.showChatRecord(chatList.data.records[0])
        break
      case 'friend':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'info')
        const data = await this.$store.dispatch('wxtool/getfriends', {
          ...this.params,
          size: 3000,
          current: 1
        })
        this.userList = data.data.records
        this.$store.commit('wxtool/SET_FRIENDINFO', data.data.records[0])
        this.activeGroup = 'tag'
        break
      case 'tag':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'tag')
        const singleList = await this.$store.dispatch('wxtool/getSingleList', {
          ...this.params,
          type: 3,
          size: 100
        })
        this.$store.commit('wxtool/SET_FRIENDTAGNAME', singleList.records[0].answer || '')
        this.$store.commit('wxtool/SET_SINGLETAGID', singleList.records[0].id || '')
        this.$store.dispatch('wxtool/wechatFriendTagList', {
          ...this.params,
          size: 100,
          tagId: singleList.records[0].id
        })
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
        // this.userList = groupList.data.records
        this.getGroupUsers(groupList.data.records[0].fromId, groupList.data.records[0].nickName)
        break
      default:
        const groupaAllList = await this.$store.dispatch('wxtool/wechatGroupList', {
          ...this.params,
          size: 100
        })
        // this.userList = groupaAllList.data.records
        this.getGroupUsers(groupaAllList.data.records[0].id, groupaAllList.data.records[0].nickName)
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
    // this.userList = data.data.records
    this.showChatRecord(data.data.records[0])
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
    this.$store.commit('wxtool/SET_GROUPNAME', name)
  }
  // 获取好友信息
  private showFriendInfo (item: any) {
    this.$store.commit('wxtool/SET_FRIENDINFO', item)
  }
  // 添加标签
  private addTag () {
    this.showTag = true
  }
  // 选择tag
  private async choicTag (item: any) {
    this.$store.commit('wxtool/SET_SINGLETAGID', item.id)
    this.$store.commit('wxtool/SET_FRIENDTAGNAME', item.answer || '')
    await this.$store.dispatch('wxtool/wechatFriendTagList', {
      ...this.params,
      size: 100,
      tagId: item.id
    })
  }
  // 关闭dialog
  private closeTag () {
    this.showTag = false
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
