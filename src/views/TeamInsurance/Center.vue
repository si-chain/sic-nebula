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
                <p class="tip-msg"><IOdometer :value="1020"></IOdometer></p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="开门红" :showTooltip="true" fontSize="14px"></title-item>

                  <div class="time">保全次数：<IOdometer class="num" :value="112"></IOdometer>次</div>
                  <div class="time">理赔服务次数：<IOdometer class="num" :value="162"></IOdometer>次</div>
                  <div class="time">累计服务金额：<IOdometer class="num" :value="290832"></IOdometer>元</div>
                  <div class="time">用户总次数：<IOdometer class="num" :value="862"></IOdometer>次</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="个险运营" :showTooltip="true" fontSize="14px"></title-item>

                  <div class="time">投保次数：<IOdometer class="num" :value="112"></IOdometer>次</div>
                  <div class="time">服务次数：<IOdometer class="num" :value="162"></IOdometer>次</div>
                  <div class="time">累计服务金额：<IOdometer class="num" :value="290832"></IOdometer>元</div>
                  <div class="time">用户总数：<IOdometer class="num" :value="862"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="车险运营" :showTooltip="true" fontSize="14px"></title-item>

                  <div class="time">本周：<IOdometer class="num" :value="12"></IOdometer>辆</div>
                  <div class="time">上周：<IOdometer class="num" :value="22"></IOdometer>辆</div>
                  <div class="time">本年：<IOdometer class="num" :value="1532"></IOdometer>辆</div>
                  <div class="time">去年：<IOdometer class="num" :value="862"></IOdometer>辆</div>
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
      
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="事件分析" :showTooltip="true" fontSize="12px"></title-item>
        <!-- <span class="download-icon"><i class="el-icon-download"></i></span> -->
      </div>
      <div class="event-box">
        <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;margin-top: 10px">
          <el-col :span="8" class="srcoll-box">
            <vueSeamlessScroll :data="userEvents" :class-option="scrollOption">
              <ul class="rowup">
                <li :key="index" v-for="(item,index) in userEvents">
                  <span class="name">{{item.agentName}}</span>
                  </span>
                  <el-tooltip class="tooltip" effect="dark" :content="item.productName" placement="top-start">
                    <el-button size="mini">{{interceptionRender(item.productName)}}</el-button>
                  </el-tooltip>
                  <span class="event">{{separatorRender(item.totalPremium)}}</span>
                </li>
              </ul>
            </vueSeamlessScroll>
          </el-col>
          <el-col :span="8">
            <div id="funnel-charts4" class="funnel-charts"></div>
          </el-col>
          <el-col :span="8">
            <div id="funnel-charts5" class="funnel-charts"></div>
          </el-col>
        </el-row>
      </div>
    </div>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ECharts from 'echarts'
import vueSeamlessScroll from 'vue-seamless-scroll'


@Component({
  components: {
    vueSeamlessScroll
  }
})
export default class Article extends Vue {
  private month: string = ''
  private selectDate: string = ''
  private userEvents: any[] = [
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    },
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    },
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    },
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    },
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    },
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    },
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    },
    {
      uid: 1414,
      agentName: "王海丰",
      gid: 480,
      agencyName: "天道",
      companyNo: "963",
      productId: "202",
      productName: "泰康乐安康终身重大疾病保险",
      totalAmount: 500000,
      totalPremium: 6712.2
    }
  ]
  // 用户事件
  private userEventsOptions: any = {
    title: {
      text: '用户事件总量',
      textStyle: {
        fontSize: 14
      },
      subtext: '总停留时长/总访客数'
    },
    legend: {
        data: ['本周', '上周']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '本周',
        data: [300, 409, 605, 926, 924, 725, 106, 69],
        type: 'line'
      },
      {
        name: '上周',
        data: [407, 739, 660, 225, 975, 870, 940, 513],
        type: 'line'
      }
    ]
  }
  private userEventsOptions1: any = {
    title: {
      text: '用户事件分类',
      textStyle: {
        fontSize: 14
      },
      subtext: '总停留时长/总访客数'
    },
    legend: {
        data: ['本周', '上周']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '本周',
        data: [46, 70, 81, 82, 21, 49, 31, 27],
        type: 'line'
      },
      {
        name: '上周',
        data: [53, 26, 89, 58, 27, 79, 68, 64],
        type: 'line'
      }
    ]
  }
  private userEventsOptionsArr: any[] = []
  // 滚动参数设置
  private scrollOption: object = {
      step: 0.2, // 步长 越大滚动速度越快
      limitMoveNum: this.userEvents.length - 1, // 启动无缝滚动最小数据量 this.dataList.length
      hoverStop: true, // 是否启用鼠标hover控制
      direction: 1, // 1 往上 0 往下
      openWatch: true, // 开启data实时监听
      singleHeight: 0, // 单条数据高度有值hoverStop关闭
      waitTime: 1000 // 单步停止等待时间
  }
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
  private funnelOptions1: any = {
    title: {
      text: '个险运营'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    legend: {
      data: ['客户', '潜客', '游客', '用户']
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
            position: 'inside',
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
          {value: 100, name: '潜客'},
          {value: 90, name: '游客'},
          {value: 60, name: '用户'},
          {value: 30, name: '客户'}
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
            position: 'inside',
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
          {value: 68, name: '潜客'},
          {value: 34, name: '游客'},
          {value: 17, name: '用户'},
          {value: 4, name: '客户'}
        ]
      }
    ]
  }
  private funnelOptions2: any = {
    title: {
      text: '车险运营'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    legend: {
      data: ['客户', '潜客', '游客', '用户']
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
            position: 'inside',
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
          {value: 100, name: '潜客'},
          {value: 85, name: '游客'},
          {value: 55, name: '用户'},
          {value: 20, name: '客户'}
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
            position: 'inside',
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
          {value: 94, name: '潜客'},
          {value: 66, name: '游客'},
          {value: 38, name: '用户'},
          {value: 19, name: '客户'}
        ]
      }
    ]
  }
  private funnelOptions: any = {
    title: {
      text: '开门红'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    legend: {
      data: ['客户', '潜客', '游客', '用户']
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
            position: 'inside',
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
          {value: 96, name: '潜客'},
          {value: 90, name: '游客'},
          {value: 60, name: '用户'},
          {value: 30, name: '客户'}
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
            position: 'inside',
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
          {value: 85, name: '潜客'},
          {value: 74, name: '游客'},
          {value: 32, name: '用户'},
          {value: 11, name: '客户'}
        ]
      }
    ]
  }
  private mounted () {
    this.$nextTick( () => {
      const dom1 = ECharts.init(document.getElementById('funnel-charts1'))
      dom1.setOption(this.funnelOptions)
      const dom2 = ECharts.init(document.getElementById('funnel-charts2'))
      dom2.setOption(this.funnelOptions1)
      const dom3 = ECharts.init(document.getElementById('funnel-charts3'))
      dom3.setOption(this.funnelOptions2)
      const dom4 = ECharts.init(document.getElementById('funnel-charts4'))
      dom4.setOption(this.userEventsOptions)
      const dom5 = ECharts.init(document.getElementById('funnel-charts5'))
      dom5.setOption(this.userEventsOptions1)
    })
  }
  private separatorRender (num: any): string {
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    return (`${num}''`).replace(reg, '$&,')
  }
  private interceptionRender (name: any): string {
    let text = name
    if (name.length > 11) {
      text = `${name.substring(0, 10)}***`
    }
    return text
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
  .srcoll-box {
    height: 300px;
    overflow: hidden;
    border: 1px solid $bg-color;
    padding: 5px;
    border-radius: 5px;
    .rowup {
      li:nth-child(2n) {
        background: $bg-color;
      }
      li {
        // display: flex;
        // justify-content: space-between;
        line-height: 43px;
        height: 43px;
        .name {
          margin-right: 10px;
          text-align: center;
          font-size: 12px;
        }
        .event {
          font-size: 12px;
          color: #606266;
          text-align: center;
          margin-left: 10px;
        }
      }
    }
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
    .num {
      font-size: 20px;
      font-weight: 500;
      display: inline-block;
      padding: 0 6px;
    }
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

