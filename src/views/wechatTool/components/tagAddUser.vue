<template>
  <div v-loading="loadingUser" style="margin: 0 auto;" class="tag-add-user">
    <el-form :inline="true">
      <el-form-item label="添加类型">
        <el-select size="mini" v-model="chatRecordType" placeholder="请选择">
          <el-option label="普通好友" :value="1"></el-option>
          <el-option label="群好友" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择群" v-if="groupList.length > 0">
        <el-select size="mini" v-model="groupId" placeholder="请选择">
          <el-option v-for="item in groupList" :label="item.nickName" :key="item.id" :value="item.id"><span v-html="item.nickName"></span></el-option>
          <!-- <el-option label="普通好友" :value="1"></el-option>
          <el-option label="群好友" :value="2"></el-option> -->
        </el-select>
      </el-form-item>
    </el-form>
    <el-transfer
      style="text-align: left; display: inline-block; height: 400px; "
      v-model="addUser"
      filterable
      :titles="['好友列表', '已选择人员']"
      :button-texts="['移除', '添加']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      :data="allUser">
      <el-button class="transfer-footer" :disabled="firendMore" slot="left-footer" size="mini" @click="moreFirend">获取更多好友</el-button>
    </el-transfer>
    <div style="text-align: center">
      <el-button type="success" style="margin-top: 12px;"  size="mini" @click="submit">添加</el-button>
      <el-button style="margin-top: 12px;" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class TagAddUser extends Vue {
  private loadingUser: boolean = false
  private firendMore: boolean = false
  private groupList: any[] = []
  private groupId: number = 0
  private chatRecordType: number = 1
  private allUser: any[] = []
  private addUser: any[] = []
  private friendPageOption: any = {
    size: 100,
    current: 1
  }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private async created () {
    this.getData()
  }
  @Watch('chatRecordType')
  private async chatRecordTypeChange (val: number) {
    if (val === 2) {
      const data = await this.$store.dispatch('wxtool/wechatGroupList', {
        ...this.params,
        size: 500
      })
      if (data.data.records.length > 0) {
        this.groupList = data.data.records
        this.groupId = this.groupList[0].id
      }
    }
  }
  @Watch('groupId')
  private async groupIdChange (val: number) {
    this.loadingUser = true
    const data = await this.$store.dispatch('wxtool/wechatGroupMemberList', {
      groupID: val
    })
    this.loadingUser = false
    this.allUser = []
    if (data.errcode === 200 && data.data.length > 0) {
      data.data.map((item: any) => {
        this.allUser.push({
          key: item.id,
          'label': item.nickName,
          disabled: false
        })
      })
    }
  }
  private async getData () {
    this.loadingUser = true
    const data = await this.$store.dispatch('wxtool/getfriends', {
      ...this.params,
      ...this.friendPageOption
    })
    this.loadingUser = false
    if (data.errcode === 200) {
      this.firendMore = data.data.current * data.data.size > data.data.total
      data.data.records.map((item: any) => {
        this.allUser.push({
          key: item.id,
          'label': item.remarkName === '' ? item.nickName : item.remarkName,
          disabled: false
        })
      })
    } else {
      this.allUser = []
    }
  }
  private moreFirend () {
    this.friendPageOption.current += 1
    this.getData()
  }
  private async submit () {
    if (this.addUser.length === 0) {
      this.$message.warning('请选择添加人员！')
      return false
    }
    const data: any[] = []
    const groupId = this.groupId === 0 ? '' : this.groupId
    this.addUser.map((userId: number) => {
      data.push({
        ...this.params,
        tagType: 1,
        tagId: this.$store.state.wxtool.singleTagId,
        wechatUserId: 5,
        friendId: userId,
        'groupId': groupId
      })
    })
    const res = await this.$store.dispatch('wxtool/addTagUsers', data)
    if (res.errcode === 200) this.$message.success('添加成功')
    else this.$message.error(res.data)
    this.cancel()
  }
  private cancel () {
    this.$emit('cancel')
  }
}
</script>
