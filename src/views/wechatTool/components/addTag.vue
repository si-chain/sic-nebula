<template>
  <div class="add-tag-dialog">
    <div>
      <el-form ref="form" :rules="addTagRules" :model="formData" label-width="110px">
        <el-form-item label="标签名" prop="answer">
          <el-input size="mini" v-model="formData.answer"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="question">
          <el-input size="mini" v-model="formData.question"></el-input>
        </el-form-item>
        <el-form-item label="模糊关键词" prop="synonymStr">
          <el-input size="mini" v-model="formData.synonymStr"></el-input>
        </el-form-item>
        <el-form-item label="适用类型" prop="chatRecordType">
          <el-select size="mini" v-model="formData.chatRecordType" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="群好友" value="2"></el-option>
          </el-select>
        </el-form-item>
        </el-form>
    </div>
    <div style="text-align: center">
      <el-button type="success" style="margin-top: 12px;" @click="submit">添加</el-button>
      <el-button style="margin-top: 12px;" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AddTag extends Vue {
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
    ]
  }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private formData: any = {
    matchType: 0,
    question: '',
    synonymStr: '',
    type: 3,
    answer: '',
    chatRecordType: '0',
    remark: ''
  }
  private async submit () {
    const data = await this.$store.dispatch('wxtool/wechatAddsigle', {
      ...this.params,
      ...this.formData
    })
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
        message: `您添加的${this.formData.answer}标签，已添加成功`,
        type: 'success'
      })
      this.cancel()
    } else {
      this.$notify({
        title: '添加失败',
        message: `您添加的${this.formData.answer}标签，因${data.data}添加失败`,
        type: 'error'
      })
    }
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
  .el-form {
    width: 60%;
    margin: 0 auto;
  }
}
</style>

