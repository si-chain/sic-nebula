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
          <!-- <el-button type="success" icon="el-icon-download">下载模版</el-button> -->
          <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
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
      </el-table>
    </template>
    <el-dialog title="批量上传账户" :visible.sync="isUpload" width="800px">
      <UploadUserExcel v-if="isUpload" type="1" @close="closeUploadLog"></UploadUserExcel>
    </el-dialog>
  </page-data>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import miniPage from '../../mixin/MixinPage'
import UploadUserExcel from './components/uploadUserExcel.vue'

@Component({
  mixins: [miniPage],
  components: {
    UploadUserExcel
  }
})
export default class Articles extends Vue {
  private list: any[] = []
  private form: any = {
    // name: ''
  }
  private isUpload: boolean = false
  private loading: boolean = false
  private pageList: any = {
    current: 1,
    size: 10,
    total: 0,
    records: []
  }
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
      const data =await this.$store.dispatch('hr/getUserList', {
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
    console.log(val)
  }
  private async created () {
    const data = await this.handleGetList()
  }
  private closeUploadLog () {
    this.isUpload = false
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
