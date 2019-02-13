<template>
  <div class="add-rules">
    <el-form :model="formInline" class="header-form clearfix" label-width="100px">
      <div class="line-wrap">
        <el-form-item label="分群名称">
          <el-input size="mini" v-model="formInline.name" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="分群编号">
          <el-input size="mini" v-model="formInline.number" placeholder="任务编号"></el-input>
        </el-form-item>
      </div>
      <div class="line-wrap">
        <el-form-item label="计算周期">
          <el-checkbox-group v-model="formInline.time">
            <el-checkbox label="one">例行</el-checkbox>
            <el-checkbox label="double">单次</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="推送设置">
          <el-checkbox-group v-model="formInline.push">
            <el-checkbox label="wechat">微信</el-checkbox>
            <el-checkbox label="info">短信</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
    <div class="condition-box">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="满足如下条件的用户行为筛选:" fontSize="12px"></title-item>

      <div class="form-box">
        <div class="left-border">
          <span class="type">且</span>
        </div>
        <div class="right-content">
          <div class="condition-item">
            <div class="condition-item-header">
              <title-item class="help-item-title-left" LeftIcon="icon-menuicon" backgroundColor="#67c23a" name="用户属性满足" fontSize="12px"></title-item>
              <div class="condition-item-header-righticon">
                <i class="el-icon-circle-plus"></i>
                <span>添加</span>
              </div>
            </div>
            <div class="condition-item-body clearfix">
              <el-col :span="5">
                 <el-select size="mini" v-model="userAttribute.label" placeholder="请选择">
                  <el-option label="生日" value="bir"></el-option>
                  <el-option label="节日" value="hiliday"></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="4">
                <el-select size="mini" v-model="userAttribute.birthday" placeholder="请选择">
                  <el-option v-for="i in 12" :label="i + '月'" :value="i" :key="i"></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="1">在</el-col>
              <el-col :span='4'>
                <el-date-picker size="mini" type="date" placeholder="开始日期" v-model="userAttribute.startDate" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">至</el-col>
              <el-col :span='4'>
                <el-date-picker size="mini" type="date" placeholder="结束日期" v-model="userAttribute.endDate" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="4">之间</el-col>
            </div>
          </div>
          <div class="condition-item">
            <div class="condition-item-header">
              <title-item class="help-item-title-left" LeftIcon="icon-menuicon" backgroundColor="#67c23a" name="做过" fontSize="12px"></title-item>
              <div class="condition-item-header-righticon">
                <i class="el-icon-circle-plus"></i>
                <span>添加</span>
              </div>
            </div>
            <div class="condition-item-body clearfix">
              <el-col class="line" :span="1">在</el-col>
              <el-col :span="10">
                <el-date-picker
                  style="width: 330px"
                  size="mini"
                  v-model="haveDone.date"
                  type="daterange"
                  @change="datechange"
                  range-separator="至"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2">做过</el-col>
              <el-col :span="2">
                <el-select size="mini" v-model="haveDone.do" placeholder="请选择">
                  <el-option label="二维码扫描" value="scan"></el-option>
                  <el-option label="pc登陆" value="pc"></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="1">在</el-col>
              <el-col :span='2'>
                <el-select size="mini" v-model="haveDone.str" placeholder="请选择">
                  <el-option label="总次数" value="all"></el-option>
                  <el-option label="点击数" value="click"></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="1">至</el-col>
              <el-col :span='2'>
                <el-select size="mini" v-model="haveDone.type" placeholder="请选择">
                  <el-option label=">=" value=">="></el-option>
                  <el-option label="=" value="="></el-option>
                  <el-option label="<=" value="<="></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="2">
                <el-input size="mini" v-model="haveDone.num" placeholder="请输入内容"></el-input>
              </el-col>
              <!-- <el-col class="line" :span="2"></el-col> -->
            </div>
          </div>
          <div class="condition-item" style="width: 70%">
            <div class="condition-item-header">
              <title-item class="help-item-title-left" LeftIcon="icon-menuicon" backgroundColor="#67c23a" name="行为序列" fontSize="12px"></title-item>
              <div class="condition-item-header-righticon">
                <i class="el-icon-circle-plus"></i>
                <span>添加</span>
              </div>
            </div>
            <div class="condition-item-body clearfix">
              <div v-for="(item, index) in userActions" :key="index" class="line-item clearfix">
                <el-col class="line" :span="2">在</el-col>
                <el-col :span="14">
                  <el-date-picker
                    style="width: 330px"
                    size="mini"
                    v-model="item.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="4">做过</el-col>
                <el-col :span="4">
                  <el-select size="mini" v-model="item.do" placeholder="请选择">
                    <el-option label="二维码扫描" value="scan"></el-option>
                    <el-option label="pc登陆" value="pc"></el-option>
                  </el-select>
                </el-col>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="count-content">
      <div class="count-left">
        <div class="count-item" v-for="(item, index) in LeftCount" :key="index">
          <div class="count-item-header">
            <title-item class="help-item-title-left" backgroundColor="#67c23a" :name="item.title" fontSize="12px"></title-item>
            <span><i :class="item.icon" class="iconfont"></i></span>
          </div>
          <i class="position-icon iconfont icon-triangle-left"></i>
          <div class="count-item-content">
            <el-form label-width="80px">
              <el-form-item v-for="(child,index) in item.children" :label="child.key" :key="index">
                <el-col :span="20 / child.type.length" v-for="val in child.type" :key="val.key">
                  <el-input size="mini" v-if="val.key === 'input'" v-model="val.val"></el-input>
                  <el-select size="mini" v-if="val.key === 'select'" v-model="val.val" placeholder="请选择">
                    <el-option v-for="option in val.options" :key="option.key"
                      :label="option.key"
                      :value="option.val">
                    </el-option>
                  </el-select>
                  <el-radio-group size="mini" v-if="val.key === 'radio'" v-model="val.val">
                    <el-radio v-for="option in val.options" :key="option.key" :label="option.val">{{option.key}}</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
      <div class="count-line"></div>
        
      <div class="count-right">
        <div class="count-item" v-for="(item, index) in RightCount" :key="index">
          <div class="count-item-header">
            <title-item class="help-item-title-left" backgroundColor="#67c23a" :name="item.title" fontSize="12px"></title-item>
            <span><i :class="item.icon" class="iconfont"></i></span>
          </div>
          <i class="position-icon iconfont icon-triangle-right"></i>
          <div class="count-item-content">
            <el-form label-width="80px">
              <el-form-item v-for="(child,index) in item.children" :label="child.key" :key="index">
                <el-col :span="20 / child.type.length" v-for="val in child.type" :key="val.key">
                  <el-input size="mini" v-if="val.key === 'input'" v-model="val.val"></el-input>
                  <el-select size="mini" v-if="val.key === 'select'" v-model="val.val" placeholder="请选择">
                    <el-option v-for="option in val.options" :key="option.key"
                      :label="option.key"
                      :value="option.val">
                    </el-option>
                  </el-select>
                  <el-radio-group size="mini" v-if="val.key === 'radio'" v-model="val.val">
                    <el-radio v-for="option in val.options" :key="option.key" :label="option.val">{{option.key}}</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="text-align: center; padding-bottom: 20px">
      <el-button size="mini" type="success">添加计算因子</el-button>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AddRules extends Vue {
  private formInline: any = {
    name: '智能体检筛查',
    number: 'DG1246740003',
    push: ['wechat', 'info'],
    time: ['one']
  }
  private userAttribute: any = {
    label: 'bir',
    birthday: '1月',
    startDate: '1984-10-22',
    endDate: '2000-12-31'
  }
  private haveDone: any = {
    date: ["2018-02-05", "2019-02-15"],
    do: 'scan',
    str: 'all',
    type: '>=',
    num: '100'
  }
  private userActions: any = [
    {
      date: ["2018-12-05", "2019-02-15"],
      do: 'pc'
    },
    {
      date: ["2018-05-05", "2019-07-15"],
      do: 'scan'
    },
    {
      date: ["2018-02-05", "2018-04-13"],
      do: 'scan'
    }
  ]
  private LeftCount: any[] = [
    {
      title: '理赔因子Node',
      icon: 'icon-play',
      children: [
        { key: '理赔时间', type: [{
          key: 'input',
          val: '2019'
        }] },
        { key: '理赔地点', type: [{
          key: 'input',
          val: '2019'
        }] },
        { key: '理赔结果', type: [{
          key: 'input',
          val: '2019'
        }] },
        { key: '赔付金额', type: [{
          key: 'input',
          val: '2019'
        }] },
        { key: '用药情况', type: [{
          key: 'input',
          val: '2019'
        }] },
        { key: '理赔次数', type: [
          {
            key: 'select',
            val: '>=',
            options: [{
              key: '>=',
              val: '>='
            }]
          },
          {
            key: 'input',
            val: '19'
          }]
        }
      ]
    },
    {
      title: '合同因子Node',
      icon: 'icon-tisheng',
      children: [
        { key: '保险公司', type: [{
          key: 'input',
          val: '太保安联'
        }] },
        { key: '有效期', type: [{
          key: 'input',
          val: '2019～2020'
        }] },
        { key: '责任A', type: [{
          key: 'input',
          val: '门诊<1000'
        }] },
        { key: '责任B', type: [{
          key: 'input',
          val: '住院<10000'
        }] },
        { key: '责任C', type: [{
          key: 'input',
          val: '重疾<10000'
        }] }
      ]
    }
  ]
  private RightCount: any[] = [
    {
      title: '用户因子Node',
      icon: 'icon-play',
      children: [
        { key: '性别', type: [
          {
            key: 'radio',
            val: '1',
            options: [
              {
                key: '男',
                val: '1'
              },
              {
                key: '女',
                val: '2'
              }
            ]
          }]
        },
        { key: '注册时间', type: [{
          key: 'input',
          val: '2018-10-21'
        }] },
        { key: '婚姻状况', type: [{
          key: 'input',
          val: '已婚'
        }] },
        { key: '收入状况', type: [{
          key: 'input',
          val: '<10000'
        }] },
        { key: '访问来源', type: [{
          key: 'input',
          val: '百度'
        }] },
        { key: '地区', type: [{
          key: 'input',
          val: '黑龙江'
        }] },
        { key: '首次访问', type: [{
          key: 'input',
          val: '2018-10-20 12:32:33'
        }] }
      ]
    }
  ]
  private datechange (val: any) {
    console.log(val)
    console.log(this.haveDone.date)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

.add-rules {
  padding: 10px;
  background: #fff;
}
.header-form {
  // margin: 0 auto;
  .line-wrap {
    display: flex;
  }
  .el-form-item {
    flex: 1;
    margin: 0 50px;
    .el-input--mini {
      width: 200px;
      float: left;
    }
  }
  
  .el-checkbox-group {
    text-align: left;
  }
}
.form-box {
  display: flex;
  padding-bottom: 10px;
  .left-border {
    width: 30px;
    border-left: 2px dashed #67c23a;
    margin-top: 20px;
    position: relative;
    margin-left: 15px;
    .type {
      position: absolute;
      top: 50%;
      left: -13px;
      display: inline-block;
      background-color: #ffffff;
      padding: 5px;
      color: #67c23a;
    }
  }
}
.condition-box {
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  .table-title {
    display: flex;
    margin: 10px 0 60px 0;
    .el-button {
      margin-left: 20px;
    }
  }
}
.condition-item {
  border: 1px solid #ccc6;
  margin-top: 15px;
  border-radius: 3px;
  .condition-item-header {
    display: flex;
    padding: 10px 10px 0 10px;
    justify-content: space-between;
    .condition-item-header-righticon {
      color: #67c23a;
    }
  }
  .condition-item-body {
    padding: 20px;
    .line-item {
      margin-top: 10px;
    }
  }
}
.count-content {
  display: flex;
  background-color: $bg-color;
  padding: 15px 10px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  
  .count-item {
    width: 92%;
    padding: 10px 20px;
    border: 1px solid $bg-color;
    margin-bottom: 20px;
    border-radius: 5px;
    position: relative;
  }
  .position-icon {
    position: absolute;
    top: 50%;
    color: #67c23a;
  }
  .count-line {
    width: 1px;
    border-left: 1px dashed #67c23a;
    margin: 40px 0px;
  }
  .count-left,.count-right {
    flex: 1;
    padding: 20px;
  }
  .count-left {
    .position-icon {
      right: -40px;
    }
  }
  .count-right {
    .position-icon {
      left: -33px;
    }
    .count-item {
      margin-left: 25px;
    }
  }
  .count-item-header {
    display: flex;
    padding: 10px 10px 0 10px;
    justify-content: space-between;
    .iconfont {
      color: #67c23a;
    }
  }
}
.icon-success,.link {
  color: #67c23a;
}

</style>

