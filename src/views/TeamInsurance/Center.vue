<template>
  <div class="team-insur-center" ref="content">
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="团险任务" backgroundColor="#67c23a" :showTooltip="true" fontSize="12px"></title-item>
        <div class="select-box">
          <el-select v-model="month"  multiple collapse-tags size="mini" placeholder="请选择">
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
          <router-link to="/add-analysis-task">
            <el-button type="success" style="margin-left: 15px;" size="mini">添加</el-button>
          </router-link>
        </div>
      </div>
      <div class="carousel-box">
        <div class="carousel-tip">
          <p class="tip-title" style="margin-top: 30px;">数据源</p>
          <p class="tip-msg">智能团筛亚健康组</p>
          <p class="tip-title">创建时间</p>
          <p class="tip-msg">2018-10-12</p>
          <p class="tip-title">用户总量</p>
          <p class="tip-msg">1020</p>
        </div>
        <el-carousel :interval="4000" type="card" height="200px" arrow="always">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="任务筛选日志" :showTooltip="true" fontSize="12px"></title-item>
        <!-- <span class="download-icon"><i class="el-icon-download"></i></span> -->
      </div>
      <div class="charts-view">
        <div class="charts-step-wrap">
          <div class="step-tip"></div>
          <div class="step-box clearfix">
            <div class="step-name">分群数据源：智能团筛亚健康组</div>
            <div class="month-tip">
              <p class="tip"><i class="iconfont icon-tisheng" style="color: #67c23a"></i>提升40人</p>
              <p class="tip1">1月 <span>开门红</span><i class="el-icon-arrow-right"></i></p>
              <p class="tip2">2月 <span>春节</span><br><i class="el-icon-arrow-down"></i></p>
              <p class="tip3"><i class="el-icon-arrow-left"></i>11月 <span>双11</span></p>
            </div>
            <div class="step1">
              <el-steps :active="1" finish-status="success" align-center>
                <el-step title="潜客"></el-step>
                <el-step title="游客"></el-step>
                <el-step title="用户"></el-step>
                <el-step title="客户"></el-step>
              </el-steps>
              <i class="el-icon-arrow-left"></i>
            </div>
            <div class="step2">
              <el-steps :active="2" finish-status="success" align-center>
                <el-step title="潜客"></el-step>
                <el-step title="游客"></el-step>
                <el-step title="用户"></el-step>
                <el-step title="客户"></el-step>
              </el-steps>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="charts">
          <div id="charts-team-insur"></div>
        </div>
      </div>
      <div class="group-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.name" clearable size="mini" placeholder="分群名搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="mini">导入规则</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/add-analysis-rules">
              <el-button type="success" size="mini">创建分群规则</el-button>
            </router-link>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="分群名称">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="触发时间">
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
            label="操作">
            <template slot-scope="scope">
              <span class="table-item-lnk"><i class="el-icon-edit" style="color: #67c23a"></i></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ECharts from 'echarts'


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
  private formInline: any = {
    name: ''
  }
  private option: any = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        type: 'pie',
        radius : '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: [
          {value: 535, name: '团险'},
          {value: 510, name: '个险'},
          {value: 634, name: '车险'},
          {value: 735, name: '寿险'}
        ]
      }
    ]
  }
  private mounted () {
    this.$nextTick( () => {
      const dom = ECharts.init(document.getElementById('charts-team-insur'))
      dom.setOption(this.option)
    })
  }
}
</script>
<style lang="scss">
@import "../../assets/scss/variable.scss";
.team-insur-center {
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
      .download-icon {
        float: right;
        margin-right: 10px;
      }
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
  padding-top: 10px;
  display: flex;
  background-color: $bg-color;
  .carousel-tip {
    flex: 1;
    text-align: left;
    p {
      margin: 7px 40px;
    }
    .tip-title {
      font-size: 14px;
      font-weight: 600;
    }
    .tip-msg {
      font-size: 12px;
      color: #858181;
    }
  }
  .el-carousel {
    flex: 4;
    .el-carousel__item {
      border-radius: 5px;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.step1 {
  margin-bottom: 20px;
  position: absolute;
  top: -15px;
  left: 110px;
  background: #fff;
  padding-left: 25px;
  .el-icon-arrow-left {
    float: right;
    position: absolute;
    right: -6px;
    top: 5px;
    color: #67c23a;
    font-weight: 900;
  }
}
.step1,.step2 {
  width: 68%;
  float: right;
  margin-right: 62px;
}
.step2 {
  padding-top: 35px;
  .el-icon-arrow-right {
    position: absolute;
    bottom: -10px;
    font-weight: 900;
    color: #67c23a;
  }
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
.group-box {
  margin-top: 10px;
  padding: 5px;
  background-color: $bg-color;
  .el-form {
    text-align: right;
    background-color: #fff;
    border-bottom: 2px solid $bg-color;
    padding-top: 10px;
  }
}
.el-step {
  .is-success {
    .el-icon-check:before {
      background-color: #67c23a;
      border-radius: 50%;
    }
    .is-text {
      background-color: #67c23a;
      margin-top: -3px;
    }
  }
  .el-step__icon {
    width: 15px;
    height: 15px;
    font-size: 12px;
  }
  .el-step__title {
    font-size: 12px;
    line-height: 25px;
  }
}
.charts-view {
  display: flex;
  border: 5px solid $bg-color;
  margin-top: 10px;
  .charts-step-wrap {
    flex: 5;
    .step-box {
      margin: 50px 0 40px 85px;
      border: 2px dashed #cccccc;
      padding: 20px;
      position: relative;
      .step-name {
        position: absolute;
        top: -24px;
        left: -85px;
        font-size: 13px;
        z-index: 100;
        background: #fff;
        padding: 13px 50px 15px 7px;
      }
    }
  }
  .charts {
    flex: 2;
  }
}
.month-tip {
  p {
    position: absolute;
    font-size: 12px;
    color: #7b7a7a;
    span{
      color: red;
    }
  }
  .tip {
    top: 27%;
    right: 9%;
  }
  .tip1 {
    top: 68%;
    left: -78px;
  }
  .tip2 {
    top: -30%;
    right: 5px;
  }
  .tip3 {
    bottom: 0%;
    right: -65px;
  }
}
#charts-team-insur {
  width: 80%;
  height: 80%;
  float: right;
  margin-top: 18px;
}
</style>

