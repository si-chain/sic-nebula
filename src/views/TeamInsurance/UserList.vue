<template>
  <div class="data-user-list">
    <el-form :model="formInline" class="header-form clearfix" label-width="100px">
      <div class="line-wrap">
        <el-form-item label="任务名称">
          <el-input size="mini" v-model="formInline.name" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="数据源">
          <el-input size="mini" v-model="formInline.number" placeholder="数据源"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="table-wrap">
      <div class="table-title">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="用户召唤列表" fontSize="12px"></title-item>
        <el-button size="mini" type="success">添加数据源</el-button>
      </div>
      <div class="btn-box">
        <el-button-group>
          <el-button >Check All</el-button>
          <el-button >Check None</el-button>
        </el-button-group>
        <el-button-group>
          <el-button >Copy</el-button>
          <el-button >Move</el-button>
          <el-button >Hide</el-button>
          <el-button >Delete</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="tableData"
        stripe
        :height="viewHeight"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          sortable
          label="Name">
        </el-table-column>
        <el-table-column
          prop="country"
          sortable
          label="Country">
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status">
        </el-table-column>
        <el-table-column
          prop="date"
          label="Birthday">
        </el-table-column>
        <el-table-column
          prop="info"
          label="Detail">
          <template slot-scope="scope">
            <span class="table-item-lnk"><i class="el-icon-view" style="color: #67c23a"></i></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DataUserList extends Vue {
  private formInline: any = {
    name: '',
    number: ''
  }
  private viewHeight: number = 500
  private tableData: any = [
    {
      country: 'Mauritania',
      name: 'Minnie Ford',
      status: 'Transfering',
      date: '2018-10-11',
      info: '2'
    },
    {
      country: 'Andorra',
      name: 'Marian Bryan',
      status: 'Transfering',
      date: '2018-10-11',
      info: '2'
    },
    {
      country: 'Dominican',
      name: 'Nathaniel Arnold',
      status: 'Transfering',
      date: '2018-10-11',
      info: '2'
    },
    {
      country: 'Ethiopia',
      name: 'Earl Harper',
      status: 'Transfering',
      date: '2018-10-11',
      info: '2'
    }
  ]
  private mounted () {
    this.viewHeight = document.documentElement.clientHeight - 260
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

