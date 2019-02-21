<template>
  <div class="data-user-list">
    <div class="table-wrap">
      <div class="table-title">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="用户召回列表" fontSize="12px"></title-item>
      </div>
      <el-table
        :data="tableData"
        stripe
        :height="viewHeight"
        style="width: 100%">
        <el-table-column
          prop="pname"
          sortable
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          sortable
          label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex === '1' ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DataUserList extends Vue {
  @Prop({ default: 0 })
  private start!: number
  @Prop({ default: 50 })
  private end!: number

  private formInline: any = {
    name: '',
    number: ''
  }
  private viewHeight: number = 500
  private tableData: any = []
  private async mounted () {
    this.viewHeight = document.documentElement.clientHeight - 260
    const res = await this.$store.dispatch('mock/getTableUsers')
    this.tableData = res.slice(this.start, this.start + this.end)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

.data-user-list {
  padding: 10px;
  background: #fff;
}
.header-form {
  // margin: 0 auto;
  padding: 30px 0;
  .line-wrap {
    display: flex;
  }
  .el-form-item {
    flex: 1;
    margin: 0 50px;
    .el-input--mini {
      width: 200px;
      float: left;
    }
  }
  .el-checkbox-group {
    text-align: left;
  }
}
.btn-box {
  text-align: left;
  // margin-left: 20px;
  .el-button-group {
    margin-left: 10px;
  }
}
.table-wrap {
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  .table-title {
    display: flex;
    margin: 10px 0 ;
    .el-button {
      margin-left: 20px;
    }
  }
}
.icon-success,.link {
  color: #67c23a;
}

</style>

