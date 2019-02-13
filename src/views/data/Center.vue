<template>
  <div class="data-center" ref="content">
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="运营视窗" fontSize="12px"></title-item>
        <div class="select-box">
          <span class="select-lable">时间筛选</span>
           <el-date-picker
            v-model="selectDate"
            align="right"
            type="date"
            size="mini"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="grid">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <!-- <div class="grid-title">团财险运营</div> -->
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="团财险运营" :showTooltip="true" fontSize="14px"></title-item>

              <div class="time">保全次数：
              <IOdometer class="num" :value="65"></IOdometer>次</div>
              <div class="time">理赔服务次数：<IOdometer class="num" :value="162"></IOdometer>次</div>
              <div class="time">累计服务金额：<IOdometer class="num" :value="290832"></IOdometer>元</div>
              <div class="time">用户总次数：<IOdometer class="num" :value="862"></IOdometer>次</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="个险运营" :showTooltip="true" fontSize="14px"></title-item>

              <div class="time">投保次数：<IOdometer class="num" :value="112"></IOdometer>次</div>
              <div class="time">服务次数：<IOdometer class="num" :value="162"></IOdometer>次</div>
              <div class="time">累计服务金额：<IOdometer class="num" :value="290832"></IOdometer>元</div>
              <div class="time">用户总数：<IOdometer class="num" :value="862"></IOdometer>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="车险运营" :showTooltip="true" fontSize="14px"></title-item>

              <div class="time">本周：<IOdometer class="num" :value="12"></IOdometer>辆</div>
              <div class="time">上周：<IOdometer class="num" :value="22"></IOdometer>辆</div>
              <div class="time">本年：<IOdometer class="num" :value="1532"></IOdometer>辆</div>
              <div class="time">去年：<IOdometer class="num" :value="862"></IOdometer>辆</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="体检运营" :showTooltip="true" fontSize="14px"></title-item>

              <div class="time">预约人数：<IOdometer class="num" :value="1248"></IOdometer>人</div>
              <div class="time">总签约人数：<IOdometer class="num" :value="162"></IOdometer>次</div>
              <div class="time">总服务企业数量：<IOdometer class="num" :value="42"></IOdometer>家</div>
              <div class="time">查看数据：<IOdometer class="num" :value="68"></IOdometer>次</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="核心指标" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-refresh"></i></span>
      </div>
      <div class="carousel-box">
        <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="background: #11cd63">
              <div class="grid-title">智能团筛</div>
              <div class="time">2019春节活动激活<IOdometer :value="64"></IOdometer>人</div>
              <div class="time">2018双11活动激活<IOdometer :value="45"></IOdometer>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" style="background: #feb822">
              <div class="grid-title">体检40岁</div>
              <div class="time">2019体检卡活动优惠激活<IOdometer :value="76"></IOdometer>人</div>
              <div class="time">2019牙齿活动周激活<IOdometer :value="57"></IOdometer>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" style="background: #f85959">
              <div class="grid-title">车辆B级豪车</div>
              <div class="time">2019免费洗车卡激活<IOdometer :value="85"></IOdometer>人</div>
              <div class="time">2019到店看车打8折激活<IOdometer :value="206"></IOdometer>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" style="background: #82a6bd">
              <div class="grid-title">个险保费 > 50元</div>
              <div class="time">2019春游活动激活<IOdometer :value="302"></IOdometer>人</div>
              <div class="time">2019VIP活动周激活<IOdometer :value="353"></IOdometer>人</div>
            </div>
          </el-col>
        </el-row>
        <!-- <el-carousel :interval="4000" :autoplay="false" type="card" height="180px">
          <el-carousel-item>
            <div class="grid-content bg-purple" style="background: #11cd63">
              <i class="iconfont icon-card-insure"></i>
              <div class="grid-title">智能团筛（<span>894</span>人）</div>
              <div class="time">2019春节活动激活<span>65</span>人</div>
              <div class="time">2018双11活动激活<span>45</span>人</div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="grid-content bg-purple" style="background: #feb822">
              <i class="iconfont icon-card-insure"></i>
              <div class="grid-title">体检40岁（<span>462</span>人）</div>
              <div class="time">2019体检卡活动优惠激活<span>76</span>人</div>
              <div class="time">2019牙齿活动周激活<span>57</span>人</div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="grid-content bg-purple" style="background: #f85959">
              <i class="iconfont icon-card-insure"></i>
              <div class="grid-title">车辆B级豪车（<span>8454</span>辆）</div>
              <div class="time">2019免费洗车卡激活<span>85</span>人</div>
              <div class="time">2019到店看车打8折激活<span>206</span>人</div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="grid-content bg-purple" style="background: #82a6bd">
              <i class="iconfont icon-card-insure"></i>
              <div class="grid-title">个险保费>50元（<span>805</span>人）</div>
              <div class="time">2019春游活动激活<span>302</span>人</div>
              <div class="time">2019VIP活动周激活<span>353</span>人</div>
            </div>
          </el-carousel-item>
        </el-carousel> -->
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="实时状况" :showTooltip="true" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-refresh"></i></span>
      </div>
      <div class="view">
        <div class="view-left" id="help-center-charts"></div>
        <div class="view-right" id="help-center-charts1"></div>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="流量看板" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-refresh"></i></span>
      </div>
      <div class="data-view">
        <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;">
          <el-col :span="8">
            <!-- <div class="charts-title">跳失率</div> -->
            <div class="charts-box">
              <div id="data-view1" class="data-view-charts"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <!-- <div class="charts-title">跳失率</div> -->
            <div class="charts-box">
              <div id="data-view2" class="data-view-charts"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <!-- <div class="charts-title">跳失率</div> -->
            <div class="charts-box">
              <div id="data-view3" class="data-view-charts"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="转化看板" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-refresh"></i></span>
      </div>
    </div> -->
    <!-- <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="分群数据源" fontSize="12px"></title-item>
        <span class="download-icon"><i class="el-icon-refresh"></i></span>
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
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ECharts from 'echarts'


@Component
export default class Article extends Vue {
  private num: number[] = [8900, 1233, 3427, 2336]
  private num1: number[] = [192, 93, 213, 178]
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
  private LeftOption: any = {
    legend: {
      data: ['综合', '团险', '个险', '车险']
    },
    // toolbox: {
    //     show: true,
    //     // feature: {
    //     //     magicType: {show: true, type: ['stack', 'tiled']},
    //     //     saveAsImage: {show: true}
    //     // }
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '团险',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '个险',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '车险',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '综合',
        type: 'line',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320]
      }
    ]
  }
  private Rightoption = {
    legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis:  {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['智能团筛亚健康组', '智能体检筛查', '周三', '周四', '周五', '周六', '周日']
    },
    series: [
      {
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: '搜索引擎',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }
    ]
  }
  private data1: any = {
    title: {
      text: '跳失率',
      textStyle: {
        fontSize: 14
      },
      subtext: '访问活动后离开当前页面'
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
        data: [820, 932, 901, 234, 1290, 1330, 1320],
        type: 'line'
      },
      {
        name: '上周',
        data: [620, 132, 201, 134, 590, 130, 201],
        type: 'line'
      }
    ]
  }
  private data2: any = {
    title: {
      text: '人均浏览量',
      textStyle: {
        fontSize: 14
      },
      subtext: '浏览量/访客数'
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
        data: [120, 532, 201, 834, 290, 130, 920],
        type: 'line'
      },
      {
        name: '上周',
        data: [820, 932, 1101, 334, 190, 630, 1320],
        type: 'line'
      }
    ]
  }
  private data3: any = {
    title: {
      text: '平均停留时长',
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
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      },
      {
        name: '上周',
        data: [520, 332, 101, 834, 290, 330, 820],
        type: 'line'
      }
    ]
  }
  private mounted () {
    this.$nextTick( () => {
      const dom = ECharts.init(document.getElementById('help-center-charts'))
      dom.setOption(this.LeftOption)
      const dom1 = ECharts.init(document.getElementById('help-center-charts1'))
      dom1.setOption(this.Rightoption)
      const dataView1 = ECharts.init(document.getElementById('data-view1'))
      dataView1.setOption(this.data1)
      const dataView2 = ECharts.init(document.getElementById('data-view2'))
      dataView2.setOption(this.data2)
      const dataView3 = ECharts.init(document.getElementById('data-view3'))
      dataView3.setOption(this.data3)
    })
  }
}
</script>
<style lang="scss" scoped>
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
      .download-icon {
        float: right;
        margin-right: 10px;
      }
    }
  }
  .grid {
    margin-top: 10px;
    .grid-content {
      height: auto;
      border: 1px solid $bg-color;
      border-radius: 5px;
      text-align: left;
      padding-left: 22px;
      background: none;
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
  .view {
    display: flex;
    margin-top: 10px;
    div {
      flex: 1;
      height: 300px;
      border: 1px solid $bg-color;
      border-radius: 5px;
    }
    .view-left {
      margin-right: 5px;
    }
    .view-right {
      // background-color: $bg-color;
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
.carousel-box {
  .grid-content {
    color: #fff;
    border-radius: 5px;
    padding: 15px 0;
  }
  .icon-card-insure {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 24px;
  }
  .el-carousel__item {
    border-radius: 5px;
  }
  .bg-purple {
    height: 100%;
  }
  .grid-title {
    // line-height: 100px;
    // padding: 30px 0 10px 0;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .time {
    line-height: 26px;
    font-size: 14px;
    // margin-top: 15px;
  }
  span {
    color: #ffeb3b;
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    padding: 0 6px;
  }
}
.num {
  color: #38f;
  font-size: 20px;
  font-weight: 500;
  display: inline-block;
  padding: 0 6px;
}
.data-view {
  // height: 300px;
  .data-view-charts {
    height: 300px;
  }
  .charts-box {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid $bg-color;
    border-radius: 5px;
  }
}
</style>

