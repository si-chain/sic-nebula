<template>
  <div class="team-insur-center" ref="content">
    <div class="on-tiome clearfix item team-insure">
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
          <router-link to="/add-analysis-task">
            <el-button type="success" style="margin-left: 15px;" size="mini">添加</el-button>
          </router-link>
        </div>
      </div>
      <el-carousel indicator-position="none" height="205px" :autoplay="false">
        <el-carousel-item v-for="item in 3" :key="item">
          <div class="team-carousel-box clearfix">
            <div class="team-carousel-tip">
                <p class="tip-title" style="margin-top: 12px;">数据源</p>
                <p class="tip-msg">智能团筛亚健康组</p>
                <p class="tip-title">创建时间</p>
                <p class="tip-msg">2018-10-12</p>
                <p class="tip-title">用户总量</p>
                <p class="tip-msg">1020</p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="开门红" :showTooltip="true" fontSize="14px"></title-item>

                  <div class="time">保全次数：<span class="num">112</span>次</div>
                  <div class="time">理赔服务次数：<span class="num">162</span>次</div>
                  <div class="time">累计服务金额：<span class="num">290832</span>元</div>
                  <div class="time">用户总次数：<span class="num">862</span>次</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="个险运营" :showTooltip="true" fontSize="14px"></title-item>

                  <div class="time">投保次数：<span class="num">112</span>次</div>
                  <div class="time">服务次数：<span class="num">162</span>次</div>
                  <div class="time">累计服务金额：<span class="num">290832</span>元</div>
                  <div class="time">用户总数：<span class="num">862</span>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="车险运营" :showTooltip="true" fontSize="14px"></title-item>

                  <div class="time">本周：<span class="num">12</span>辆</div>
                  <div class="time">上周：<span class="num">22</span>辆</div>
                  <div class="time">本年：<span class="num">1532</span>辆</div>
                  <div class="time">去年：<span class="num">862</span>辆</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="on-tiome clearfix item" style="margin-top: 0">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="任务筛选日志" :showTooltip="true" fontSize="12px"></title-item>
        <!-- <span class="download-icon"><i class="el-icon-download"></i></span> -->
      </div>
      <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;margin-top: 10px">
        <el-col :span="8">
          <div id="funnel-charts1" class="funnel-charts"></div>
        </el-col>
        <el-col :span="8">
          <div id="funnel-charts2" class="funnel-charts"></div>
        </el-col>
        <el-col :span="8">
          <div id="funnel-charts3" class="funnel-charts"></div>
        </el-col>
      </el-row>
      <div class="group-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.name" clearable size="mini" placeholder="分群名搜索"></el-input>
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
  private funnelOptions: any = {
    title: {
      text: '漏斗图'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    legend: {
      data: ['客户','潜客','游客','用户']
    },
    series: [
      {
        name: '预期',
        type: 'funnel',
        left: '10%',
        width: '80%',
        label: {
          normal: {
            formatter: '{b}'
          },
          emphasis: {
            position:'inside',
            formatter: '{b}: {c}%'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            opacity: 0.7
          }
        },
        data: [
          {value: 60, name: '潜客'},
          {value: 40, name: '游客'},
          {value: 20, name: '用户'},
          {value: 80, name: '客户'}
        ]
      },
      {
        name: '实际',
        type: 'funnel',
        left: '10%',
        width: '80%',
        maxSize: '80%',
        label: {
          normal: {
            position: 'inside',
            formatter: '{c}%',
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            position:'inside',
            formatter: '{b}实际: {c}%'
          }
        },
        itemStyle: {
          normal: {
            opacity: 0.5,
            borderColor: '#fff',
            borderWidth: 2
          }
        },
        data: [
          {value: 30, name: '潜客'},
          {value: 10, name: '游客'},
          {value: 5, name: '用户'},
          {value: 50, name: '客户'}
        ]
      }
    ]
  }
  private mounted () {
    this.$nextTick( () => {
      const dom1 = ECharts.init(document.getElementById('funnel-charts1'))
      dom1.setOption(this.funnelOptions)
      const dom2 = ECharts.init(document.getElementById('funnel-charts2'))
      dom2.setOption(this.funnelOptions)
      const dom3 = ECharts.init(document.getElementById('funnel-charts3'))
      dom3.setOption(this.funnelOptions)
    })
  }
}
</script>
<style lang="scss" scoped>
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
    background-color: #ffffff;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #ffffff;
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
  // .charts-view {
  //   display: flex;
  //   border: 5px solid $bg-color;
  //   margin-top: 10px;
  .el-row {
    // padding: 10px 0;
    // background: #ebebeb;
  }
  .funnel-charts {
    height: 300px;
    border: 1px solid $bg-color;
    padding: 10px 0;
    padding-top: 17px;
    border-radius: 5px;
  }
  // }
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
}
.team-insure {
  .team-carousel-box {
    margin-top: 10px;
    padding: 10px 0;
    display: flex;
    background-color: $bg-color;
    .team-carousel-tip {
      width: 200px;
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
    .el-row {
      flex: 1;
      // .el-carousel__item {
      //   border-radius: 5px;
      // }
    }
  }
  .grid-content {
    height: auto;
    border: 1px solid $bg-color;
    border-radius: 5px;
    margin-right: 10px;
    text-align: left;
    padding-left: 22px;
    background: #ffffff;
    .help-item-title-left {
      padding: 10px 0 10px  0px;
      margin-left: -3px;
    }
  }
  .grid-title {
    line-height: 40px;
    font-size: 22px;
    font-weight: 700;
  }
  .time {
    line-height: 30px;
    font-size: 12px;
    color: #999;
    margin-left: 5px;
  }
  .tip {
    font-size: 12px;
    line-height: 30px;
  }
  .number {
    font-size: 18px;
    font-weight: 700;
    color: #67c23a;
    line-height: 25px;
    margin-top: 5px;
  }
}
</style>

