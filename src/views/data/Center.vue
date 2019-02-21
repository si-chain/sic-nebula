<template>
  <div class="data-center" ref="content">
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="运营视窗" fontSize="12px"></title-item>
      </div>
      <div class="grid">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="团财险运营"  fontSize="14px"></title-item>
              <div class="time">
                <div class="time-title">
                  保全
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="102"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="success">-3.91%</span>
                    环比 <span class="success">-5.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  理赔
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="12460"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+5.91%</span>
                    环比 <span class="success">-1.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  赔付金额
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="107642"></IOdometer>元
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+6.25%</span>
                    环比 <span class="success">-0.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  赔付用户
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="9431"></IOdometer>人
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+9.24%</span>
                    环比 <span class="success">-1.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="个险运营"  fontSize="14px"></title-item>

              <div class="time">
                <div class="time-title">
                  出单
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="86"></IOdometer>单
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+10.2%</span>
                    环比 <span class="error">+3.4%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  续期提醒
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="32"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+8.91%</span>
                    环比 <span class="error">-6.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  投保金额
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="1082692"></IOdometer>元
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+10.25%</span>
                    环比 <span class="error">+5.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  投保用户
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="62"></IOdometer>人
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+9.24%</span>
                    环比 <span class="success">-2.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="车险运营"  fontSize="14px"></title-item>

              <div class="time">
                <div class="time-title">
                  在线询价
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="4913"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="success">-3.91%</span>
                    环比 <span class="success">-5.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  在线出单
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="910"></IOdometer>辆
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+5.91%</span>
                    环比 <span class="success">-1.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  线下投保
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="7856"></IOdometer>辆
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+5.91%</span>
                    环比 <span class="success">-1.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  车险服务
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="302"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+5.91%</span>
                    环比 <span class="success">-1.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="体检运营"  fontSize="14px"></title-item>

              <div class="time">
                <div class="time-title">
                  签约
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="85"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+6.91%</span>
                    环比 <span class="success">-0.7%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  预约
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="95"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+5.1%</span>
                    环比 <span class="error">+0.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  企业数
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="5"></IOdometer>家
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+5.91%</span>
                    环比 <span class="success">-1.5%</span>
                  </div>
                </div>
              </div>
              <div class="time">
                <div class="time-title">
                  服务金额
                </div>
                <div class="time-info">
                  <div class="time-info-left">
                    <IOdometer class="num" :value="28575"></IOdometer>次
                  </div>
                  <div class="time-info-right">
                    同比 <span class="error">+3.11%</span>
                    环比 <span class="success">-1.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="核心事件" fontSize="12px"></title-item>
      </div>
      <div class="carousel-box">
        <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;">
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box" style="background: #11cd63">
              <div class="grid-title">(团)30-40岁组</div>
              <div class="time"><span class="custom-button link" @click="showUser('020308', '理赔疑义处理')">理赔疑义处理</span></div>
              <!-- <div class="time">国庆北京地区体检八折<span class="custom-button" @click="showUser(121)"><IOdometer :value="121"></IOdometer></span>人</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box" style="background: #feb822">
              <div class="grid-title">微信访问</div>
              <div class="time"><span class="custom-button link" @click="showUser('020807', '微信菜单点击')">微信菜单点击</span></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box" style="background: #f85959">
              <div class="grid-title">体检</div>
              <div class="time"><span class="custom-button link" @click="showUser('020309', '体检预约')">体检预约</span></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple hover-box" style="background: #82a6bd">
              <div class="grid-title">激活</div>
              <div class="time"><span class="custom-button link" @click="showUser('0207', '用户激活')">用户激活</span></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="实时状况"  fontSize="12px"></title-item>
      </div>
      <div class="view">
        <div class="view-left hover-box" id="help-center-charts"></div>
        <!-- <div class="view-right hover-box" id="help-center-charts1"></div> -->
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="流量看板" fontSize="12px"></title-item>
      </div>
      <div class="data-view">
        <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;">
          <el-col :span="8">
            <!-- <div class="charts-title">跳失率</div> -->
            <div class="charts-box hover-box">
              <div id="data-view1" class="data-view-charts"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <!-- <div class="charts-title">人均浏览量</div> -->
            <div class="charts-box hover-box">
              <div id="data-view2" class="data-view-charts"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <!-- <div class="charts-title">平均停留时长</div> -->
            <div class="charts-box hover-box">
              <div id="data-view3" class="data-view-charts"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog :title="title" width="800px" :visible.sync="showUserLog">
      <UserList v-if="showUserLog" :evt="evt" @cancel="UserList = false"></UserList>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ECharts from 'echarts'
import UserList from '../../components/userList.vue'

@Component({
  components: {
    UserList
  }
})
export default class Article extends Vue {
  private num: number[] = [8900, 1233, 3427, 2336]
  private num1: number[] = [192, 93, 213, 178]
  private evt: string = ''
  private title: string = ''
  private showUserLog: boolean = false
  private month: string = ''
  private notify: any = undefined

  private selectDate: string = ''
  private tableData: any[] = [
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
    title: {
      text: '事件统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: []
    },
    yAxis: {
      splitLine: {
        show: false
      }
    },
    dataZoom: [
      {startValue: '2018-09-03'},
      {type: 'inside'}
    ],
    visualMap: {
        top: 10,
        right: 10,
        pieces: [
          {gt: 0, lte: 50, color: '#096'},
          {gt: 50, lte: 100, color: '#ffde33'},
          {gt: 100, lte: 150, color: '#ff9933'},
          {gt: 150, lte: 200, color: '#cc0033'},
          {gt: 200, lte: 300, color: '#660099'},
          {gt: 300, color: '#7e0023'}
        ],
        outOfRange: {
          color: '#999'
        }
    },
    series: {
      type: 'line',
      data: [],
      markLine: {
          silent: true,
          data: [{yAxis: 50}, {yAxis: 100}, {yAxis: 150}, {yAxis: 200}, {yAxis: 300}]
      }
    }
  }
  private Rightoption = {
    legend: {
        data: ['活动A', '活动B', '活动C']
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
      data: ['(团)30-40岁群', '(团)理赔客户（家庭）', '(车)b级<20w(京群)', '(车)a级>50w(京)', '(个)40岁优质用户（家庭）', '(个)40岁优质用户（理财）']
    },
    series: [
      {
        name: '活动A',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [59, 312, 5, 459, 21, 85]
      },
      {
        name: '活动B',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [216, 415, 85, 322, 45, 121]
      },
      {
        name: '活动C',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [63, 210, 0, 0, 494, 259]
      }
    ]
  }
  private data1: any = {
    title: {
      text: '跳出率',
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
      text: '人均浏览量(s)',
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
        data: [12, 53, 20, 83, 29, 13, 92],
        type: 'line'
      },
      {
        name: '上周',
        data: [82, 93, 110, 33, 19, 63, 13],
        type: 'line'
      }
    ]
  }
  private data3: any = {
    title: {
      text: '平均停留时长(s)',
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
        data: [82, 93, 90, 93, 129, 133, 132],
        type: 'line'
      },
      {
        name: '上周',
        data: [52, 33, 10, 83, 29, 33, 82],
        type: 'line'
      }
    ]
  }
  private mounted () {
    this.$nextTick( async () => {
      const data = await this.$store.dispatch('mock/getDataCenter')
      this.LeftOption.xAxis.data = data.TimeSatus.map( (item: any) => {
        return item[0]
      })
      this.LeftOption.series.data = data.TimeSatus.map( (item: any) => {
        return item[1]
      })
      const dom = ECharts.init(document.getElementById('help-center-charts'))
      dom.setOption(this.LeftOption)
      const dataView1 = ECharts.init(document.getElementById('data-view1'))
      dataView1.setOption(this.data1)
      const dataView2 = ECharts.init(document.getElementById('data-view2'))
      dataView2.setOption(this.data2)
      const dataView3 = ECharts.init(document.getElementById('data-view3'))
      dataView3.setOption(this.data3)
    })
  }
  private showUser (val: string, title: string) {
    this.title = `${title}用户列表`
    this.evt = val
    this.showUserLog = true
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
  .time-info {
    // display: flex;
    // justify-content: space-between;
    .success {
      color: green
    }
    .error {
      color: red
    }
  }
  .grid {
    margin-top: 10px;
    .grid-content {
      height: auto;
      border: 1px solid $bg-color;
      border-radius: 5px;
      text-align: left;
      padding: 0 22px 22px 22px;
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
      border-bottom: 2px solid $bg-color;
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
.custom-button {
  background: none;
}
.dialog-class-box {
  width: 800px!important;
}
.hover-box {
  border: 1px solid $bg-color;
}
</style>

