<template>
  <div class="honor">
    <div class="menu-item-head">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="我的团队(河南团队)" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            sortable
            label="下属">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="入司时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="info"
            label="职级">
          </el-table-column>
          <el-table-column
            prop="manage"
            label="主管">
          </el-table-column>
          
        </el-table>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TeamView extends Vue {
  private tableData: any = [
    {
      info: '内勤',
      name: '胡歌',
      status: '完成',
      date: '2018-10-11',
      manage: '是'
    },
    {
      info: '外勤',
      name: '王自健',
      status: '完成',
      date: '2018-10-11',
      manage: '否'
    },
    {
      info: '外勤',
      name: '李珊珊',
      status: '完成',
      date: '2018-10-11',
      manage: '是'
    }
  ]
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>

<style lang='scss'>

 
</style>
