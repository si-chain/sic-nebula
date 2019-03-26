<!--
 * @Author: jhd
 * @Description: 添加营销策略 file content
 * @Date: 2019-02-26 18:09:50
 -->
<template>
  <div class="add-tag-dialog">
    <div>
      <el-form ref="marketingStrategForm" size="mini" :rules="addTagRules" :model="formData" label-width="110px">
        <el-form-item label="适用标签" prop="tagIds">
          <el-select style="width: 100%" size="mini" v-model="tagIdList" 
            filterable
            allow-create
            default-first-option
            placeholder="请选择适用标签">
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.answer"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题" prop="question">
          <el-input size="mini" v-model="formData.question"></el-input>
        </el-form-item>
        <el-form-item label="相似问题" prop="synonymStr">
          <div v-for="(item,index) in synonymList" class="synonym-item">
            <el-input style="width: 80%" size="mini" v-model="item.content"></el-input>
            <i v-if="index === 0" class="el-icon-circle-plus icon-btn" @click="addSynonym"></i>
            <i v-else class="el-icon-remove icon-btn" @click="moveSynonym(item)"></i>
          </div>
        </el-form-item>
        <el-form-item label="回复文本" prop="answer">
          <el-input type="textarea" :rows="10" size="mini" v-model="formData.answer"></el-input>
        </el-form-item>
        <el-form-item label="特点" prop="feature">
          <el-input type="textarea" :rows="10" size="mini" v-model="formData.feature"></el-input>
        </el-form-item>
        <el-form-item label="原则" prop="principle">
          <el-input type="textarea" :rows="10" size="mini" v-model="formData.principle"></el-input>
        </el-form-item>
        <el-form-item label="营销员指令" prop="instruction">
          <el-input size="mini" v-model="formData.instruction"></el-input>
        </el-form-item>
        <el-form-item label="营销动作">
          <div v-for="(item,index) in formData.marketingStrategyList" class="synonym-item">
            <el-form label-width="80px" ref="childMarket" :model="item" :rules="marketingStrategyRules" style="margin-top: 20px; width: 95%">
              <el-form-item label="营销时间" prop="timeInterval">
                <el-select style="width: 100%" size="mini" v-model="item.timeInterval" placeholder="请选择时间营销时间">
                  <el-option label="1分钟" :value="60"></el-option>
                  <el-option label="10分钟" :value="600"></el-option>
                  <el-option label="30分钟" :value="1800"></el-option>
                  <el-option label="1小时" :value="3600"></el-option>
                  <el-option label="5小时" :value="18000"></el-option>
                  <el-option label="12小时" :value="43200"></el-option>
                  <el-option label="1天" :value="86400"></el-option>
                  <el-option label="2天" :value="172800"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="营销动作" prop="action" style="margin-top: 15px;">
                <el-input type="textarea" :rows="3" size="mini" placeholder="请输入营销动作" v-model="item.action" class="input-with-select"></el-input>
              </el-form-item>
            </el-form>
            <i slot="append" v-if="index === 0" class="el-icon-circle-plus icon-btn" @click="addMarketingStrategy"></i>
            <i slot="append" v-else class="el-icon-remove icon-btn" @click="moveMarketingStrategy(index)"></i>
            
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center">
      <el-button type="success" style="margin-top: 12px;" size="mini" @click="submit">{{edit ? '修改' : '添加'}}</el-button>
      <el-button style="margin-top: 12px;" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'


@Component
export default class AddMarketing extends Vue {
  private synonymList: any[] = [
    {
      content: ''
    }
  ]
  private tagIdList: any[] = []
  private tags: any[] = []
  private formData: any = {
    matchType: 0,
    question: '',
    synonymStr: '',
    type: 4,
    answer: '',
    chatRecordType: '0',
    remark: '',
    timeSlot: '',
    tagIds: '',
    feature: '',
    principle: '',
    instruction: '',
    marketingStrategyList: [
      {
        'timeInterval': '',
        'action': ''
      }
    ]
  }
  @Prop({default: false})
  private edit!: boolean

  @Watch('tagIdList')
  private tagIdChange (val: number) {
    console.log(val)
    this.formData.tagIds = val
  }
  private addTagRules: any = {
    question: [
      { required: true, message: '请输入关键词', trigger: 'blur' },
      { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
    ],
    answer: [
      { required: true, message: '请输入回复内容', trigger: 'blur' },
      { min: 1, max: 2048, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
    ],
    synonymStr: [
      { min: 1, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
    ],
    timeSlot: [
      { min: 1, max: 500, message: '选择时间段', trigger: 'blur' }
    ],
    tagIds: [
      { required: true, message: '请选择适用标签', trigger: 'blur' }
    ]
  }
  private marketingStrategyRules: any = {
    timeInterval: [
      { required: true, message: '请选择营销时间' }
    ],
    action: [
      { required: true, message: '请填写营销动作' }
    ]
  }
  // private tagIdChange (val: any) {
  //   console.log(val)
  // }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private async created () {
    const data = await this.$store.dispatch('wxtool/getSingleList', {
      ...this.params,
      type: 3,
      size: 100
    })
    this.tags = data.records
    if (this.edit) {
      const data = await this.$store.dispatch('wxtool/wechatGetSingle')
      this.formData = {
        matchType: 0,
        question: data.data.question,
        synonymStr: '',
        type: data.data.type,
        answer: data.data.answer,
        chatRecordType: String(data.data.chatRecordType),
        remark: '',
        timeSlot: data.data.timeSlot,
        feature: data.data.feature,
        principle: data.data.principle,
        instruction: data.data.instruction,
        marketingStrategyList: []
      }
      if (data.data.synonymList.length > 0) this.synonymList = data.data.synonymList
      else this.synonymList = [{content: ''}]
      if (data.data.tagList.length > 0) {
        data.data.tagList.map((tag: any) => {
          this.tagIdList = tag.id
        })
      }
      if (data.data.marketingStrategyList.length > 0) {
        data.data.marketingStrategyList.map((market: any) => {
          this.formData.marketingStrategyList.push({
            'timeInterval': market.timeInterval,
            'action': market.action
          })
        })
      }
    }
  }
  private async submit () {
    this.formData.marketingStrategyList.map((child: any, index: number) => {
      if (child.timeInterval === '' || child.action === '') {
        this.formData.marketingStrategyList.splice(index, 1)
      }
    })
    const marketingStrategForm: any = this.$refs.marketingStrategForm
    marketingStrategForm.validate(async (validate: boolean) => {
        this.synonymList.map( item => {
          this.formData.synonymStr = `${this.formData.synonymStr !== '' ? `${this.formData.synonymStr},` : ''}${item.content}`
        })
        let data: any = {}
        if (this.edit) {
          data = await this.$store.dispatch('wxtool/wechatFixSingle', {
            ...this.params,
            ...this.formData
          })
        } else {
          data = await this.$store.dispatch('wxtool/wechatAddsigle', {
            ...this.params,
            ...this.formData
          })
        }
        const singleList = await this.$store.dispatch('wxtool/getSingleList', {
          ...this.params,
          type: 4,
          size: 100
        })
        this.$store.commit('wxtool/SET_FRIENDTAGNAME', singleList.records[0].answer || '')
        this.$store.commit('wxtool/SET_SINGLETAGID', singleList.records[0].id || '')
        this.$store.dispatch('wxtool/wechatFriendTagList', {
          ...this.params,
          size: 100,
          tagId: singleList.records[0].id
        })
        if (data.errcode === 200) {
          this.$notify({
            title: '提示',
            message: `您${this.edit ? '修改' : '添加'}的${this.formData.question}标签策略，已${this.edit ? '修改' : '添加'}成功`,
            type: 'success'
          })
          this.cancel()
        } else {
          this.$notify({
            title: `${this.edit ? '修改' : '添加'}失败`,
            message: `您${this.edit ? '修改' : '添加'}的${this.formData.question}标签策略，因${data.data}${this.edit ? '修改' : '添加'}失败`,
            type: 'error'
          })
        }
      // })
    })
  }
  // 添加相似问题
  private addSynonym () {
    this.synonymList.push({
      content: ''
    })
  }
  private moveSynonym (item: any) {
    const index = this.synonymList.indexOf(item)
    if (index !== -1) {
      this.synonymList.splice(index, 1)
    }
  }
  private addMarketingStrategy () {
    this.formData.marketingStrategyList.push({
      'timeInterval': '',
      'action': ''
    })
  }
  private moveMarketingStrategy (index: number) {
    this.formData.marketingStrategyList.splice(index, 1)
  }
  private cancel () {
    this.$emit('close')
  }
}
</script>
<style lang="scss" scoped>
.add-tag-dialog {
  text-align: left;
  .el-steps {
    width: 40%;
    margin: 0 auto;
  }
  .synonym-item {
    display: flex;
    .el-input {
      flex: 1;
    }
    .el-icon-circle-plus {
      color: green
    }
    .el-icon-remove {
      color: red
    }
  }
  .icon-btn {
    padding: 5px;
    margin-left: 5px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
  }
  .el-form {
    width: 75%;
    margin: 0 auto;
  }
}
</style>

