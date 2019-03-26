<template>
  <div class="tag-user-box">
    <div >
      <el-button-group>
        <el-button class="btn-tag-user" size="mini" type="success" icon="el-icon-edit" @click="showAddTag = true">添加用户</el-button>
        <el-button size="mini" type="warning" @click="showCheckBox = !showCheckBox">批量操作</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" :disabled="!showCheckBox" @click="move">删除</el-button>
      </el-button-group>
      <div v-loading="loadData">
        <div v-if="TagUsers.length > 0">
          <el-checkbox-group v-model="checkboxGroup" class="group-user-box" v-if="showCheckBox">
            <div class="group-user-item" v-for="item in TagUsers" :key="item.id">
              <img :src="item.friendHeadImgUrl ? item.friendHeadImgUrl : errorImg" :onerror="errorImg" alt="" style="display: block">
              <el-checkbox :label="item.id" class="tag-item-user-checkbox">
                <span class="label-name" v-html="item.friendNickName" style="width: 78px;"></span>
              </el-checkbox>
            </div>
          </el-checkbox-group>
          <div class="group-user-box" v-else>
            <div class="group-user-item" v-for="item in TagUsers" :key="item.id">
              <img :src="item.friendHeadImgUrl ? item.friendHeadImgUrl : errorImg" :onerror="errorImg" alt="" style="display: block">
              <p class="label-name" v-html="item.friendNickName">{{item.friendNickName}}</p>
            </div>
          </div>
        </div>
        <div v-else class="no-data-view">
          暂无用户
        </div>
      </div>
      
      <el-button class="btn-tag-user" v-if="showMore" @click="addMore" size="mini">显示更多</el-button>
    </div>
    <el-dialog title="添加用户" :visible.sync="showAddTag" width="800px" append-to-body>
      <TagAddUser v-if="showAddTag" @cancel="closeLog"></TagAddUser>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import TagAddUser from './tagAddUser.vue'

@Component({
  components: {
    TagAddUser
  }
})
export default class TagUser extends Vue {
  private errorImg: string = `this.src="${require('../../../assets/none-avater.jpeg')}"`
  private checkboxGroup: any[] = []
  private TagUsers: any[] = []
  private showCheckBox: boolean = false
  private showMore: boolean = false
  private showAddTag: boolean = false
  private loadData: boolean = false
  private pageOptions: any = {
    size: 21,
    current: 1
  }
  private async created () {
    this.getData()
  }
  private async getData () {
    this.loadData = true
    const data = await this.$store.dispatch('wxtool/wechatFriendTagList', {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid,
      tagId: this.$store.state.wxtool.singleTagId,
      ...this.pageOptions
    })
    this.loadData = false
    if (data.errcode === 200) {
      const users = this.TagUsers
      this.TagUsers = users.concat(data.data.records)
      data.data.total > data.data.size * data.data.current ? this.showMore = true : this.showMore = false
    }
  }
  private async addMore () {
    this.pageOptions.current += 1
    this.getData()
  }
  private async move () {
    this.$confirm('此操作将永久删除选择的人员, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await this.$store.dispatch('wxtool/deleteTagUsers', this.checkboxGroup)
      if (data.errcode === 200) this.$message.success('删除成功')
      else this.$message.error('删除失败')
      this.TagUsers = []
      this.pageOptions.current = 1
      this.getData()
    })
  }
  private closeLog () {
    this.showAddTag = false
    this.TagUsers = []
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.tag-user-box {
  text-align: left;
  .btn-tag-user {
    margin-left: 10px;
  }
  .group-user-box {
    display: flex;
    width: 980px;
    flex-wrap: wrap;
    .group-user-item {
      width: 118px;
      margin: 10px;
      padding: 10px;
      text-align: center;
      border: 1px solid #cccccc;
      border-radius: 5px;
      img {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        border-radius: 50%;
      }
      .label-name {
        width: 88px;
        line-height: 20px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .group-user-item:hover {
      border: 1px solid #67C23A;
    }
  }
}


</style>
