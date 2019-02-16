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
            <div class="task-item">
              <div class="grid-content bg-purple hover-box over" @click="choiceTask(1, '春节商城特卖活动周')" :class="active === 1 ? 'task-item-active' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2019-01-15</span>
                </div>
                <div class="task-title center">春节商城特卖活动周</div>
              </div>
            </div>
            <div class="task-item">
              <div class="grid-content bg-purple hover-box over" @click="choiceTask(2, '体检预约送好礼活动')" :class="active === 2 ? 'task-item-active' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-01-01</span>
                </div>
                <div class="task-title center">体检预约送好礼活动</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple over-task-box">
            <div class="task-title-box over-task">
              <title-item class="help-item-title-left" backgroundColor="#38f" name="已完成任务" :showTooltip="false" fontSize="18px"></title-item>
            </div>
            <div class="task-item">
              <div class="grid-content bg-purple hover-box over" @click="choiceTask(3, '坐席服务抽查')" :class="active === 3 ? 'task-item-active1' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-12-24</span>
                </div>
                <div class="task-title center">坐席服务抽查</div>
              </div>
            </div>
            <div class="task-item">
              <div class="grid-content bg-purple hover-box over" @click="choiceTask(4, '理赔服务抽查')" :class="active === 4 ? 'task-item-active1' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-10-21</span>
                </div>
                <div class="task-title center">理赔服务抽查</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="group-box">
        <div class="table-tips">
          <span>{{taskName}}</span>
          <span v-if="active ===1 || active === 2">状态：进行中</span>
          <span v-else>状态：已完成</span>
          <span v-if="active === 1 || active === 2">剩余时间：不足<i style="color: red; margin: 0 5px">{{active === 1 ? '23' : '45'}}</i>天</span>
          <span>接受人：张博宇</span>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 98%">
          <el-table-column
            prop="name"
            width="180"
            label="姓名">
            <template slot-scope="scope">
              <a target="_black" class="link" :href="`https://s.17doubao.com/analysis/timeline/${scope.row.id}`">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            width="180"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="age"
            width="180"
            label="年龄">
          </el-table-column>
          <el-table-column
            prop="eName"
            label="所属企业">
            <template slot-scope="scope">
              <a target="_black" class="link" :href="`https://s.17doubao.com/enterprise/infor?ename=${scope.row.eName}`">{{ scope.row.eName }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="status"
            label="判定状态">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vueSeamlessScroll from 'vue-seamless-scroll'


@Component({
  components: {
    vueSeamlessScroll
  }
})
export default class Article extends Vue {
  private taskName: string = '春节商城特卖活动周'
  private status: string = '进行中'
  private times: string = '81'
  private active: number = 1

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
  private userList: any = [
    {
      taskname: '春节商城特卖活动周',
      tabledate : [
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
    },
    {
      taskname: '体检预约送好礼活动',
      tabledate : [
        {
          name: '宋涛',
          sex: '男',
          age: '31',
          eName: '北京荣之联科技股份有限公司',
          id: '52260',
          status: '成交客户',
          address: '河北省保定市高碑店市'
        },
        {
          name: '张鹭鸶',
          sex: '女',
          age: '33',
          eName: '北京永信达实业开发公司',
          id: '511212',
          status: '意向客户',
          address: '北京市市辖区朝阳区'
        },
        {
          name: '张晓敏',
          sex: '女',
          age: '29',
          eName: '北京迪思公关顾问有限公司',
          id: '35627',
          status: '准客户',
          address: '河北省邯郸市邯郸县'
        },
        {
          name: '张家敏',
          sex: '男',
          age: '27',
          eName: '北京四达人效人力资源服务有限公司',
          id: '151538',
          status: '潜在客户',
          address: '福建省三明市沙县',
        },
        {
          name: '邸俊麟',
          sex: '男',
          age: '56',
          eName: '北京金隅物业管理有限责任公司金隅环贸分公司',
          id: '45174',
          status: '成交客户',
          address: '北京市市辖区朝阳区',
        }
      ]
    },
    {
      taskname: '坐席服务抽查',
      tabledate : [
        {
          name: '谷音',
          sex: '男',
          age: '36',
          eName: '北京智云星辉科技有限公司',
          id: '518127',
          status: '准客户',
          address: '陕西省宝鸡市渭滨区',
        },
        {
          name: '郑瑞',
          sex: '男',
          age: '39',
          eName: '北京博奇电力科技有限公司',
          id: '480842',
          status: '成交客户',
          address: '湖北省十堰市丹江口市',
        },
        {
          name: '高情',
          sex: '女',
          age: '36',
          eName: '北京新中关摩尔商业管理有限公司',
          id: '158020',
          status: '准客户',
          address: '北京市县',
        },
        {
          name: '覃健',
          sex: '男',
          age: '31',
          eName: '悉地（ 北京） 国际建筑设计顾问有限公司',
          id: '171488',
          status: '成交客户',
          address: '广西壮族自治区南宁市',
        },
        {
          name: '范金龙',
          sex: '男',
          age: '37',
          eName: '北京金隅地产经营管理有限公司',
          id: '88466',
          status: '成交客户',
          address: '黑龙江省齐齐哈尔市富拉尔基区',
        }
      ]
    },
    {
      taskname: '理赔服务抽查',
      tabledate : [
        {
          name: '刁鹏飞',
          sex: '男',
          age: '34',
          eName: '北京中科江南信息技术股份有限公司',
          id: '507653',
          status: '忠诚客户',
          address:  '黑龙江省牡丹江市西安区',
        },
        {
          name: '赵群',
          sex: '男',
          age: '32',
          eName: '北京迪思公关顾问有限公司',
          id: '80334',
          status: '成交客户',
          address:  '辽宁省抚顺市抚顺县',
        },
        {
          name: '程翔',
          sex: '男',
          age: '63',
          eName: '北京天毓山庄旅游开发有限公司',
          id: '56704',
          status: '成交客户',
          address:  '北京市市辖区西城区',
        },
        {
          name: '王青苗',
          sex: '女',
          age: '25',
          eName: '北京中科江南信息技术股份有限公司',
          id: '513450',
          status: '准客户',
          address:  '山东省淄博市沂源县',
        },
        {
          name: '黄津',
          sex: '男',
          age: '27',
          eName: '北京顺拓慷诚企业管理咨询有限公司',
          id: '521683',
          status: '成交客户',
          address:  '辽宁省阜新市海州区',
        }
      ]
    }
  ]
  private choiceTask (active: number, title: string) {
    this.active = active
    this.taskName = title
    this.userList.map( (item: any) => {
      if (item.taskname === title) {
        this.tableData = item.tabledate
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/variable.scss";
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
    display: flex;
    // justify-content: space-between;
  }
  .task-title,.status {
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    color: green;
    padding: 35px 0px;
  }
}
.custom-button {
  background: none;
  color: green;
  padding: 0;
}
.grid-content {
  padding: 10px 20px;
  border: 1px solid $bg-color;
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
  
  .task-item-active {
    border: 1px solid #67c23a !important;
  }
  
  .hover-box:hover,.hover-box:focus {
    border: 1px solid #67c23a !important;
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
</style>

