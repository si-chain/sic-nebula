<template>
  <div class="add-rules">
    <el-form :model="formInline" class="header-form clearfix" >
      <div class="line-wrap">
        <el-form-item label="任务名称">
          <el-input size="mini" v-model="formInline.name" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="任务编号">
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
      <div class="line-wrap">
        <el-form-item label="选择群">
          <el-checkbox-group v-model="formInline.qun">
            <el-checkbox label="1" name="type">{{ qname }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
    <el-form :model="rules" class="header-form clearfix" label-width="100px">
        <div class="rules-box">
          <div class="trigger-title">
            <title-item class="help-item-title-left" backgroundColor="#67c23a" name="短信规则" fontSize="12px"></title-item>
            <!-- <div>
              <i class="el-icon-circle-plus-outline" style="color: #67c23a"></i>模版
            </div> -->
          </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            placeholder="请输入内容"
            v-model="rules.info">
          </el-input>
          <div class="trigger-title">
            <title-item class="help-item-title-left" backgroundColor="#67c23a" name="微信规则" fontSize="12px"></title-item>
            <!-- <div>
              <i class="el-icon-circle-plus-outline" style="color: #67c23a"></i>模版
            </div> -->
          </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            placeholder="请输入内容"
            v-model="rules.wechat">
          </el-input>
        </div>
        <div class="btn-right">
          <el-button type="primary" size="mini" plain @click="cancel">确定</el-button>
        </div>
      </el-form>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AddRules extends Vue {
  @Prop({ default: '(团)30-40岁群'})
  private qname!: string
  @Prop({ default: '五一7天送意外卡'})
  private name!: string
  private trigger: boolean = false
  private formInline: any = {
    name: this.name,
    number: 'MD' + Math.floor( Math.random() * 10000),
    push: ['info'],
    time: ['double'],
    qun: ['1']
  }
  private rules: any = {
    wechat: ' 「客户关怀」今天是您的生日，我们为您送上一份999元的大礼包，点击领取哦「 http://td.tdx86xs 」～',
    info: '  「客户关怀」今天是您的生日，我们为您送上一份999元的大礼包，点击领取哦「 http://td.tdx86xs 」～'
  }
  private task: any[] = [
    {
      "name": "五一7天送意外卡",
      "ct": "2017-05-01",
      "wx": "亲～，泰国happy卡上免费赠送的7天意外保险，具体详情请登录 「 http://17doubao.com/active/2017-05-01 」",
      "dx": "亲～，泰国happy卡上免费赠送的7天意外保险，具体详情请登录 「 http://17doubao.com/active/2017-05-01 」",
      "tips": [
        {
          "key": "召回量","value":"85"
        },
        {
          "key": "未召回","value":"20"
        },
        {
          "key": "分类","value": "微信25 短信60"
        }
      ]
    },
    {
      "name": "国庆北京地区体检打八折",
      "ct":"2017-10-01",
      "wx":"尊敬的用户您好，为了答谢北京地区客户，特此赠送体检打8折活动，详情登录「 http://17doubao.com/active/2017-10-01 」",
      "dx":"尊敬的用户您好，为了答谢北京地区客户，特此赠送体检打8折活动，详情登录「 http://17doubao.com/active/2017-10-01 」",
      "tips": [
        {
          "key": "召回量","value":"121"
        },
        {
          "key": "未召回","value":"90"
        },
        {
          "key": "分类","value":"微信12 短信109"
        }
      ]
    },
    {
      "name": "新春境外游卡单免费领",
      "ct":"2019-01-01",
      "wx":"新春到，小豆包为您提供了免费的境外游卡单等待您的领取哦～，详情登录「 http://17doubao.com/active/2019-01-01 」",
      "dx":"新春到，小豆包为您提供了免费的境外游卡单等待您的领取哦～，详情登录「 http://17doubao.com/active/2019-01-01 」",
      "tips": [
        {
          "key": "召回量","value":"259"
        },
        {
          "key": "未召回","value":"90"
        },
        {
          "key": "分类","value":"微信179 短信80"
        }
      ]
    },
    {
      "name": "少儿重疾活动周",
      "ct":"2018-06-01",
      "wx":"六一儿童节到了，为了更好的保障您孩子的身体健康，我们特此推出了 '少儿重疾活动周' ，详情登录「 http://17doubao.com/active/2018-06-01 」",
      "dx":"六一儿童节到了，为了更好的保障您孩子的身体健康，我们特此推出了 '少儿重疾活动周' ，详情登录「 http://17doubao.com/active/2018-06-01 」",
      "tips": [
        {
          "key": "召回量","value":"21"
        },
        {
          "key": "未召回","value":"49"
        },
        {
          "key": "分类","value":"微信15 短信6"
        }
      ]
    },
    {
      "name": "国庆体检打八折-京",
      "ct":"2018-10-01",
      "wx":"亲爱的小豆包们，使用17豆包进行体检预约的客户，我们体检打8折，详情登录「 http://17doubao.com/active/2018-10-01 」",
      "dx":"亲爱的小豆包们，使用17豆包进行体检预约的客户，我们体检打8折，详情登录「 http://17doubao.com/active/2018-10-01 」",
      "tips": [
        {
          "key": "召回量","value":"45"
        },
        {
          "key": "未召回","value":"90"
        },
        {
          "key": "分类","value":"微信40 短信5"
        }
      ]
    },
    {
      "name": "大众伴你行，赠送500代金劵+意外保险卡",
      "ct":"2018-03-12",
      "wx":"小豆包们，我们现在对大众车型举办活动，凡参加'大众伴你行'活动的用户，我们特赠送您500代金劵+意外保险卡，详情登录「 http://17doubao.com/active/2018-03-12] 」",
      "dx":"小豆包们，我们现在对大众车型举办活动，凡参加'大众伴你行'活动的用户，我们特赠送您500代金劵+意外保险卡，详情登录「 http://17doubao.com/active/2018-03-12] 」",
      "tips": [
        {
          "key": "召回量","value":"459"
        },
        {
          "key": "未召回","value":"49"
        },
        {
          "key": "分类","value":"微信9 短信450"
        }
      ]
    },
    {
      "name": "你购车，我加油",
      "ct":"2018-05-1",
      "wx":"小豆包们，凡使用了我们的车险服务平台，您购车，我加油，详情登录「 http://17doubao.com/active/2018-05-01 」 ",
      "dx":"小豆包们，凡使用了我们的车险服务平台，您购车，我加油，详情登录「 http://17doubao.com/active/2018-05-01 」 ",
      "tips": [
        {
          "key": "召回量","value":"322"
        },
        {
          "key": "未召回","value":"90"
        },
        {
          "key": "分类","value":"微信0 短信322"
        }
      ]
    }
  ]
  private created () {
    const that = this
    this.task.map( item => {
      if (that.name === item.name) {
        that.rules.wechat = item.wx
        that.rules.info = item.dx
      }
    })
  }
  private cancel () {
    setTimeout(() => {
      this.$emit('cancel')
    }, 500)
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
    // margin: 0 50px;
    .el-input--mini {
      width: 200px;
      float: left;
    }
  }
  
  .el-checkbox-group {
    text-align: left;
  }
}
.table-wrap {
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
.info-content {
  display: flex;
  background-color: $bg-color;
  padding: 15px 10px;
  margin-top: 10px;
  border-radius: 5px;
  .info-view {
    background-color: #ffffff;
  }
  .info-left {
    flex: 3;
  }
  .info-right {
    flex: 5;
    margin-left: 10px;
  }
  .info-view-head {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .info-view-head-right {
      float: right;
      margin-right: 20px;
    }
  }
  .info-view-content {
    text-align: left;
    p {
      padding-left: 15px;
    }
    span {
      margin-right: 10px;
      font-size: 13px;
    }
    .charts {
      height: 300px;
      background: $bg-color;
      margin: 7px;
      display: flex;
      .tip {
        flex: 1;
        align-items:center;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.icon-success,.link {
  color: #67c23a;
}
.trigger-title {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.btn-right {
  text-align: right;
  margin-top: 15px;
}
</style>
