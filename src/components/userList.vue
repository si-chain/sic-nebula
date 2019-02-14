<template>
  <div class="user-list">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        prop="pname"
        label="姓名">
        <template slot-scope="scope">
          <span class="table-item-lnk">{{scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex === '1' ? '男' : scope.row.sex === '2' ? '女' : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="生日">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="birth_place"
        label="地址">
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryOptions.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
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
  maxsize: number
}
@Component
export default class UserList extends Vue {
  @Prop({ default: 10})
  private maxsize!: number
  private tableData: any[] = []
  private queryOptions: IOptions = {
    start: '2018-09-23 00:00:00',
    end: '2018-09-25 00:00:00',
    code: '0210,0210010101,021001010101',
    mode: 'OR',
    pushevent: '',
    usertype: 'N',
    pagesize: 10,
    pagenum: 1,
    maxsize: this.maxsize
  }
  private handleSizeChange (val: any) {
    console.log(`每页 ${val} 条`)
    this.queryOptions.pagesize = val
    this.getData()
  }
  private async getData () {
    const users = await this.$store.dispatch('user/getUsers', this.queryOptions)
  }
  private async created () {
    const users = await this.$store.dispatch('user/getUsers', this.queryOptions)
    console.log(users)
  }
}
</script>
