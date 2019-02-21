<template>
  <div class="team-insur-center" ref="content">
    <div class="on-tiome clearfix item team-insure">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="车险任务" backgroundColor="#67c23a" :showTooltip="false" fontSize="12px"></title-item>
        <div class="select-box">
          <el-button type="success" style="margin-left: 15px;" size="mini" disabled @click="showAddTask = true">添加</el-button>
        </div>
      </div>
      <el-carousel indicator-position="none" height="205px" :autoplay="false">
        <el-carousel-item>
          <div class="team-carousel-box clearfix">
            <div class="team-carousel-tip">
                <p class="tip-title" style="margin-top: 12px;">数据源</p>
                <p class="tip-msg">(车)b级小于20w(京群)</p>
                <p class="tip-title">创建时间</p>
                <p class="tip-msg">2018-12-12</p>
                <p class="tip-title">更新时间</p>
                <p class="tip-msg">2019-02-11</p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(车)b级小于20w(京群)', '直升机救援保险')">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="直升机救援保险" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-jinxingzhong"></span>
                  <div class="time">召回量：<span @click.stop="showUser(600, 159)"><IOdometer class="num" :value="159"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="49"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="9"></IOdometer>人 - 短信：<IOdometer class="num" :value="150"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(车)b级小于20w(京群)', '你购车，我加油')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="你购车，我加油" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-tuijian"></span>
                  <div class="time">召回量：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">未召回：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">分类：微信<span class="num" style="font-size: 14px">待进行</span> - 短信：<span class="num" style="font-size: 14px">待进行</span></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(车)b级小于20w(京群)', '新春境外游卡单免费领')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="新春境外游卡单免费领" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-wancheng"></span>
                  <div class="time">召回量：<span @click.stop="showUser(780, 36)"><IOdometer class="num" :value="36"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="219"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="12"></IOdometer>人 - 短信：<IOdometer class="num" :value="24"></IOdometer>人</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="team-carousel-box clearfix">
            <div class="team-carousel-tip">
                <p class="tip-title" style="margin-top: 12px;">数据源</p>
                <p class="tip-msg">(车)a级>50w(京)</p>
                <p class="tip-title">创建时间</p>
                <p class="tip-msg">2018-12-12</p>
                <p class="tip-title">更新时间</p>
                <p class="tip-msg">2019-02-11</p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(车)a级>50w(京)', '大众伴你行')">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="大众伴你行" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-jinxingzhong"></span>
                  <div class="time">召回量：<span @click.stop="showUser(800, 115)"><IOdometer class="num" :value="115"></IOdometer>人</span></div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="48"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="83"></IOdometer>人 - 短信：<IOdometer class="num" :value="32"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(车)a级>50w(京)', '五一境外旅意险500元')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="五一境外旅意险500元" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-tuijian"></span>
                  <div class="time">召回量：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">未召回：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">分类：微信<span class="num" style="font-size: 14px">待进行</span> - 短信：<span class="num" style="font-size: 14px">待进行</span></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(车)a级>50w(京)', '新春境外游卡单免费领')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="新春境外游卡单免费领" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-wancheng"></span>
                  <div class="time">召回量：<span @click.stop="showUser(900, 96)"><IOdometer class="num" :value="96"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="188"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="45"></IOdometer>人 - 短信：<IOdometer class="num" :value="51"></IOdometer>人</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="on-tiome clearfix item" >
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="任务筛选日志" :showTooltip="false" fontSize="12px"></title-item>
        <!-- <span class="download-icon"><i class="el-icon-download"></i></span> -->
      </div>
      <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;margin-top: 10px">
        <el-col :span="8" class="charts-box">
          <div class="charts-header-title">直升机救援保险</div>
          <div id="car-funnel-charts1" class="car-funnel-charts hover-box"></div>
        </el-col>
        <el-col :span="8" class="charts-box">
          <div class="charts-header-title">你购车，我加油</div>
          <div id="car-funnel-charts2" class="car-funnel-charts hover-box"></div>
        </el-col>
        <el-col :span="8" class="charts-box">
          <div class="charts-header-title">新春境外游卡单免费领</div>
          <div id="car-funnel-charts3" class="car-funnel-charts hover-box"></div>
        </el-col>
      </el-row>
      
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="车险事件分析" :showTooltip="false" fontSize="12px"></title-item>
        <!-- <span class="download-icon"><i class="el-icon-download"></i></span> -->
      </div>
      <div class="event-box">
        <el-row :gutter="20"  style="width: 100%; margin-left: 0px!important;margin-top: 10px">
          <el-col :span="8" class="">
            <vueSeamlessScroll class="srcoll-box hover-box" :data="userEvents" :class-option="scrollOption">
              <ul class="rowup">
                <li :key="index" v-for="(item,index) in userEvents">
                  <span class="name">{{item.name}}</span>
                  </span>
                  <span>{{ item.type }}</span>
                  <span class="event" v-if="item.type === '咨询'">{{ item.codeId || item.pname }}</span>
                  <a class="event link" target="_black" :href="`https://s.17doubao.com/order/detail/${item.codeId}`" v-else>{{item.pname}}</a>
                </li>
              </ul>
            </vueSeamlessScroll>
          </el-col>
          <el-col :span="8">
            <div id="car-funnel-charts4" class="car-funnel-charts hover-box"></div>
          </el-col>
          <el-col :span="8">
            <div id="car-funnel-charts5" class="car-funnel-charts hover-box"></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="on-time clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="车险分组列表" :showTooltip="false" fontSize="12px"></title-item>
      </div>
      <div class="group-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!-- <el-form-item>
            <el-input v-model="formInline.name" clearable size="mini" placeholder="分组名搜索"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="success" @click="showAddRule = true" disabled size="mini">创建分组规则</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            width="160"
            label="分组名称">
          </el-table-column>
          <el-table-column
            prop="date"
            width="130"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="update"
            width="130"
            label="更新时间">
          </el-table-column>
          <el-table-column
            prop="taskName"
            label="任务列表">
          </el-table-column>
          <el-table-column
            prop="result"
            width="160"
            label="召回情况">
            <template slot-scope="scope">
              <span>{{scope.row.result }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="info"
            width="80"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" circle @click="showRules(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <el-dialog title="" width="1000px" :visible.sync="showAddTask">
      <AddTask :qname="TaskQname" team="zhong" :name="TaskName" v-if="showAddTask" @cancel="showAddTask = false"></AddTask>
      <taskDialog v-if="showAddTask && TaskName !== '你购车，我加油'"></taskDialog>
    </el-dialog>
    <el-dialog title="" width="1000px" :visible.sync="showAddRule">
      <AddRules v-if="showAddRule" :ruleType="ruleType" @cancel="showAddRule = false"></AddRules>
    </el-dialog>
    <el-dialog title="" width="800px" :visible.sync="showUserLog">
      <UserList v-if="showUserLog" :start="start" :end="end" @cancel="UserList = false"></UserList>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ECharts from 'echarts'
import AddTask from '../TeamInsurance/AddTask.vue'
import AddRules from '../TeamInsurance/AddRules.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
import UserList from '../TeamInsurance/UserList.vue'
import taskDialog from '../customManage/dialog.vue'


@Component({
  components: {
    vueSeamlessScroll,
    AddTask,
    AddRules,
    UserList,
    taskDialog
  }
})
export default class Article extends Vue {
  private TaskQname: string = ''
  private TaskName: string = ''
  private showAddTask: boolean = false
  private showAddRule: boolean = false
  private ruleType: string = '1'
  private month: string = ''
  private maxsize: number = 10
  private showUserLog: boolean = false
  private selectDate: string = ''
  private start: number = 0
  private end: number = 50
  private notify: any = undefined

  private userEvents: any[] = [
    {
      "name": "合和",
      "type": "咨询",
      "pname": "你购车，我加油"
    },
    {
      "name": "春来",
      "type": "咨询",
      "codeId": "赠送500代金劵+意外保险卡"
    },
    {
      "name": "罗德志",
      "type": "咨询",
      "codeId": "新春境外游卡单免费领"
    },
    {
      "name": "澎湃",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498674299701005"
    },
    {
      "name": "王智兴",
      "type": "咨询",
      "codeId": "五一境外旅意险500元"
    },
    {
      "name": "黄健翔",
      "type": "咨询",
      "codeId": "理赔服务"
    },
    {
      "name": "黄渤",
      "type": "咨询",
      "codeId": "道路救援"
    },
    {
      "name": "宋佳",
      "type": "咨询",
      "codeId": "绿通服务"
    },
    {
      "name": "高京生",
      "type": "咨询",
      "pname": "新春境外游卡单免费领"
    },
    {
      "name": "刘思源",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498656059221005"
    },
    {
      "name": "王哲",
      "type": "咨询",
      "codeId": "理赔问题"
    },
    {
      "name": "佩如",
      "type": "咨询",
      "pname": "小白重疾a款"
    },
    {
      "name": "黄骏",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498656075361005"
    },
    {
      "name": "李成",
      "type": "咨询",
      "codeId": "好生活意外险"
    },
    {
      "name": "高升",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498656085691005"
    },
    {
      "name": "马红伟",
      "type": "咨询",
      "pname": "泰康乐行天下"
    },
    {
      "name": "王紫茹",
      "type": "购买",
      "pname": "卡单",
      "codeId": "15498514946161005"
    },
    {
      "name": "项田",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498161705111005"
    },
    {
      "name": "政远",
      "type": "咨询",
      "pname": "体检有问题，我就送绿通"
    },
    {
      "name": "王新",
      "type": "咨询",
      "pname": "免费少儿重健康讲座"
    }
  ]
  // 准客户事件
  private userEventsOptions: any = {
    title: {
      text: '准客户事件总量',
      textStyle: {
        fontSize: 14
      },
      subtext: '总停留时长/总访客数'
    },
    // legend: {
    //     data: ['本周', '上周']
    // },
    xAxis: {
      type: 'category',
      data: ['2019-02-08', '2019-02-09', '2019-02-10', '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '本周',
        data: [1106, 1247, 1424, 2347, 5415, 3705, 2502],
        type: 'line'
      }
    ]
  }
  private userEventsOptions1: any = {
    title: {
      text: '准客户事件分类',
      textStyle: {
        fontSize: 14
      },
      subtext: '总停留时长/总访客数'
    },
    legend: {
        data: ['沟通', '购买']
    },
    xAxis: {
      type: 'category',
      data: ['2019-02-08', '2019-02-09', '2019-02-10', '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '沟通',
        data: [65, 56, 85, 13, 172, 117, 108],
        type: 'line'
      },
      {
        name: '购买',
        data: [4, 13, 21, 4, 43, 21, 46],
        type: 'line'
      }
    ]
  }
  // 滚动参数设置
  private scrollOption: object = {
      step: 0.2, // 步长 越大滚动速度越快
      limitMoveNum: 10, // 启动无缝滚动最小数据量 this.dataList.length
      hoverStop: true, // 是否启用鼠标hover控制
      direction: 1, // 1 往上 0 往下
      openWatch: true, // 开启data实时监听
      singleHeight: 0, // 单条数据高度有值hoverStop关闭
      waitTime: 1000 // 单步停止等待时间
  }
  private tableData: any = [
    {
      date: '2018-12-12',
      name: '(车)b级<20w(京群)',
      update: '2019-02-11',
      result: '481人',
      info: '2',
      taskName: '大众伴你行，赠送500代金劵+意外保险卡，你购车，我加油，新春境外游卡单免费领'
    },
    {
      date: '2018-12-12',
      name: '(车)a级>50w(京）',
      update: '2019-02-11',
      result: '126人',
      info: '2',
      taskName: '直升机救援保险，五一境外旅意险500元，新春境外游卡单免费领'
    }
  ]
  private formInline: any = {
    name: ''
  }
  private funnelOptions1: any = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    legend: {
      data: ['客户', '潜在客户', '目标客户', '准客户']
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
          {value: 100, name: '潜在客户'},
          {value: 90, name: '目标客户'},
          {value: 60, name: '准客户'},
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
          {value: 68, name: '潜在客户'},
          {value: 34, name: '目标客户'},
          {value: 17, name: '准客户'},
          {value: 4, name: '客户'}
        ]
      }
    ]
  }
  private funnelOptions2: any = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    legend: {
      data: ['客户', '潜在客户', '目标客户', '准客户']
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
          {value: 100, name: '潜在客户'},
          {value: 85, name: '目标客户'},
          {value: 55, name: '准客户'},
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
          {value: 94, name: '潜在客户'},
          {value: 66, name: '目标客户'},
          {value: 38, name: '准客户'},
          {value: 19, name: '客户'}
        ]
      }
    ]
  }
  private funnelOptions: any = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    legend: {
      data: ['客户', '潜在客户', '目标客户', '准客户']
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
          {value: 96, name: '潜在客户'},
          {value: 90, name: '目标客户'},
          {value: 60, name: '准客户'},
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
          {value: 85, name: '潜在客户'},
          {value: 74, name: '目标客户'},
          {value: 32, name: '准客户'},
          {value: 11, name: '客户'}
        ]
      }
    ]
  }
  private beforeDestroy () {
    // this.notify.close()
  }
  private mounted () {
    this.$nextTick( () => {
      const dom1 = ECharts.init(document.getElementById('car-funnel-charts1'))
      dom1.setOption(this.funnelOptions)
      const dom2 = ECharts.init(document.getElementById('car-funnel-charts2'))
      dom2.setOption(this.funnelOptions1)
      const dom3 = ECharts.init(document.getElementById('car-funnel-charts3'))
      dom3.setOption(this.funnelOptions2)
      const dom4 = ECharts.init(document.getElementById('car-funnel-charts4'))
      dom4.setOption(this.userEventsOptions)
      const dom5 = ECharts.init(document.getElementById('car-funnel-charts5'))
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
  private showRules (row: any) {
    this.ruleType = row.info || '1'
    this.showAddRule = true
  }
  private showTask (qname: string, name: string) {
    this.TaskName = name
    this.TaskQname = qname
    this.showAddTask = true
  }
  private showUser (val: number, val1: number) {
    this.start = val
    this.end = val1
    this.showUserLog = true
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
  border: 7px solid #ebebeb;
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
  .bg-purple {
    position: relative;
    .iconfont {
      position: absolute;
      left: -12px;
      top: -2px;
      font-size: 40px;
    }
    .icon-wancheng {
      font-size: 34px;
      left: -8px;
      color: #38f!important;
    }
    .icon-tuijian {
      font-size: 34px;
      left: -8px;
      color: #bc4747!important;
    }
    .icon-jinxingzhong {
      left: -10px;
      font-size: 40px;
      color: #67c23a!important;
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
    background-color: #fff;
    border: 1px solid $bg-color;
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
  .car-funnel-charts {
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
        .link {
          color: #1d72f0;
          text-decoration: underline;
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
      .el-col-8 {
        height: 100%;
      }
    }
  }
  .grid-content {
    height: 100%;
    border: 1px solid $bg-color;
    border-radius: 5px;
    margin-right: 10px;
    text-align: left;
    padding-left: 22px;
    background: #ffffff;
    .help-item-title-left {
      padding: 10px 0 10px  0px;
      margin-left: -3px;
      margin-bottom: 10px;
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
    color: green;
    margin-left: 5px;
    .num {
      font-size: 20px;
      font-weight: 500;
      display: inline-block;
      padding: 0 6px;
    }
  }
  .ash {
    color: #999;
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
.custom-button {
  background: none;
  color: green;
}
.charts-box {
  position: relative;
}
.charts-header-title {
  height: 10px;
  width: 87%;
  margin: 0 auto;
  position: absolute;
  bottom: 38px;
  left: 26px;
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
}
</style>

