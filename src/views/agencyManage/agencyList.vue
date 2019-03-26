<template>
  <page-data :data="pageList" style="padding: 20px 10px">
    <template slot="form">
      <el-form :model="form" size="mini" label-width="150px" style="width:600px;">
        <el-form-item label="公司名称">
          <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="投保日期">
          <el-input v-model="form.code" placeholder="请输入投保日期"></el-input>
        </el-form-item>
        <el-form-item label="生效日期">
          <el-input v-model="form.code" placeholder="请输入生效日期"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleGetList()" icon="el-icon-refresh" :loading="isLoading">查询</el-button>
          <el-button icon="el-icon-refresh" @click="form={};handleGetList()">重置</el-button>
          <el-button type="success" icon="el-icon-download" :loading="isLoading">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <el-table :data="pageList.records" stripe :height="($store.state.app.viewHeight - 265)">
        <el-table-column prop="time" width="180" label="提交日期"></el-table-column>
        <el-table-column prop="num"  width="180" label="团单单号"></el-table-column>
        <el-table-column prop="ename"  width="200" label="投保单位"></el-table-column>
        <el-table-column prop="insurename"  width="180" label="险种名称"></el-table-column>
        <el-table-column prop="username"  width="180" label="被保人姓名"></el-table-column>
        <el-table-column prop="userage" width="180" label="被保人年龄"></el-table-column>
        <el-table-column prop="userid" width="180" label="证件号码"></el-table-column>
        <el-table-column prop="userphone" width="180" label="被保人电话"></el-table-column>
        <el-table-column prop="iusername" width="180" label="主被保险人姓名"></el-table-column>
        <el-table-column prop="iuserid" width="180" label="主被保险人证件号"></el-table-column>
        <el-table-column prop="iusersex" width="180" label="主被保险人性别"></el-table-column>
        <el-table-column prop="usernexus" width="180" label="与主被保人关系"></el-table-column>
        <el-table-column prop="number" width="180" label="个单号"></el-table-column>
        <el-table-column prop="jftime" width="180" label="缴费期间"></el-table-column>
        <el-table-column prop="years" width="180" label="缴费年限"></el-table-column>
        <el-table-column prop="baofei" width="180" label="保费"></el-table-column>
        <el-table-column prop="baoe" width="180" label="保额"></el-table-column>
        <el-table-column prop="bzbaofei" width="180" label="标准保费"></el-table-column>
        <el-table-column prop="agency" width="180" label="代理机构名称"></el-table-column>
        <el-table-column prop="firsttime" width="180" label="首期扣款日期"></el-table-column>
        <el-table-column prop="addtime" width="180" label="加费扣款日期"></el-table-column>
        <el-table-column prop="sxtime" width="180" label="个单生效日期"></el-table-column>
        <el-table-column prop="hztime" width="180" label="个单回执回销日期"></el-table-column>
        <el-table-column prop="jfname" width="180" label="缴费人姓名"></el-table-column>
        <el-table-column prop="khh" width="180" label="开户行"></el-table-column>
        <el-table-column prop="idcard" width="180" label="银行账号"></el-table-column>
        <el-table-column prop="status" width="180" label="订单状态"></el-table-column>
        <el-table-column fixed="right" prop="insurstatus" width="180" label="保单状态"></el-table-column>
        <el-table-column prop="address" width="180" label="邮寄地址"></el-table-column>
        <!-- <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button-group >
              <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" v-if="scope.row.validstatus !== '1'">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column> -->
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
    const data = await this.$store.dispatch('mock/getAgencys', {
      // ...params,
      pageNo: params.current,
      pageSize: params.size,
      ...this.userInfoId
    })
    this.pageList = {
      size: data.data.pageSize,
      current: 1,
      total: 4,
      records: []
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
