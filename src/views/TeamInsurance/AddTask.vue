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
        <el-form-item label="选择团队长">
          <el-checkbox-group v-model="formInline.team">
            <el-checkbox label="li" name="type">李彦平</el-checkbox>
            <el-checkbox label="wang" name="type">王海龙</el-checkbox>
            <el-checkbox label="zhong" name="type">钟秉科</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="line-wrap">
        <el-form-item v-if="custom !== ''" label="选择业务员">
          <el-checkbox-group v-model="formInline.custom">
            <el-checkbox label="zhang" name="type">张博宇</el-checkbox>
            <el-checkbox label="wang" name="type">戴伟伟</el-checkbox>
            <el-checkbox label="zhong" name="type">郭宗娜</el-checkbox>
            <el-checkbox label="zhong" name="type">翟雪美</el-checkbox>
            <el-checkbox label="zhong" name="type">蒋俊花</el-checkbox>
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
          <!-- <el-button type="primary" size="mini" plain @click="cancel">确定</el-button> -->
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
  @Prop({ default: 'wang'})
  private team!: string
  @Prop({ default: ''})
  private custom!: string
  private trigger: boolean = false
  private formInline: any = {
    name: this.name,
    number: `MD${Math.floor( Math.random() * 10000)}`,
    push: ['info'],
    time: ['double'],
    qun: ['1'],
    team: [this.team],
    custom: [this.custom]
  }
  private rules: any = {
    wechat: ' 「客户关怀」我们为您送上一份999元的大礼包，点击领取哦「 http://td.tdx86xs 」～',
    info: '  「客户关怀」我们为您送上一份999元的大礼包，点击领取哦「 http://td.tdx86xs 」～'
  }
  private task: any[] = [
  ]
  private async created () {
    const taskRules = await this.$store.dispatch('mock/getTaskRules')
    this.task = taskRules.rules
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
