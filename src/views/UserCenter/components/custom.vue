<template>
  <div class="honor">
    <div class="menu-item-head">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="我的客户" fontSize="12px"></title-item>
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
            label="客户">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="注册时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="action"
            label="活动">
          </el-table-column>
          <el-table-column
            prop="services"
            label="服务标准">
          </el-table-column>
          
        </el-table>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CustomView extends Vue {
  private tableData: any = [
    {
      action: '未参与活动',
      name: '胡歌',
      status: '完成',
      date: '2018-10-11',
      services: '寿VIP2'
    },
    {
      action: '开门红，51活动',
      name: '王自健',
      status: '完成',
      date: '2018-10-11',
      services: '车VIP1'
    },
    {
      action: '双11活动',
      name: '李珊珊',
      status: '完成',
      date: '2018-10-11',
      services: '团VIP3'
    }
  ]
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>

<style lang='scss'>

 
</style>
