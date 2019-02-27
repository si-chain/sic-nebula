<!--
 * @Author: jhd
 * @Description: 添加消息设置 file content
 * @Date: 2019-02-26 18:09:50
 -->
<template>
  <div class="add-tag-dialog">
    <div>
      <el-form ref="form" :rules="addTagRules" :model="formData" label-width="110px">
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
        <el-form-item label="适用类型" prop="chatRecordType">
          <el-select size="mini" v-model="formData.chatRecordType" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="群好友" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回复时间段" prop="timeSlot">
          <template>
            <el-time-select
              format="HH:mm"
              @change="timeChange"
              placeholder="起始时间"
              size="mini"
              v-model="startTime"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }">
            </el-time-select>
            <el-time-select
              format="HH:mm"
              size="mini"
              @change="timeChange"
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
                start: startTime,
                step: '00:15',
                end: '23:45'
              }">
            </el-time-select>
          </template>
        </el-form-item>
        <el-form-item label="回复文本" prop="answer">
          <el-input size="mini" v-model="formData.answer"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center">
      <el-button type="success" style="margin-top: 12px;" size="mini" @click="submit">添加</el-button>
      <el-button style="margin-top: 12px;" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'


@Component
export default class AddTag extends Vue {
  private startTime: any = ''
  private endTime: string = ''
  private synonymList: any[] = [
    {
      content: ''
    }
  ]
  private formData: any = {
    matchType: 2,
    question: '',
    synonymStr: '',
    type: 1,
    answer: '',
    chatRecordType: '0',
    remark: '',
    timeSlot: ''
  }
  @Prop({default: false})
  private edit!: boolean
  private addTagRules: any = {
    question: [
      { required: true, message: '请输入关键词', trigger: 'blur' },
      { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
    ],
    answer: [
      { required: true, message: '请输入标签名', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    synonymStr: [
      { min: 1, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
    ],
    timeSlot: [
      { min: 1, max: 500, message: '选择时间段', trigger: 'blur' }
    ]
  }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private async created () {
    if (this.edit) {
      const data = await this.$store.dispatch('wxtool/wechatGetSingle')
      this.formData = {
        matchType: 2,
        question: data.data.question,
        synonymStr: '',
        type: 1,
        answer: data.data.answer,
        chatRecordType: String(data.data.chatRecordType),
        remark: '',
        timeSlot: data.data.timeSlot
      }
      if (data.data.synonymList.length > 0) this.synonymList = data.data.synonymList
      else this.synonymList = [{content: ''}]
      this.startTime = data.data.timeSlot.split('~')[0]
      this.endTime = data.data.timeSlot.split('~')[1]
    }
  }
  private async submit () {
    if (this.startTime !== '' && this.endTime === '') {
      this.$message.error('请选择结束时间')
      return false
    }
    this.synonymList.map( item => {
      this.formData.synonymStr
        = `${this.formData.synonymStr !== '' ? `${this.formData.synonymStr},` : ''}${item.content}`
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
      type: 3,
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
        message: `您${this.edit ? '修改' : '添加'}的${this.formData.question}标签，已${this.edit ? '修改' : '添加'}成功`,
        type: 'success'
      })
      this.cancel()
    } else {
      this.$notify({
        title: `${this.edit ? '修改' : '添加'}失败`,
        message: `您${this.edit ? '修改' : '添加'}的${this.formData.question}标签，因${data.data}${this.edit ? '修改' : '添加'}失败`,
        type: 'error'
      })
    }
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
  private cancel () {
    this.$emit('close')
  }
  private timeChange () {
    this.formData.timeSlot = `${this.startTime}~${this.endTime}`
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

