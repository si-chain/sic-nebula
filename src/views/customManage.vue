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
              <div class="grid-content bg-purple hover-box over" @click="active = '1'" :class="active === '1' ? 'task-item-active' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-10-30</span>
                </div>
                <div class="task-title center">国庆北京打八折活动</div>
              </div>
            </div>
            <div class="task-item">
              <div class="grid-content bg-purple hover-box over" @click="active = '2'" :class="active === '2' ? 'task-item-active' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-10-30</span>
                </div>
                <div class="task-title center">国庆北京打八折活动</div>
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
              <div class="grid-content bg-purple hover-box over" @click="active = '3'" :class="active === '3' ? 'task-item-active1' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-09-11</span>
                </div>
                <div class="task-title center">体检满意度调查</div>
              </div>
            </div>
            <div class="task-item">
              <div class="grid-content bg-purple hover-box over" @click="active = '4'" :class="active === '4' ? 'task-item-active1' : ''">
                <div class="time-tip ash">
                  <span>认领时间：</span>
                  <span>2018-07-21</span>
                </div>
                <div class="task-title center">理赔满意度调查</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="group-box">
        <div class="table-tips">
          <span>{{taskName}}</span>
          <span>状态：{{status}}</span>
          <span>剩余时间：不足<i style="color: red; margin: 0 5px">{{times}}</i>天</span>
          <span>接受人：张博宇</span>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            width="180"
            label="姓名">
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
          </el-table-column>
          <el-table-column
            prop="phone"
            width="180"
            label="手机号">
            <template slot-scope="scope">
              <span class="table-item-lnk">{{scope.row.result }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="判定状态"
            width="80">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" circle @click="showRules(scope.row)"></el-button>
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
  private taskName: string = '国庆北京打八折活动'
  private status: string = '进行中'
  private times: string = '81'
  private active: string = '1'

  private tableData: any = [
    {
      name: '2017-07-09',
      sex: '(团)30-40岁群',
      age: '2019-01-12',
      status: '465人',
      phone: '1',
      eName: '五一7天送意外卡，国庆北京地区体检打八折，新春境外游卡单免费领'
    },
    {
      name: '2017-07-09',
      sex: '(团)30-40岁群',
      age: '2019-01-12',
      status: '465人',
      phone: '1',
      eName: '五一7天送意外卡，国庆北京地区体检打八折，新春境外游卡单免费领'
    },
  ]
  private mounted () {}
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
    border: 2px solid #67c23a !important;
  }
  
  .hover-box:hover {
    border: 2px solid #67c23a4f !important;
  }
}

.over-task-box {
  .task-title {
    color: #38f;
  }
  .hover-box:hover {
    border: 2px solid #3388ff4a !important;
  }
  .task-item-active1 {
    border: 2px solid #38f !important;
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
    margin-right: 50px;
    color: #909399;
  }
}
</style>

