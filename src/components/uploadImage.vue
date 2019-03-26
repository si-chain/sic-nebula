<!--
 * @Author: jhd
 * @Description: 上传图片 包括头像 logo
 * @Date: 2019-03-13 15:44:39
 -->
<template>
  <el-upload
    :accept="accept"
    list-type="picture"
    :before-remove="handleBeforeRemove"
    :disabled="isLoading"
    :http-request="handleUpload"
    :limit="limit"
    :show-file-list="showFile"
    :file-list="fileList"
    :on-exceed="handleExceed"
    :on-preview="handleClickFileItem"
    action
  >
    <i v-if="showFile" class="el-icon-plus"></i>
    <template v-else>
      <img v-if="fileList.length > 0" :src="fileList[0].url" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </template>
  </el-upload>
</template> 
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Cuoss from 'cuoss'

@Component
export default class Upload extends Vue {
  @Prop({})
  private limit!: number
  @Prop({ default: '' })
  private accept!: string
  @Prop({})
  private fileList!: any[]
  @Prop({ default: 'private' })
  private type!: string
  @Prop({default: true})
  private showFile!: boolean
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
      parseFail (error: any) {
        that.$message.error(error)
      },
      uploadSuccess (res: any) {
        that.isLoading = false
        that.$emit('getImage', {
          key: res.name,
          url: res.url,
          name: files.file.name
        })
      },
      uploadProgress (progress: any) {
        that.$notify.success({
          title: `${progress < 100 ? '文件上传中' : '上传成功'}`,
          message: `${progress < 100 ? `文件进度${progress}%` : '上传成功'}`
        })
      },
      uploadFail (error: any) {
        that.$message.error(error.toString())
        that.isLoading = false
      },
      parseProgress (res: any) {
        // 解析文件
      },
      parseSuccess (md5: any) {
        // 解析成功
      }
    })
  }
  private handleBeforeRemove (file: any, fileList: any[]) {
    const fileArr = JSON.parse(JSON.stringify(fileList))
    for (const i of Object.keys(fileArr)) {
      const item = fileArr[i]
      if (item.uid === file.uid) {
        this.removeIndex = i
        break
      }
    }
    this.$emit('remove', this.removeIndex)
  }
  private handleExceed () {
    this.$message({
      type: 'warning',
      message: `最多只允许上传${this.limit}个`
    })
  }
  // 点击文件列表已上传的文件
  private handleClickFileItem (file: any) {
    window.open(file.url, '_blank')
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader,.el-icon-plus {
  border: 1px dashed #cccccc;
  border-radius: 5px;
}
.avatar-uploader .el-upload:hover,.el-icon-plus:hover {
  border-color: #38c701c4;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
