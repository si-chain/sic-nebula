<template>
  <div class="team-insur-center" ref="content">
    <div class="on-tiome clearfix item team-insure">
      <div class="title clearfix">
        <title-item class="help-item-title-left" name="团险任务" backgroundColor="#67c23a" :showTooltip="false" fontSize="12px"></title-item>
      </div>
       <el-carousel indicator-position="none" height="255px" :autoplay="false">
        <el-carousel-item>
          <div class="team-carousel-box clearfix">
            <div class="team-carousel-tip">
                <p class="tip-title" style="margin-top: 12px;">数据源</p>
                <p class="tip-msg">(团)30-40岁群</p>
                <p class="tip-title">创建时间</p>
                <p class="tip-msg">2017-07-09</p>
                <p class="tip-title">更新时间</p>
                <p class="tip-msg">2019-05-01</p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(团)30-40岁群', '春节商城特卖活动周')">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="春节商城特卖活动周" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-jinxingzhong"></span>
                  <div class="time">召回量：<span @click.stop="showUser(900, 45)"><IOdometer class="num" :value="45"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="20"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="25"></IOdometer>人 - 短信：<IOdometer class="num" :value="60"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(团)30-40岁群', '少儿重疾活动周')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="少儿重疾活动周" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-tuijian"></span>
                  <div class="time">召回量：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">未召回：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">分类：<span class="num" style="font-size: 14px">待进行</span></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(团)30-40岁群', '坐席服务抽查')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="坐席服务抽查" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-wancheng"></span>
                  <div class="time">召回量：<span @click.stop="showUser(945, 59)"><IOdometer class="num" :value="59"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="90"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="19"></IOdometer>人 - 短信：<IOdometer class="num" :value="40"></IOdometer>人</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="team-carousel-box clearfix">
            <div class="team-carousel-tip">
                <p class="tip-title" style="margin-top: 12px;">数据源</p>
                <p class="tip-msg">(团)理赔客户（家庭）</p>
                <p class="tip-title">创建时间</p>
                <p class="tip-msg">2018-08-12</p>
                <p class="tip-title">更新时间</p>
                <p class="tip-msg">2019-06-11</p>
              </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(团)理赔客户（家庭）', '国庆北京地区体检打八折')">
                  <!-- <div class="grid-title">团财险运营</div> -->
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="国庆北京地区体检打八折" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-jinxingzhong"></span>
                  <div class="time">召回量：<span @click.stop="showUser(1000, 21)"><IOdometer class="num" :value="21"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="49"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="15"></IOdometer>人 - 短信：<IOdometer class="num" :value="6"></IOdometer>人</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(团)理赔客户（家庭）', '国庆体检打八折-京')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="国庆体检打八折-京" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-tuijian"></span>
                  <div class="time">召回量：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">未召回：<span class="num" style="font-size: 14px">待进行</span></div>
                  <div class="time ash">分类：<span class="num" style="font-size: 14px">待进行</span></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple hover-box" @click="showTask('(团)理赔客户（家庭）', '理赔服务抽查')">
                  <title-item class="help-item-title-left" backgroundColor="#ffffff" name="理赔服务抽查" :showTooltip="false" fontSize="14px"></title-item>
                  <span class="iconfont icon-wancheng"></span>
                  <div class="time">召回量：<span @click.stop="showUser(1030, 94)"><IOdometer class="num" :value="94"></IOdometer></span>人</div>
                  <div class="time ash">未召回：<IOdometer class="num" :value="219"></IOdometer>人</div>
                  <div class="time ash">分类：微信<IOdometer class="num" :value="45"></IOdometer>人 - 短信：<IOdometer class="num" :value="49"></IOdometer>人</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="on-time clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="团险分组列表" :showTooltip="false" fontSize="12px"></title-item>
      </div>
      <div class="group-box">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            width="180"
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
            width="80"
            label="召回情况">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.result }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="info"
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" circle @click="showRules(scope.row)"></el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
    <div class="on-time clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="任务明细" :showTooltip="false" fontSize="12px"></title-item>
      </div>
      <el-row :gutter="50" class="task-info">
        <el-col :span="8">
          <div class="grid-content bg-purple hover-box over" @click="showTask('(团)30-40岁群', '坐席服务抽查')">
            <!-- <div class="grid-title">团财险运营</div> -->
            <title-item class="help-item-title-left" backgroundColor="#ffffff" name="张博宇" :showTooltip="false" fontSize="14px"></title-item>

            <div class="task-title center">坐席服务抽查</div>
            <div class="status center ash">已经完成</div>
            <div class="time-tip ash">
              <span>2018-11-01</span>
              <span>耗时12天</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple hover-box" @click="showTask('(团)30-40岁群', '春节商城特卖活动周')">
            <!-- <div class="grid-title">团财险运营</div> -->
            <title-item class="help-item-title-left" backgroundColor="#ffffff" name="张博宇" :showTooltip="false" fontSize="14px"></title-item>

            <div class="task-title center">春节商城特卖活动周</div>
            <div class="status center ash">正在进行</div>
            <div class="time-tip ash">
              <span>2019-01-15</span>
              <span>进行中</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple hover-box" @click="showTask('(团)30-40岁群', '少儿重疾活动周')">
            <!-- <div class="grid-title">团财险运营</div> -->
            <title-item class="help-item-title-left" backgroundColor="#ffffff" name="张博宇" :showTooltip="false" fontSize="14px"></title-item>

            <div class="task-title center">少儿重疾活动周</div>
            <div class="status center ash" style="color: #3c7dd5">待进行</div>
            <div class="time-tip ash">
              <span>2019-05-01</span>
              <span style="color: #3c7dd5">待进行</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="" width="1000px" :visible.sync="showAddTask">
      <AddTask :qname="TaskQname" custom="zhang" team="li" :name="TaskName" v-if="showAddTask && (TaskName === '少儿重疾活动周' || TaskName === '春节商城特卖活动周')" @cancel="showAddTask = false"></AddTask>
      <taskDialog v-if="showAddTask && TaskName !== '少儿重疾活动周'"></taskDialog>
    </el-dialog>
    <el-dialog title="" width="800px" :visible.sync="showUserLog">
      <UserList v-if="showUserLog" :start="start" :end="end" @cancel="UserList = false"></UserList>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vueSeamlessScroll from 'vue-seamless-scroll'
import AddTask from '../TeamInsurance/AddTask.vue'
import taskDialog from '../customManage/dialog.vue'
import UserList from '../TeamInsurance/UserList.vue'


@Component({
  components: {
    vueSeamlessScroll,
    AddTask,
    taskDialog,
    UserList
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
  private start: number = 0
  private end: number = 50
  private showUserLog: boolean = false
  private selectDate: string = ''
  private tableData: any = [
    {
      date: '2017-07-09',
      name: '(团)30-40岁群',
      update: '2019-05-01',
      result: '104人',
      info: '1',
      taskName: '春节商城特卖活动周，少儿重疾活动周，坐席服务抽查'
    },
    {
      date: '2018-08-12',
      name: '(团)理赔客户（家庭）',
      update: '2019-06-11',
      result: '115人',
      info: '1',
      taskName: '北京地区体检打八折，理赔服务抽查，国庆体检打八折-北京'
    }
  ]
  private formInline: any = {
    name: ''
  }
  private mounted () {}
  // private async created (): Promise<void> {
  //   const res = await this.$store.dispatch('app/getDailyEvent')
  //   console.log(res)
  // }
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
      // .el-col-8 {
      //   height: 100%;
      // }
    }
  }
  .grid-content {
    height: 100%;
    border: 1px solid $bg-color;
    border-radius: 5px;
    margin-right: 10px;
    text-align: left;
    padding-left: 22px;
    cursor: pointer;
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
  padding: 0;
}
.task-info {
  margin-top: 10px;
  border: 1px solid $bg-color;
  margin-left: 0!important;
  margin-right: 0!important;
  border-radius: 5px;
  .help-item-title-left {
    color: #3c7dd5;
  }
}
.over {
  .task-title,.status {
    color: #cccccc!important;
  }
}
.hover-box {
  padding: 20px;
  margin: 10px 0;
  border: 1px solid $bg-color;
  border-radius: 5px;
  cursor: pointer;
  .time-tip {
    color: green;
    display: flex;
    justify-content: space-between;
  }
  .task-title,.status {
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    color: green;
  }
}
</style>

