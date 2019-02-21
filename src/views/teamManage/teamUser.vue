<template>
  <div class="team-user">
    <div class="team">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="团队成员" backgroundColor="#67c23a" :showTooltip="false" fontSize="12px"></title-item>
      </div>
      <!-- <div class="title">团队成员</div> -->
      <div class="member">
        <div class="member-list">
          <div class="user-card" v-for="(item, index) in records" :key="index">
            <div class="name">{{item.cname}}</div>
            <div class="desc">工号： {{item.name}}</div>
            <div class="desc">电话： {{item.mobile}}</div>
            <div class="desc" style="text-align: left; margin-left: 22px;" v-if="item.sys">团队长</div>
          </div>
        </div>
      </div>   
    </div>
    <div class="policy">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="出单记录" backgroundColor="#67c23a" :showTooltip="false" fontSize="12px"></title-item>
      </div>
      <el-table :data="pageList" stripe>
        <el-table-column label="保单号" prop="policyNo" width="150">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <p>保单号: {{ scope.row.policyNo }}</p>
              <p>投保人: {{ scope.row.holderName }}</p>
              <p>被保人: {{ scope.row.insuredName }}</p>
              <p>总保费(元): {{ scope.row.policyPremnium }}</p>
              <p>缴费年限: {{ scope.row.payYearLimitDesc }}</p>
              <p>保单状态: {{ filterPolicyStatus(scope.row.policyStatus) }}</p>
              <p>签单日期: {{ scope.row.signingTime | format('yyyy-mm-dd') }}</p>
              <p>生效日期: {{ scope.row.effectiveTime | format('yyyy-mm-dd') }}</p>
              <p>保险产品: {{ scope.row.productName }}</p>
              <p>承保公司: {{ scope.row.companyName }}</p>
              <p>险种保费: {{ scope.row.totalPremium }}</p>
              <p>险种保额: {{ scope.row.totalAmount }}</p>
              <p>保险期间: {{ scope.row.insurancePeriod }}</p>
              <el-tag size="medium" slot="reference">{{ scope.row.policyNo }}</el-tag>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="保单状态">
          <template slot-scope="scope">{{ filterPolicyStatus(scope.row.policyStatus)}}</template>
        </el-table-column>
        <el-table-column label="险种编码" prop="typeCode"></el-table-column>
        <el-table-column label="险种名称" prop="typeName">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <p>险种编码: {{ scope.row.typeCode }}</p>
              <p>险种名称: {{ scope.row.typeName }}</p>
              <el-tag size="medium" slot="reference">{{ scope.row.typeName }}</el-tag>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="出单机构" prop="gname" width="200"></el-table-column>
        <el-table-column label="代理人" prop="agentName"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TeamUser extends Vue {
  private records: any[] = []
  private pageList: any[] = []
  private async created () {
    const info = await this.$store.dispatch('team/getTeamMember')
    if (info.errcode === 200) this.records = info.data.records
    else this.records = []

    const list = await this.$store.dispatch('team/getPageList')
    this.pageList = list
  }
  private filterPolicyStatus (status: string) {
    switch (status) {
      case '10':
        return '有效'
      case '6':
        return '撤单'
      case '16':
        return '保单终止'
      case '9':
        return '退保'
      case '12':
        return '失效'
      case '17':
        return '撤销申请'
      case '18':
        return '迁移'
      case '19':
        return '登记索偿'
      case '99':
        return '其他'
    }
  }
}
</script>

<style lang="scss" scoped>
.user-card {
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  border-top: 5px solid orange;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .name {
    padding-bottom: 5px;
  }
  .desc {
    color: #999;
    font-size: 14px;
  }
}
.member-list {
  display: flex;
  .user-card {
    margin-left: 10px;
  }
}
.title {
    padding: 5px 10px;
    background: #ccc6;
    margin-bottom: 10px;
}
</style>

