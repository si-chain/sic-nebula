<template>
  <page-data :data="pageList" style="padding: 20px 10px">
    <template slot="form">
      <el-form :model="form" size="mini" label-width="150px" style="width:600px;">
        <!-- <el-form-item label="公司名称">
          <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
        </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="form.code" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleGetList()" icon="el-icon-refresh" :loading="isLoading">查询</el-button>
          <el-button type="success" icon="el-icon-upload2">上传Excel</el-button>
          <el-button type="success" icon="el-icon-download">下载模版</el-button>
          <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <el-table :data="pageList.records">
        <el-table-column
          type="index"
          width="50"
          label="序号">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="idcard" label="身份证号码"></el-table-column>
      </el-table>
    </template>
  </page-data>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import miniPage from '../../mixin/MixinPage'

@Component({
  mixins: [miniPage]
})
export default class Articles extends Vue {
  private list: any[] = []
  private form: any = { postType: '1,2,3,6', range: [] }
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
      uid: this.$store.state.user.userInfo.id,
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  /**
   * name
   */
  public async getList (params: any, form: any) {
    // if (!this.userInfoId.gid) {
    //   await this.$store.dispatch('user/getUserInfo')
    // }
    // const data = await this.$store.dispatch('mock/getAgencys', {
    //   // ...params,
    //   pageNo: params.current,
    //   pageSize: params.size,
    //   ...this.userInfoId
    // })
    this.pageList = {
      size: 10,
      current: 1,
      total: 4,
      records: [
        {
          name: '张三',
          idcard: '370884198812031231'
        },
        {
          name: '张三',
          idcard: '370884198812031231'
        },
        {
          name: '张三',
          idcard: '370884198812031231'
        }
      ]
    }
  }
  private async created () {
    const data = await this.handleGetList()
  }
  private cancel () {
    this.add = false
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
