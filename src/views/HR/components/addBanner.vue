<template>
  <div class="add-banner">
    <el-form ref="bannerForm" label-position="right" :rules="rules" label-width="120px" :model="form">
      <el-form-item label="banner名称" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="banner" prop="bannerUrl">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="handleUpload">
          <img v-if="form.bannerUrl" :src="form.bannerUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="isEdit" label="状态">
        <el-switch v-model="state"></el-switch>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="success" style="margin-top: 12px;" size="mini" @click="submit">{{isEdit ? '修改' : '添加'}}</el-button>
      <el-button style="margin-top: 12px;" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Cuoss from 'cuoss'

@Component
export default class AddBanner extends Vue {
  private isLoading: boolean = false
  private state: boolean = true
  private rules: any = {
    name: [
      { required: true, message: '请输入Banner名称', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
    ],
    bannerUrl: [
      { required: true, message: '请上传banner' }
    ]
  }
  private form: any = {
    bannerUrl: '',
    name: ''
  }
  @Prop({ default: false})
  private isEdit!: any
  @Prop({})
  private id!: number
  private async created () {
    if (this.isEdit) {
      const data = await this.$store.dispatch('hr/getMpConfig', this.isEdit)
      this.form.name = data.data.name
      this.form.bannerUrl = data.data.value
      this.state = data.data.state === 1
    }
  }
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
        that.form.bannerUrl = res.url
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
    const bannerForm: any = this.$refs.bannerForm
    bannerForm.validate(async (valid: boolean) => {
      if (valid && this.form.bannerUrl !== '') {
        const data = {
          cid: this.id || this.$store.state.user.userInfo.gid,
          'key': 'welfareBannner',
          'value': this.form.bannerUrl,
          'name': this.form.name
        }
        let result
        if (this.isEdit) {
          result = await this.$store.dispatch('hr/putConfigures', {
            'id': this.isEdit,
            params: {
              ...data,
              state: this.state ? 1 : 0
            }
          })
        } else {
          result = await this.$store.dispatch('hr/addConfigures', data)
        }
        if (result.errcode === 200) {
          this.$message.success(`banner${this.isEdit ? '修改' : '添加'}成功！`)
          this.cancel()
        } else {
          this.$message.error(result.errmsg)
        }
      }
    })
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
