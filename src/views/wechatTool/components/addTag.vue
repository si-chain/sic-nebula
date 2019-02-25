<template>
  <div class="add-tag-dialog">
    <el-steps :active="active" finish-status="success">
      <el-step title="添加标签"></el-step>
      <el-step title="添加人员"></el-step>
    </el-steps>
    <div v-if="active === 0">
      <el-form ref="form" :model="formData" label-width="110px">
        <el-form-item label="标签名">
          <el-input v-model="formData.answer"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="formData.question"></el-input>
        </el-form-item>
        <el-form-item label="模糊关键词">
          <el-input v-model="formData.synonymStr"></el-input>
        </el-form-item>
        <el-form-item label="适用类型">
          <el-select v-model="formData.chatRecordType" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="群" value="2"></el-option>
          </el-select>
        </el-form-item>
        </el-form>
    </div>
    <div>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AddTag extends Vue {
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private formData: any = {
    matchType: 2,
    question: '你好',
    synonymStr: 'hello,您好',
    type: 3,
    answer: '问候达人',
    chatRecordType: 0,
    remark: '测试'
  }
  private active: number = 0
  private next () {
    if (this.active++ > 1) this.active = 0
  }
}
</script>
<style lang="scss" scoped>
.add-tag-dialog {
  text-align: left;
}
</style>

