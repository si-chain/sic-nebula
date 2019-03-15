<template>
  <div>
    <el-alert title="为了提高准确率，请先下载模板，使用模板进行上传" type="warning"></el-alert>
    <el-button size="mini" plain style="margin:20px 0" type="primary">
      <a href="https://cdn.17doubao.com/online/cdn/huakai/accounts-template.xls" target="_blank">
        <i class="el-icon-download"></i>下载模板
      </a>
    </el-button>
    <el-upload
      :action="action"
      :http-request="uploadUsers"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      drag
      ref="upload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传持Excel 格式文件</div>
    </el-upload>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class UploadUserExcel extends Vue {
  @Prop({required: true})
  private type!: string
  private action: string = `/broker-outresource/api/brokerOutsourceStaff/import?cid=
    ${this.$store.state.user.userInfo.cid}&gid=${this.$store.state.user.userInfo.gid}&type=${this.type}`
  private async uploadUsers (file: any) {
    const loading = this.$loading({
      lock: true
    })
    const data = await this.$store.dispatch('hr/UploadUserExcel', file)
    loading.close()
    if (data.errcode === 200) {
      this.$alert(`${data.data}`, {
        confirmButtonText: '确定',
        callback: () => {
          this.close()
        }
      })
    } else {
      this.$message({
        type: 'error',
        message: data.data,
        duration: 0,
        showClose: true
      })
    }
  }
  private close () {
    this.$emit('close')
  }
}
</script>
