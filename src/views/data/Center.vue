<template>
  <div class="data-center" ref="content">
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="帮助中心" :showTooltip="true" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-download"></i></span>
      </div>
      <div class="view">
        <div class="view-left"></div>
        <div class="view-right"></div>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="运营视窗" fontSize="12px"></title-item>
        <div class="select-box">
          <span class="select-lable">时间筛选</span>
          <el-select v-model="month" size="mini" placeholder="请选择">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item + '月'"
              :value="item">
            </el-option>
          </el-select>
           <el-date-picker
            v-model="selectDate"
            align="right"
            type="date"
            size="mini"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="核心指标" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-download"></i></span>
      </div>
      <div class="carousel-box">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="流量看板" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-download"></i></span>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="转化看板" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-download"></i></span>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="分群数据源" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-download"></i></span>
      </div>
      <div class="group-box">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="分群名称"
            width="180">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="触发时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="分群状态">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="result"
            label="召回情况">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.result }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="info"
            label="用户详情">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.info }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'


@Component
export default class Article extends Vue {
  private month: string = ''
  private selectDate: string = ''
  private tableData: any = [
    {
      date: '2016-05-02',
      name: '智能体检筛选',
      status: '完成',
      result: '30（50%）',
      info: '30人'
    },
    {
      date: '2016-05-02',
      name: '智能体检筛选',
      status: '完成',
      result: '30（50%）',
      info: '30人'
    },
    {
      date: '2016-05-02',
      name: '智能体检筛选',
      status: '完成',
      result: '30（50%）',
      info: '30人'
    }
  ]
}
</script>
<style lang="scss">
@import "../../assets/scss/variable.scss";
.data-center {
  overflow-x: hidden;
  overflow-y: auto;
  margin: 10px;
  background: #fff;
  padding: 0 10px 10px 10px;
  .item {
    margin-top: 10px;
    .title {
      padding: 5px 10px;
      background: $bg-color;
      .title-item {
        float: left;
      }
      // display: flex;
      .download-icon {
        float: right;
        margin-right: 10px;
      }
    }
  }
  .view {
    display: flex;
    margin-top: 10px;
    div {
      flex: 1;
      height: 200px;
      border: 1px solid $bg-color;
    }
    .view-left {
      margin-right: 5px;
    }
    .view-right {
      background-color: $bg-color;
    }
  }
}
.select-box {
  float: right;
  .select-lable {
    font-size: 12px;
    margin-right: 10px;
  }
  .el-select {
    margin: 0 10px;
    width: 120px;
  }
  .el-date-editor {
    width: 120px;
  }
}
.carousel-box {
  margin-top: 10px; 
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.table-item-lnk {
  color: #006880;
  cursor: pointer;
}
</style>

