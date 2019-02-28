<template>
  <el-upload
    :accept="accept"
    :before-remove="handleBeforeRemove"
    :disabled="isLoading"
    :file-list="fileList"
    :http-request="handleUpload"
    :limit="limit"
    :on-exceed="handleExceed"
    :on-preview="handleClickFileItem"
    action
    class="upload-demo"
  >
    <el-button :disabled="isLoading" :loading="isLoading" type="primary">{{buttonName}}</el-button>
    <div class="el-upload__tip" slot="tip">
      <slot></slot>
    </div>
  </el-upload>
</template> 
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Cuoss from 'cuoss'

@Component
export default class Upload extends Vue {
  @Prop({})
  private limit!: number
  @Prop({ default: '' })
  private accept!: string
  @Prop({})
  private fileList!: any[]
  @Prop({ default: '点击上传' })
  private buttonName!: string
  @Prop({ default: 'private' })
  private type!: string
  private isLoading: boolean = false
  private removeIndex: string = ''
  private handleUpload (files: any) {
    this.isLoading = true
    const cuoss = new Cuoss({
      type: this.type,
      baseURL: '/api'
    })
    const that = this
    cuoss.upload(files.file, {
      parseFail(error: any) {
        that.$message.error(error)
      },
      uploadSuccess(res: any) {
        that.isLoading = false
        that.$emit('input', {
          key: res.name,
          url: res.url,
          name: files.file.name
        })
      },
      uploadFail(error: any) {
        that.$message.error(error.toString())
        that.isLoading = false
      }
    })
  }
  private handleBeforeRemove(file: any, fileList: any[]) {
    let fileArr = JSON.parse(JSON.stringify(fileList))
    for (var i in fileArr) {
      let item = fileArr[i]
      if (item.uid === file.uid) {
        this.removeIndex = i
        break
      }
    }
    this.$emit('remove', this.removeIndex)
  }
  private handleExceed() {
    this.$message({
      type: 'warning',
      message: `最多只允许上传${this.limit}个`
    })
  }
  // 点击文件列表已上传的文件
  private handleClickFileItem(file: any) {
    window.open(file.url, '_blank')
  }
}
</script>
