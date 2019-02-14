<template>
  <div class="data-center" ref="content">
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="运营视窗" fontSize="12px"></title-item>
      </div>
      <div class="grid">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <!-- <div class="grid-title">团财险运营</div> -->
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="团财险运营"  fontSize="14px"></title-item>

              <div class="time">保全次数：
                <a target="_black" href="http://channel.17doubao.com/perservation/list?current=1&size=10"><IOdometer class="num" :value="1022"></IOdometer></a>次
              </div>
              <div class="time">理赔服务次数：
                <a target="_black" href="http://channel.17doubao.com/perservation/list?current=1&size=10"><IOdometer class="num" :value="488575"></IOdometer></a>次
              </div>
              <div class="time">累计服务金额：
                <IOdometer class="num" :value="28292268"></IOdometer>万
              </div>
              <div class="time">用户总数：<IOdometer class="num" :value="624091"></IOdometer>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="个险运营"  fontSize="14px"></title-item>

              <div class="time">投保次数：
                <a target="_black" href="https://s.17doubao.com/life/policy"><IOdometer class="num" :value="86"></IOdometer></a>次
              </div>
              <div class="time">续期提醒服务：<IOdometer class="num" :value="53"></IOdometer>次</div>
              <div class="time">累计保费：<IOdometer class="num" :value="1082692"></IOdometer>元</div>
              <div class="time">用户总数：
                <a target="_black" href="https://s.17doubao.com/customer/manage"><IOdometer class="num" :value="1578"></IOdometer></a>人
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="车险运营"  fontSize="14px"></title-item>

              <div class="time">本周：
                <a target="_black" href="https://s.17doubao.com/car/policy?tab=offline"><IOdometer class="num" :value="560"></IOdometer></a>辆
              </div>
              <div class="time">上周：
                <a target="_black" href="https://s.17doubao.com/car/policy?tab=offline"><IOdometer class="num" :value="884"></IOdometer></a>辆
              </div>
              <div class="time">本年：
                <a target="_black" href="https://s.17doubao.com/car/policy?tab=offline"><IOdometer class="num" :value="18801"></IOdometer></a>辆
              </div>
              <div class="time">去年：
                <a target="_black" href="https://s.17doubao.com/car/policy?tab=offline"><IOdometer class="num" :value="409204"></IOdometer></a>辆
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <title-item class="help-item-title-left" backgroundColor="#ffffff" name="体检运营"  fontSize="14px"></title-item>

              <div class="time">预约人次：
                <a target="_black" href="http://qd.17doubao.com/?mid=187"><IOdometer class="num" :value="26628"></IOdometer></a>
              次</div>
              <div class="time">总签约人数：<IOdometer class="num" :value="46384"></IOdometer>人</div>
              <div class="time">总服务企业数量：<IOdometer class="num" :value="187"></IOdometer>家</div>
              <div class="time">总服务金额：<IOdometer class="num" :value="8956020"></IOdometer>元</div>
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
              <div class="grid-title">(团)30-40岁群</div>
              <div class="time">五一7天送意外卡<span class="custom-button" @click="showUser(85)"><IOdometer :value="85"></IOdometer></span>人</div>
              <div class="time">国庆北京地区体检打八折<span class="custom-button" @click="showUser(121)"><IOdometer :value="121"></IOdometer></span>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" style="background: #feb822">
              <div class="grid-title">(团)理赔客户（家庭）</div>
              <div class="time">少儿重疾活动周<span class="custom-button" @click="showUser(21)"><IOdometer :value="21"></IOdometer></span>人</div>
              <div class="time">国庆体检打八折-京<span class="custom-button" @click="showUser(45)"><IOdometer :value="45"></IOdometer></span>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" style="background: #f85959">
              <div class="grid-title">(车)b级小于20w(京群)</div>
              <div class="time">新春境外游卡单免费领<span class="custom-button"><IOdometer :value="0"></IOdometer></span>人</div>
              <div class="time">你购车，我加油<span class="custom-button" @click="showUser(322)"><IOdometer :value="322"></IOdometer></span>人</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" style="background: #82a6bd">
              <div class="grid-title">(车)a级大于50w(京)</div>
              <div class="time">直升机救援保险<span class="custom-button" @click="showUser(5)"><IOdometer :value="5"></IOdometer></span>人</div>
              <div class="time">五一境外旅意险500元<span class="custom-button" @click="showUser(85)"><IOdometer :value="85"></IOdometer></span>人</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="实时状况"  fontSize="12px"></title-item>
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
            <!-- <div class="charts-title">人均浏览量</div> -->
            <div class="charts-box">
              <div id="data-view2" class="data-view-charts"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <!-- <div class="charts-title">平均停留时长</div> -->
            <div class="charts-box">
              <div id="data-view3" class="data-view-charts"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="" :visible.sync="showUserLog">
      <UserList v-if="showUserLog" :maxsize="maxsize" @cancel="UserList = false"></UserList>
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
  private maxsize: number = 10
  private showUserLog: boolean = false
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
  private TimeSatus: any[] = [
    ['2018-01-03', 74], ['2018-01-04', 165], ['2018-01-05', 113], ['2018-01-06', 190], ['2018-01-07', 122], ['2018-01-10', 95], ['2018-01-11', 159], ['2018-01-12', 52], ['2018-01-13', 117], ['2018-01-14', 113], ['2018-01-15', 180], ['2018-01-16', 403], ['2018-01-17', 209], ['2018-01-18', 113], ['2018-01-19', 149], ['2018-01-21', 68], ['2018-01-22', 162], ['2018-01-23', 276], ['2018-01-24', 195], ['2018-01-26', 77], ['2018-01-27', 114], ['2018-01-28', 67], ['2018-01-29', 165], ['2018-01-30', 93], ['2018-01-31', 188], ['2018-02-01', 178], ['2018-02-02', 85], ['2018-02-05', 119], ['2018-02-06', 158], ['2018-02-07', 124], ['2018-02-08', 84], ['2018-02-10', 53], ['2018-02-11', 142], ['2018-02-12', 150], ['2018-02-13', 242], ['2018-02-14', 329], ['2018-02-15', 429], ['2018-02-16', 348], ['2018-02-17', 118], ['2018-02-18', 98], ['2018-02-19', 92], ['2018-02-20', 270], ['2018-02-21', 311], ['2018-02-22', 311], ['2018-02-23', 255], ['2018-02-24', 313], ['2018-02-25', 404], ['2018-02-28', 113], ['2018-03-01', 68], ['2018-03-02', 189], ['2018-03-03', 268], ['2018-03-04', 67], ['2018-03-07', 70], ['2018-03-08', 179], ['2018-03-09', 127], ['2018-03-10', 110], ['2018-03-11', 195], ['2018-03-13', 69], ['2018-03-14', 64], ['2018-03-15', 133], ['2018-03-16', 145], ['2018-03-17', 142], ['2018-03-18', 85], ['2018-03-19', 73], ['2018-03-21', 62], ['2018-03-22', 86], ['2018-03-23', 186], ['2018-03-24', 271], ['2018-03-25', 255], ['2018-03-26', 331], ['2018-03-27', 285], ['2018-03-28', 169], ['2018-03-29', 63], ['2018-03-30', 77], ['2018-03-31', 183], ['2018-04-01', 147], ['2018-04-02', 133], ['2018-04-03', 66], ['2018-04-04', 91], ['2018-04-05', 68], ['2018-04-06', 98], ['2018-04-07', 135], ['2018-04-08', 223], ['2018-04-09', 156], ['2018-04-10', 246], ['2018-04-11', 83], ['2018-04-12', 133], ['2018-04-13', 212], ['2018-04-14', 270], ['2018-04-15', 109], ['2018-04-16', 90], ['2018-04-17', 124], ['2018-04-18', 182], ['2018-04-19', 84], ['2018-04-20', 84], ['2018-04-21', 73], ['2018-04-22', 85], ['2018-04-23', 156], ['2018-04-24', 156], ['2018-04-25', 163], ['2018-04-26', 69], ['2018-04-27', 74], ['2018-04-28', 83], ['2018-04-29', 122], ['2018-04-30', 139], ['2018-05-01', 156], ['2018-05-03', 93], ['2018-05-04', 57], ['2018-05-05', 54], ['2018-05-06', 105], ['2018-05-07', 82], ['2018-05-08', 104], ['2018-05-09', 84], ['2018-05-10', 69], ['2018-05-12', 74], ['2018-05-13', 86], ['2018-05-14', 59], ['2018-05-15', 122], ['2018-05-16', 92], ['2018-05-17', 124], ['2018-05-18', 171], ['2018-05-19', 146], ['2018-05-20', 113], ['2018-05-21', 170], ['2018-05-22', 183], ['2018-05-23', 140], ['2018-05-24', 104], ['2018-05-25', 91], ['2018-05-26', 77], ['2018-05-27', 107], ['2018-05-28', 121], ['2018-05-29', 120], ['2018-05-30', 192], ['2018-05-31', 177], ['2018-06-01', 130], ['2018-06-02', 90], ['2018-06-03', 117], ['2018-06-04', 124], ['2018-06-05', 157], ['2018-06-06', 103], ['2018-06-07', 51], ['2018-06-08', 70], ['2018-06-09', 87], ['2018-06-10', 95], ['2018-06-11', 74], ['2018-06-12', 90], ['2018-06-13', 116], ['2018-06-14', 165], ['2018-06-15', 178], ['2018-06-16', 178], ['2018-06-17', 104], ['2018-06-18', 116], ['2018-06-19', 116], ['2018-06-20', 84], ['2018-06-21', 96], ['2018-06-22', 91], ['2018-06-23', 115], ['2018-06-24', 161], ['2018-06-25', 138], ['2018-06-26', 163], ['2018-06-27', 68], ['2018-06-28', 77], ['2018-06-29', 161], ['2018-06-30', 185], ['2018-07-01', 172], ['2018-07-02', 80], ['2018-07-03', 248], ['2018-07-04', 237], ['2018-07-05', 165], ['2018-07-06', 256], ['2018-07-07', 216], ['2018-07-08', 134], ['2018-07-09', 63], ['2018-07-10', 114], ['2018-07-11', 77], ['2018-07-12', 80], ['2018-07-13', 64], ['2018-07-14', 156], ['2018-07-15', 140], ['2018-07-16', 133], ['2018-07-17', 186], ['2018-07-18', 182], ['2018-07-19', 106], ['2018-07-20', 119], ['2018-07-21', 68], ['2018-07-22', 54], ['2018-07-23', 82], ['2018-07-24', 90], ['2018-07-25', 134], ['2018-07-26', 188], ['2018-07-27', 194], ['2018-07-28', 159], ['2018-07-29', 159], ['2018-07-30', 169], ['2018-07-31', 244], ['2018-08-01', 199], ['2018-08-02', 163], ['2018-08-03', 149], ['2018-08-05', 80], ['2018-08-06', 67], ['2018-08-07', 162], ['2018-08-08', 140], ['2018-08-09', 143], ['2018-08-10', 125], ['2018-08-11', 76], ['2018-08-12', 119], ['2018-08-13', 70], ['2018-08-14', 104], ['2018-08-15', 109], ['2018-08-16', 159], ['2018-08-17', 124], ['2018-08-18', 135], ['2018-08-19', 150], ['2018-08-20', 164], ['2018-08-21', 169], ['2018-08-22', 83], ['2018-08-23', 155], ['2018-08-24', 75], ['2018-08-25', 59], ['2018-08-26', 78], ['2018-08-27', 136], ['2018-08-28', 103], ['2018-08-29', 104], ['2018-08-30', 176], ['2018-08-31', 89], ['2018-09-01', 127], ['2018-09-03', 54], ['2018-09-04', 100], ['2018-09-05', 140], ['2018-09-06', 186], ['2018-09-07', 200], ['2018-09-08', 61], ['2018-09-09', 109], ['2018-09-10', 111], ['2018-09-11', 114], ['2018-09-12', 97], ['2018-09-13', 94], ['2018-09-14', 66], ['2018-09-15', 54], ['2018-09-16', 87], ['2018-09-17', 80], ['2018-09-18', 84], ['2018-09-19', 117], ['2018-09-20', 168], ['2018-09-21', 129], ['2018-09-22', 127], ['2018-09-23', 64], ['2018-09-24', 60], ['2018-09-25', 144], ['2018-09-26', 170], ['2018-09-27', 58], ['2018-09-28', 87], ['2018-09-29', 70], ['2018-09-30', 53], ['2018-10-01', 92], ['2018-10-02', 78], ['2018-10-03', 123], ['2018-10-04', 95], ['2018-10-05', 54], ['2018-10-06', 68], ['2018-10-07', 200], ['2018-10-08', 314], ['2018-10-09', 379], ['2018-10-10', 346], ['2018-10-11', 233], ['2018-10-14', 80], ['2018-10-15', 73], ['2018-10-16', 76], ['2018-10-17', 132], ['2018-10-18', 211], ['2018-10-19', 289], ['2018-10-20', 250], ['2018-10-21', 82], ['2018-10-22', 99], ['2018-10-23', 163], ['2018-10-24', 267], ['2018-10-25', 353], ['2018-10-26', 78], ['2018-10-27', 72], ['2018-10-28', 88], ['2018-10-29', 140], ['2018-10-30', 206], ['2018-10-31', 204], ['2018-11-01', 65], ['2018-11-03', 59], ['2018-11-04', 150], ['2018-11-05', 79], ['2018-11-07', 63], ['2018-11-08', 93], ['2018-11-09', 80], ['2018-11-10', 95], ['2018-11-11', 59], ['2018-11-13', 65], ['2018-11-14', 77], ['2018-11-15', 143], ['2018-11-16', 98], ['2018-11-17', 64], ['2018-11-18', 93], ['2018-11-19', 282], ['2018-11-23', 155], ['2018-11-24', 94], ['2018-11-25', 196], ['2018-11-26', 293], ['2018-11-27', 83], ['2018-11-28', 114], ['2018-11-29', 276], ['2018-12-01', 54], ['2018-12-02', 65], ['2018-12-03', 51], ['2018-12-05', 62], ['2018-12-06', 89], ['2018-12-07', 65], ['2018-12-08', 82], ['2018-12-09', 276], ['2018-12-10', 153], ['2018-12-11', 52], ['2018-12-13', 69], ['2018-12-14', 113], ['2018-12-15', 82], ['2018-12-17', 99], ['2018-12-19', 53], ['2018-12-22', 103], ['2018-12-23', 100], ['2018-12-25', 73], ['2018-12-26', 155], ['2018-12-27', 243], ['2018-12-28', 155], ['2018-12-29', 125], ['2018-12-30', 65], ['2019-01-01', 65], ['2019-01-02', 79], ['2019-01-03', 200], ['2019-01-04', 226], ['2019-01-05', 122], ['2019-01-06', 60], ['2019-01-07', 85], ['2019-01-08', 190], ['2019-01-09', 105], ['2019-01-10', 208], ['2019-01-11', 59], ['2019-01-12', 160], ['2019-01-13', 211], ['2019-01-14', 265], ['2019-01-15', 386], ['2019-01-16', 118], ['2019-01-17', 89], ['2019-01-18', 94], ['2019-01-19', 77], ['2019-01-20', 113], ['2019-01-22', 143], ['2019-01-23', 257], ['2019-01-24', 117], ['2019-01-25', 185], ['2019-01-26', 119], ['2019-01-28', 65], ['2019-01-29', 87], ['2019-01-31', 60], ['2019-02-01', 108], ['2019-02-02', 188], ['2019-02-03', 143], ['2019-02-05', 62], ['2019-02-06', 100], ['2019-02-09', 152], ['2019-02-10', 166], ['2019-02-11', 55], ['2019-02-12', 59], ['2019-02-13', 175], ['2019-02-14', 293], ['2019-02-15', 326], ['2019-02-16', 153], ['2019-02-18', 73], ['2019-02-19', 267], ['2019-02-20', 183], ['2019-02-21', 394], ['2019-02-22', 158], ['2019-02-23', 86], ['2019-02-24', 207]
  ]
  private LeftOption: any = {
    title: {
      text: '事件统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: this.TimeSatus.map(item => {
        return item[0]
      })
    },
    yAxis: {
      splitLine: {
        show: false
      }
    },
    dataZoom: [{
      startValue: '2018-09-03'
    }, {
        type: 'inside'
    }],
    visualMap: {
        top: 10,
        right: 10,
        pieces: [{
            gt: 0,
            lte: 50,
            color: '#096'
        }, {
            gt: 50,
            lte: 100,
            color: '#ffde33'
        }, {
            gt: 100,
            lte: 150,
            color: '#ff9933'
        }, {
            gt: 150,
            lte: 200,
            color: '#cc0033'
        }, {
            gt: 200,
            lte: 300,
            color: '#660099'
        }, {
            gt: 300,
            color: '#7e0023'
        }],
        outOfRange: {
            color: '#999'
        }
    },
    series: {
      type: 'line',
      data: this.TimeSatus.map(item => {
        return item[1]
      }),
      markLine: {
          silent: true,
          data: [{
              yAxis: 50
          }, {
              yAxis: 100
          }, {
              yAxis: 150
          }, {
              yAxis: 200
          }, {
              yAxis: 300
          }]
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
  private showUser (val: number) {
    this.maxsize = val
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
.custom-button {
  background: none;
}
</style>

