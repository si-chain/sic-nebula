<template>
  <div class="user-list">
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      height="450"
      style="width: 100%">
      <el-table-column
        prop="pname"
        label="姓名">
        <template slot-scope="scope">
          <a target="_black" class="link" :href="`https://s.17doubao.com/analysis/timeline/${scope.row.eu.uid}`">{{ scope.row.eu.pname }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.eu.sex === '1' ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
        <template slot-scope="scope">
          <span>{{ scope.row.eu.age }}岁</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="enname"
        label="公司"
        withd="300">
        <template slot-scope="scope">
          <a target="_black" class="link" :href="`https://s.17doubao.com/enterprise/infor?ename=${getStr(scope.row.eu.ename)}`">{{ scope.row.eu.ename }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="evtname"
        label="事件名称">
        <template slot-scope="scope">
          <span>{{ scope.row.evtname }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        :current-page="1"
        :page-size="queryOptions.pagesize"
        layout="total, prev, pager, next"
        :total="100">
      </el-pagination>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface IOptions {
  start: string
  end: string
  code: string
  mode: string
  pushevent: string
  usertype: string
  pagesize: number
  pagenum: number
}
@Component
export default class UserList extends Vue {
  @Prop({ default: ''})
  private evt!: string
  private tableData: any[] = []
  private loading: boolean = true
  private queryOptions: IOptions = {
    start: '2017-09-23 00:00:00',
    end: '2018-09-25 00:00:00',
    code: '0210,0210010101,021001010101',
    mode: 'OR',
    pushevent: '',
    usertype: 'N',
    pagesize: 100,
    pagenum: 0
  }
  private handleSizeChange (val: any) {
    this.getData()
  }
  private getStr (srt: string): string {
    const reg = /[\（]/g
    const reg2 = /[\）]/g
    return srt.replace(reg, '(').replace(reg2, ')')
  }
  private async getData () {
    const users = await this.$store.dispatch('user/getUsers')
    this.loading = false
  }
  private async created () {
    const users = await this.$store.dispatch('user/getUsers', { gid: 465 })
    this.loading = false
    users.data.map( (item: any) => {
      if (item.evt === this.evt) {
        this.tableData.push(item)
      }
    })
  }
}
</script>
<style lang="scss" scoped>

</style>

