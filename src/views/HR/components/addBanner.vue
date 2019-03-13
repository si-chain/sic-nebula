<template>
  <div class="add-banner">
    <el-form label-position="right" label-width="120px" :model="form">
      <el-form-item label="banner名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="banner">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="handleUpload">
          <img v-if="form.bannerUrl" :src="form.bannerUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="success" style="margin-top: 12px;" size="mini" @click="submit">添加</el-button>
      <el-button style="margin-top: 12px;" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Cuoss from 'cuoss'

@Component
export default class AddBanner extends Vue {
  private bannerUrl: string = ''
  private isLoading: boolean = false
  private form: any = {
    bannerUrl: '',
    name: '',
    time: ''
  }
  @Prop({ default: false})
  private isEdit!: boolean
  private handleUpload (files: any) {
    this.isLoading = true
    const cuoss = new Cuoss({
      type: 'public',
      baseURL: '/api'
    })
    const that = this
    cuoss.upload(files.file, {
      parseFail (error: any) {
        that.$message.error(error)
      },
      async uploadSuccess (res: any) {
        that.isLoading = false
        
      },
      uploadProgress (progress: any) {
        that.$notify.success({
          title: `${progress < 100 ? 'logo上传中' : '上传成功'}`,
          message: `${progress < 100 ? `文件进度${progress}%` : 'logo上传成功'}`
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
  private submit () {
    
  }
  private cancel () {
    this.$emit('close')
  }
}
</script>
<style lang="scss" scoped>
.el-icon-plus {
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
