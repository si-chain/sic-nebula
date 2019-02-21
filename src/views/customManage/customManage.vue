<template>
  <div class="team-insur-center" ref="content">
    <div class="on-time clearfix item">
      <div class="title clearfix">
        <title-item class="help-item-title-left" backgroundColor="#67c23a" name="我的任务" :showTooltip="false" fontSize="12px"></title-item>
      </div>
      <el-row :gutter="100">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="task-title-box">
              <title-item class="help-item-title-left" backgroundColor="#11cd63" name="正在进行的任务" :showTooltip="false" fontSize="18px"></title-item>
            </div>
            <div class="task-item chunjie" @click="choiceTask(1, '春节商城特卖活动周')">
              <!-- <div class="grid-content bg-purple hover-box over"  :class="active === 1 ? 'task-item-active' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2019-01-15</span>
                </div>
                <div class="task-title center">春节商城特卖活动周</div>
                <div class="task-rules">
                  亲～，泰国happy卡上免费赠送的7天意外保险
                </div>
              </div> -->
            </div>
            <div class="task-item yuanxiao" @click="choiceTask(2, '欢乐闹元宵')">
              <!-- <div class="grid-content bg-purple hover-box over"  :class="active === 2 ? 'task-item-active' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-01-01</span>
                </div>
                <div class="task-title center">
                  欢乐闹元宵
                  </div>
                <div class="task-rules">
                  尊敬的用户您好，为了答谢北京地区客户，特此赠送体检打8折活动
                </div>
              </div> -->
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple over-task-box">
            <div class="task-title-box over-task">
              <title-item class="help-item-title-left" backgroundColor="#38f" name="已完成任务" :showTooltip="false" fontSize="18px"></title-item>
            </div>
            <div class="task-item kmh" @click="choiceTask(3, '开门红')">
              <!-- <div class="grid-content bg-purple hover-box over" @click="choiceTask(3, '开门红')" :class="active === 3 ? 'task-item-active1' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-12-24</span>
                </div>
                <div class="task-title center">开门红活动</div>
                <div class="task-rules">
                  新春到，小豆包为您提供了免费的开门红活动等待您的领取哦～
                </div>
              </div> -->
            </div>
            <div class="task-item shuang" @click="choiceTask(4, '双11送大礼')">
              <!-- <div class="grid-content bg-purple hover-box over" @click="choiceTask(4, '双11送大礼')" :class="active === 4 ? 'task-item-active1' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-10-21</span>
                </div>
                <div class="task-title center">双11送大礼</div>
                <div class="task-rules">
                  新春到，小豆包为您提供了免费的双11送大礼等待您的领取哦～
                </div>
              </div> -->
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="on-time clearfix item">
        <div class="title clearfix">
          <title-item class="help-item-title-left" backgroundColor="#67c23a" name="任务详情" :showTooltip="false" fontSize="12px"></title-item>
        </div>
        <div class="table-tips">
          <span>{{taskName}}</span>
          <span v-if="active ===1 || active === 2">状态：进行中</span>
          <span v-else>状态：已完成</span>
          <span v-if="active === 1 || active === 2">剩余时间：不足<i style="color: red; margin: 0 5px">{{active === 1 ? '23' : '45'}}</i>天</span>
          <span>接受人：张博宇</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="grid-content bg-purple task1">
              <div class="task-title-box">
                <title-item class="help-item-title-left" backgroundColor="#38c701" name="潜在客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over" @click="choiceTask(1, '春节商城特卖活动周')" >
                  <div class="time-tip ash">
                    <p>总潜客：</p>
                    <p>{{90 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成目标客户：</p>
                    <p>{{80 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成准客户：</p>
                    <p>{{75 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成客户：</p>
                    <p>{{20 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>剩余潜客：</p>
                    <p>{{10 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/1">
                    <el-button type="primary" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple task2">
              <div class="task-title-box over-task">
                <title-item class="help-item-title-left" backgroundColor="#efa010" name="目标客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over" @click="choiceTask(1, '春节商城特卖活动周')" >
                  <div class="time-tip ash">
                    <p>总目标客户：</p>
                    <p>{{89 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成准客户：</p>
                    <p>{{55 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成客户：</p>
                    <p>{{32 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>剩余客户：</p>
                    <p>{{8 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/2">
                    <el-button type="warning" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple task3">
              <div class="task-title-box over-task ">
                <title-item class="help-item-title-left" backgroundColor="#ff6066" name="准客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over" @click="choiceTask(1, '春节商城特卖活动周')">
                  <div class="time-tip ash">
                    <p>总准客户：</p>
                    <p>{{70 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成客户：</p>
                    <p>{{30 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>剩余准客户：</p>
                    <p>{{30 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/3">
                    <el-button type="danger" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple task4">
              <div class="task-title-box over-task">
                <title-item class="help-item-title-left" backgroundColor="#8f9398" name="客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over" @click="choiceTask(1, '春节商城特卖活动周')">
                  <div class="time-tip ash">
                    <p>总成交客户：</p>
                    <p>{{13 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>当前综合效率：</p>
                    <p>{{20 + Math.floor( Math.random() * 10 )}}%</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/4">
                    <el-button type="info" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="" width="800px" :visible.sync="showUserLog">
      <UserList v-if="showUserLog" :start="start" :end="end" @cancel="UserList = false"></UserList>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import UserList from '../TeamInsurance/UserList.vue'

// import vueSeamlessScroll from 'vue-seamless-scroll'


@Component({
  components: {
    UserList
  }
})
export default class Article extends Vue {
  private taskName: string = '春节商城特卖活动周'
  private status: string = '进行中'
  private times: string = '81'
  private start: number = 0
  private end: number = 50
  private showUserLog: boolean = false
  private active: number = 1
  private activeObj: any = {
    // 总潜客
    all: 100,
    // 目标客户
    targetTip: 60,
    // 准客户
    grantTip: 20,
    // 客户
    customTip: 10,
    // 剩余
    superlusTip: 10
  }
  private tableData: any = [
    {
      name: '欧阳阿丹',
      id: '118686',
      sex: '女',
      age: '27',
      status: '潜在客户',
      address: '河南省平顶山市',
      eName: '好贷天下信息技术(北京)有限公司'
    },
    {
      name: '乔良',
      sex: '男',
      id: '19579',
      age: '29',
      status: '目标客户',
      address: '山西省朔州市怀仁县',
      eName: '北京普惠职道科技发展有限责任公司'
    },
    {
      name: '柳恒茂',
      sex: '男',
      age: '36',
      eName: '北京正安维视科技股份有限公司',
      id: '506070',
      status: '成交客户',
      address:  '河北省保定市涞水县'
    },
    {
      name: '刘桐伟',
      sex: '男',
      age: '28',
      eName: '贵州白山云科技有限公司',
      id: '125147',
      status: '准客户',
      address:  '山东省临沂市沂南县'
    }
  ]
  private choiceTask (active: number, title: string) {
    this.active = active
    this.taskName = title
    if (active === 1) {
      window.open('/ai/test.html')
    } else if (active === 2) {
      window.open('/ai/yuanxiao.html')
    }
  }
  private created () {
    this.$notify({
      title: '智能小助手',
      dangerouslyUseHTMLString: true,
      message: `您的效率比其他同事高出<span style="color: green"><strong><span class="iconfont icon-tisheng">
        </span>6%</strong></span>`,
      type: 'success',
      duration: 0
    })
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
  height: 100%;
  // margin: 10px;
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
.hover-box {
  padding: 20px;
  margin: 10px 0;
  border: 1px solid $bg-color;
  border-radius: 5px;
  cursor: pointer;
  .time-tip {
    color: green;
    p {
      line-height: 1.5;
    }
    display: flex;
    // justify-content: space-between;
  }
  .task-title,.status {
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    color: green;
    padding: 35px 0 10px 0px;
  }
}
.custom-button {
  background: none;
  color: green;
  padding: 0;
}
.grid-content {
  padding: 10px;
  // border: 1px solid $bg-color;
  border-radius: 5px;
  margin-top: 10px;
  .task-title-box {
    display: flex;
    justify-content: center;
    background: #f10;
    padding: 8px 0px;
    background: #11cd63;
    color: #fff;
  }
  .over-task {
    background: #38f;
    .time-tip {
      color: #38f;
      display: flex;
    }
  }
  .el-button {
    margin: 30px 0 10px 0;
  }
  .task-item {
    position: relative;
    height: 150px;
    margin-bottom: 10px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
    .el-button {
      margin: 30px 0 10px 0;
      position: absolute;
      bottom: 20px;
      left: 36%;
    }
  }
}

.over-task-box {
  .task-title {
    color: #38f;
  }
  .hover-box:hover,.hover-box:focus {
    border: 1px solid #38f !important;
  }
  .task-item-active1 {
    border: 1px solid #38f !important;
  }
  .time-tip {
    color: #38f;
  }
}
.table-tips {
  text-align: left;
  margin-left: 10px;
  line-height: 50px;
  span {
    margin-right: 80px;
    color: #909399;
  }
}
.task1 {
  .task-title-box {
    background: #38c701
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #38c701;
    line-height: 2
  }
}
.task2 {
  .task-title-box {
    background: #efa010
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #efa010;
    line-height: 2
  }
}
.task3 {
  .task-title-box {
    background: #ff6066
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #ff6066;
    line-height: 2
  }
}
.task4 {
  .task-title-box {
    background: #8f9398
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #8f9398;
    line-height: 2
  }
}
.yuanxiao {
  background-image: url('../../assets/banner1.png');
  
}
.chunjie {
  background-image: url('../../assets/banner.png');
}
.kmh {
  background-image: url('../../assets/kmh.jpeg');
}
.shuang {
  background-image: url('../../assets/11.jpeg');
}
</style>

