<template>
  <page-data :data="pageList" style="padding: 20px 10px">
    <template slot="form">
      <el-form :model="form" size="mini" label-width="80px" style="width:600px;">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleGetList()" icon="el-icon-refresh" :loading="isLoading">查询</el-button>
          <el-button type="success" icon="el-icon-upload2" @click="isUpload = true">上传Excel</el-button>
          <el-button type="success" icon="el-icon-circle-plus" @click="addUser">添加人员</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="moveUsers">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <el-table :data="pageList.records"
        :loading="loading"
        :height="($store.state.app.viewHeight - 166)"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="idCard" label="身份证号码"></el-table-column>
        <el-table-column
          prop="ct"
          label="创建时间"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.ct | format('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="done"
          label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="move(scope.row.id)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="批量上传账户" :visible.sync="isUpload" width="800px">
      <UploadUserExcel v-if="isUpload" type="1" @close="closeUploadLog"></UploadUserExcel>
    </el-dialog>
    <el-dialog :visible.sync="addUserLog" title="人员详情">
      <itemUser v-if="addUserLog" :isEdit="editUserId" @close="closeUploadLog"></itemUser>
    </el-dialog>
  </page-data>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import miniPage from '../../mixin/MixinPage'
import UploadUserExcel from './components/uploadUserExcel.vue'
import itemUser from './components/itemUser.vue'

@Component({
  mixins: [miniPage],
  components: {
    UploadUserExcel,
    itemUser
  }
})
export default class Articles extends Vue {
  private list: any[] = []
  private form: any = {
    // name: ''
  }
  private editUserId: any = undefined
  private addUserLog: boolean = false
  private isUpload: boolean = false
  private loading: boolean = false
  private pageList: any = {
    current: 1,
    size: 10,
    total: 0,
    records: []
  }
  private users: number[] = []
  private add: boolean = false
  // public getData = this.getList()
  public handleGetList: any
  private get userInfoId () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  /**
   * 获取表格数据
   */
  public async getList (params?: any, form?: any) {
    this.loading = true
    if (this.userInfoId.cid) {
      const data = await this.$store.dispatch('hr/getUserList', {
        ...this.userInfoId,
        type: 1,
        ...params,
        ...form
      })
      this.pageList = data.data
      this.loading = false
    } else {
      await this.$store.dispatch('user/getUserInfo')
      this.getList()
    }
  }
  private handleSelectionChange (val: any) {
    const users: number[] = []
    val.map((user: any) => {
      users.push(user.id)
    })
    this.users = users
  }
  private async created () {
    const data = await this.handleGetList()
  }
  private async moveUsers () {
    this.$confirm('此操作将永久删除选择的人员, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await this.$store.dispatch('organization/delTeamUsers', this.users)
      if (data.errcode === 200) this.$message.success('删除成功')
      else this.$message.error('删除失败')
      this.handleGetList()
    })
  }
  private edit (item: any) {
    this.editUserId = item.id
    this.addUserLog = true
  }
  private move (id: number) {
    this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await this.$store.dispatch('organization/delTeamUser', id)
      if (data.errcode === 200) {
        this.$message.success('删除成功!')
      } else {
        this.$message.error('删除失败!')
      }
      this.handleGetList()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
  private addUser () {
    this.editUserId = undefined
    this.addUserLog = true
  }
  private closeUploadLog () {
    this.isUpload = false
    this.addUserLog = false
    this.handleGetList()
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  // display: flex;
  text-align: left;
  // .el-form-item {
  //   // float: left;
  // }
}
</style>
