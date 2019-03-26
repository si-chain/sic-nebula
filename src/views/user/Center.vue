<template>
  <div class="team-insur-center" ref="content">
    <div class="on-tiome clearfix item team-insure">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="个险任务" backgroundColor="#67c23a" :showTooltip="false" fontSize="12px"></title-item>
        <div class="select-box">
          <el-button type="success" style="margin-left: 15px;" size="mini" disabled @click="showAddTask = true">添加</el-button>
        </div>
      </div>
      <el-carousel indicator-position="none" height="205px" :autoplay="false">
        <el-carousel-item>
          <div class="team-carousel-box clearfix">
            <div class="team-carousel-tip">
                <p class="tip-title" style="margin-top: 12px;">数据源</p>
                <p class="tip-msg">(个)40岁优质用户（家庭）</p>
                <p class="tip-title">创建时间</p>
                <p class="tip-msg">2018-01-12</p>
                <p class="tip-title">更新时间</p>
                <p class="tip-msg">2019-02-11</p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(个)40岁优质用户（家庭）', '体检有问题，我就送绿通')">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="体检有问题，我就送绿通" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-wancheng"></span>
                  <div class="time">召回量：<span @click.stop="showUser(320, 112)"><IOdometer class="num" :value="112"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="230"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="100"></IOdometer>人 - 短信：<IOdometer class="num" :value="12"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(个)40岁优质用户（家庭）', '免费少儿重健康讲座')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="免费少儿重健康讲座" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-jinxingzhong"></span>
                  <div class="time">召回量：<span @click.stop="showUser(435, 115)"><IOdometer class="num" :value="115"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="94"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="15"></IOdometer>人 - 短信：<IOdometer class="num" :value="100"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(个)40岁优质用户（家庭）', '国庆少儿保险卡8折起卖')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="国庆少儿保险卡8折起卖" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-tuijian"></span>
                  <div class="time">召回量：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">未召回：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">分类：微信<span class="num" style="font-size: 14px">待进行</span> - 短信：<span class="num" style="font-size: 14px">待进行</span></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="team-carousel-box clearfix">
            <div class="team-carousel-tip">
                <p class="tip-title" style="margin-top: 12px;">数据源</p>
                <p class="tip-msg">(个)40岁优质用户（理财）</p>
                <p class="tip-title">创建时间</p>
                <p class="tip-msg">2018-01-12</p>
                <p class="tip-title">更新时间</p>
                <p class="tip-msg">2019-02-11</p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(个)40岁优质用户（理财）', '为孩子的未来进行投资')">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="为孩子的未来进行投资" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-jinxingzhong"></span>
                  <div class="time">召回量：<span @click.stop="showUser(550, 59)"><IOdometer class="num" :value="59"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="371"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="40"></IOdometer>人 - 短信：<IOdometer class="num" :value="19"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(个)40岁优质用户（理财）', '您的养老我们来保')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="您的养老我们来保" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-wancheng"></span>
                  <div class="time">召回量：<IOdometer class="num" :value="216"></IOdometer>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="75"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="95"></IOdometer>人 - 短信：<IOdometer class="num" :value="121"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(个)40岁优质用户（理财）', '财智双赢')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="财智双赢" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-tuijian"></span>
                  <div class="time">召回量：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">未召回：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">分类：微信<span class="num" style="font-size: 14px">待进行</span> - 短信：<span class="num" style="font-size: 14px">待进行</span></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="个险任务筛选日志" :showTooltip="false" fontSize="12px"></title-item>
        <!-- <span class="download-icon"><i class="el-icon-download"></i></span> -->
      </div>
      <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;margin-top: 10px">
        <el-col :span="8" class="charts-box">
          <div class="charts-header-title">体检有问题，我就送绿通</div>
          <div id="user-funnel-charts1" class="user-funnel-charts hover-box"></div>
        </el-col>
        <el-col :span="8" class="charts-box">
          <div class="charts-header-title">免费少儿重健康讲座</div>
          <div id="user-funnel-charts2" class="user-funnel-charts hover-box"></div>
        </el-col>
        <el-col :span="8" class="charts-box">
          <div class="charts-header-title">国庆少儿保险卡8折起卖</div>
          <div id="user-funnel-charts3" class="user-funnel-charts hover-box"></div>
        </el-col>
      </el-row>
      
    </div>
    <div class="on-tiome clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="个险事件分析" :showTooltip="false" fontSize="12px"></title-item>
        <!-- <span class="download-icon"><i class="el-icon-download"></i></span> -->
      </div>
      <div class="event-box">
        <el-row :gutter="20" style="width: 100%; margin-left: 0px!important;margin-top: 10px">
          <el-col :span="8">
            <vueSeamlessScroll class="srcoll-box hover-box" :data="userEvents" :class-option="scrollOption">
              <ul class="rowup">
                <li :key="index" v-for="(item,index) in userEvents">
                  <span class="name">{{item.name}}</span>
                  </span>
                  <span>{{ item.type }}</span>
                  <span class="event" v-if="item.type === '咨询'">{{item.codeId || item.pname }}</span>
                  <a class="event link" target="_black" :href="`https://s.17doubao.com/order/detail/${item.codeId}`" v-else>{{item.pname}}</a>
                </li>
              </ul>
            </vueSeamlessScroll>
          </el-col>
          <el-col :span="8">
            <div id="user-funnel-charts4" class="user-funnel-charts hover-box"></div>
          </el-col>
          <el-col :span="8">
            <div id="user-funnel-charts5" class="user-funnel-charts hover-box"></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="on-time clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="个险分组列表" :showTooltip="false" fontSize="12px"></title-item>
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
            width="190"
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
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" circle @click="showRules(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title=""  width="1000px" :visible.sync="showAddTask">
      <AddTask :qname="TaskQname" :name="TaskName" v-if="showAddTask" @cancel="showAddTask = false"></AddTask>
      <taskDialog v-if="showAddTask && TaskName !== '国庆少儿保险卡8折起卖'"></taskDialog>
    </el-dialog>
    <el-dialog title=""  width="1000px" :visible.sync="showAddRule">
      <AddRules v-if="showAddRule" :ruleType="ruleType" @cancel="showAddRule = false"></AddRules>
    </el-dialog>
    <el-dialog title=""  width="800px" :visible.sync="showUserLog">
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

  private userEvents: any[] = [
    {
      "name": "郭海",
      "type": "咨询",
      "pname": "泰康乐安康保险"
    },
    {
      "name": "郭海",
      "type": "咨询",
      "codeId": "绿通服务"
    },
    {
      "name": "罗德志",
      "type": "咨询",
      "pname": "泰康乐安康终身重大疾病保险"
    },
    {
      "name": "彭洪",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498674299701005"
    },
    {
      "name": "王群",
      "type": "咨询",
      "codeId": "车险服务"
    },
    {
      "name": "黄键泳",
      "type": "咨询",
      "codeId": "理赔服务"
    },
    {
      "name": "黄海",
      "type": "咨询",
      "codeId": "体检卡打折活动"
    },
    {
      "name": "段俊卿",
      "type": "咨询",
      "codeId": "绿通服务"
    },
    {
      "name": "高景生",
      "type": "咨询",
      "pname": "少儿重疾险"
    },
    {
      "name": "刘澈",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498656059221005"
    },
    {
      "name": "王新",
      "type": "咨询",
      "codeId": "理赔问题"
    },
    {
      "name": "康慨",
      "type": "咨询",
      "pname": "小白重疾a款"
    },
    {
      "name": "陶俊",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498656075361005"
    },
    {
      "name": "温道猛",
      "type": "咨询",
      "codeId": "好生活意外险"
    },
    {
      "name": "张丽萍",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498656085691005"
    },
    {
      "name": "马英明",
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
      "name": "向泽豪",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498161705111005"
    },
    {
      "name": "李政远",
      "type": "咨询",
      "pname": "境外游服务"
    },
    {
      "name": "吕伟",
      "type": "购买",
      "pname": "意外险卡单",
      "codeId": "15498099619391005"
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
        data: [1306, 2247, 1824, 2247, 3415, 6705, 5502],
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
        data: [265, 156, 485, 313, 672, 917, 1018],
        type: 'line'
      },
      {
        name: '购买',
        data: [41, 36, 99, 194, 124, 161, 146],
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
  private tableData: any = []
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
          {value: 78, name: '潜在客户'},
          {value: 54, name: '目标客户'},
          {value: 27, name: '准客户'},
          {value: 16, name: '客户'}
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
          {value: 92, name: '潜在客户'},
          {value: 76, name: '目标客户'},
          {value: 38, name: '准客户'},
          {value: 16, name: '客户'}
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
          {value: 80, name: '目标客户'},
          {value: 40, name: '准客户'},
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
          {value: 91, name: '潜在客户'},
          {value: 69, name: '目标客户'},
          {value: 36, name: '准客户'},
          {value: 21, name: '客户'}
        ]
      }
    ]
  }
  private async created () {
    const data = await this.$store.dispatch('mock/getUserCenterTable')
    this.tableData = data.data.tableData
  }
  private mounted () {
    this.$nextTick( () => {
      const dom1 = ECharts.init(document.getElementById('user-funnel-charts1'))
      dom1.setOption(this.funnelOptions)
      const dom2 = ECharts.init(document.getElementById('user-funnel-charts2'))
      dom2.setOption(this.funnelOptions1)
      const dom3 = ECharts.init(document.getElementById('user-funnel-charts3'))
      dom3.setOption(this.funnelOptions2)
      const dom4 = ECharts.init(document.getElementById('user-funnel-charts4'))
      dom4.setOption(this.userEventsOptions)
      const dom5 = ECharts.init(document.getElementById('user-funnel-charts5'))
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
  // .charts-view {
  //   display: flex;
  //   border: 5px solid $bg-color;
  //   margin-top: 10px;
  .user-funnel-charts {
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
    height: 96%;
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

