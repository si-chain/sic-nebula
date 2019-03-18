<template>
  <div class="wechat-left-view" >
    <el-tabs v-model="chatName" type="card">
      <el-tab-pane label="消息汇总" name="chat">
        <div :style="{height: ($store.state.app.viewHeight - 56) + 'px'}" class="user-list-box">
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
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
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
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
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
          <el-tab-pane label="标签" name="tag">
            <div class="tag-box">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addTag">添加标签</el-button>
              <el-button type="primary" size="mini" icon="el-icon-upload" @click="isUpload = true">批量上传</el-button>
            </div>
            <div class="tag-box">
              <div class="tag-item" v-for="item in $store.state.wxtool.tagList" :key="item.id" :class="$store.state.wxtool.singleTagId === item.id ? 'is-active' : ''" type="primary" plain size="mini" @click="choicTag(item)">{{item.answer}}</div>
              <el-button v-if="$store.state.wxtool.userListFlag" type="infor" size="mini" @click="addMore('friendName', 'tag', 'tag')">加载更多</el-button>
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
            <div :style="{height: ($store.state.app.viewHeight - 110) + 'px'}" class="user-list-box">
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
    <el-dialog
      title="添加标签"
      :visible.sync="showTag"
      width="50%">
      <addTag @close="closeTag" v-if="showTag"></addTag>
    </el-dialog>
    <el-dialog title="批量上传" :visible.sync="isUpload" width="800px">
      <uploadMsgExcel v-if="isUpload" type="3" :templateLink="`https://bj-bdy-public.oss-cn-beijing.aliyuncs.com/online/upload/%E6%A0%87%E7%AD%BE%E8%AE%BE%E7%BD%AE.xls`" @close="closeTag"></uploadMsgExcel>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import addTag from './addTag.vue'
import uploadMsgExcel from './uploadMsgExcel.vue'

@Component({
  components: {
    addTag,
    uploadMsgExcel
  }
})
export default class WchatLeftView extends Vue {
  private chatName: string = 'chat'
  private friendName: string = 'contacts'
  private activeGroup: string = 'tag'
  private errorImg: string = `this.src="${require('../../../assets/none-avater.jpeg')}"`
  private userList: any[] = []
  private pageSize: number = 15
  private currentPage: number = 1
  private showTag: boolean = false
  private timer: any = undefined
  private isUpload: boolean = false

  private get params () {
    return {
      current: this.currentPage,
      // size: this.pageSize,
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
  }
  // 联系人 好友 标签
  @Watch('friendName')
  private async friendNameChange (val: string, old?: string) {
    if (val !== old) {
      this.pageSize = 15
    }
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
      case 'tag':
        this.$store.commit('wxtool/SET_VIEWTYPE', 'tag')
        const singleList = await this.$store.dispatch('wxtool/getSingleList', {
          ...this.params,
          type: 3,
          size: val === old ? this.pageSize : size
        })
        if (singleList.records.length > 0) {
          this.$store.commit('wxtool/SET_FRIENDTAGNAME', singleList.records[0].answer)
          this.$store.commit('wxtool/SET_SINGLETAGID', singleList.records[0].id)
          this.$store.dispatch('wxtool/wechatFriendTagList', {
            ...this.params,
            size: val === old ? this.pageSize : size,
            tagId: singleList.records[0].id
          })
        } else {
          this.$store.commit('wxtool/SET_FRIENDTAGNAME', '')
          this.$store.commit('wxtool/SET_SINGLETAGID', '')
        }
        break
      default:
        break
    }
  }
  // 群聊
  @Watch('activeGroup')
  private async activeGroupChange (val: string, old?: string) {
    if (val !== old) {
      this.pageSize = 15
    }
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
    if (!this.$store.state.user.userInfo.cid) {
      const userInfo = await this.$store.dispatch('user/getUserInfo')
    }
    const params = {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
    const data = await this.$store.dispatch('wxtool/wechatChatListList', params)
    this.showChatRecord(data.data.records[0])
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setInterval(async () => {
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
      } else {
        // clearInterval(this.timer)
      }
    }, 5000)
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
    this.isUpload = false
    this.friendNameChange('tag')
  }
  private beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
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
