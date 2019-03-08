<template>
  <page-data :data="pageList" style="padding: 20px 10px">
    <template slot="form">
      <el-form :model="form" size="mini" label-width="150px" style="width:600px;">
        <el-form-item label="公司名称">
          <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信息代码">
          <el-input v-model="form.code" placeholder="请输入统一社会信息代码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleGetList()" icon="el-icon-refresh" :loading="isLoading">刷新</el-button>
          <el-button icon="el-icon-refresh" @click="form={};handleGetList()">重置</el-button>
          <el-button type="success" @click="add = true" icon="el-icon-plus" :loading="isLoading">新增中介公司</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <el-table :data="pageList.records" stripe>
        <el-table-column prop="insurercode" label="公司代码"></el-table-column>
        <el-table-column prop="insurername" label="公司名称"></el-table-column>
        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button-group >
              <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" v-if="scope.row.validstatus !== '1'">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      title="新增"
      :visible.sync="add"
      width="800px">
      <addAgency @cancel="cancel"></addAgency>
    </el-dialog>

  </page-data>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import addAgency from './addagency.vue'
import miniPage from '../../mixin/MixinPage'

@Component({
  mixins: [miniPage],
  components: {
    addAgency
  }
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
    if (!this.userInfoId.gid) {
      await this.$store.dispatch('user/getUserInfo')
    }
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
          insurercode: 'jshfnma22131',
          insurername: '北京众信易保',
          phone: '18675536631',
          email: 'zxyb@baodanyun-inc.com'
        },
        {
          insurercode: 'jshfnma22131',
          insurername: '北京众信易保',
          phone: '18675536631',
          email: 'zxyb@baodanyun-inc.com'
        },
        {
          insurercode: 'jshfnma22131',
          insurername: '北京众信易保',
          phone: '18675536631',
          email: 'zxyb@baodanyun-inc.com'
        },
        {
          insurercode: 'jshfnma22131',
          insurername: '北京众信易保',
          phone: '18675536631',
          email: 'zxyb@baodanyun-inc.com'
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
