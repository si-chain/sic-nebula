<template>
  <div class="add-banner">
    <el-form ref="bannerForm" label-position="right" :rules="rules" label-width="120px" :model="form">
      <el-form-item label="姓名" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headimgurl">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="handleUpload">
          <img v-if="form.headimgurl" :src="form.headimgurl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="职责描述" prop="describes">
        <el-input size="mini" v-model="form.describes"></el-input>
      </el-form-item>
      <el-form-item label="服务经验" prop="experience">
        <el-input size="mini" v-model="form.experience"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input size="mini" type="number" v-model="form.mobile"></el-input>
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
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
    ],
    describes: [
      { required: true, message: '请输入职责描述', trigger: 'blur' },
      { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
    ],
    experience: [
      { required: true, message: '请输入服务经验', trigger: 'blur' },
      { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
    ],
    headimgurl: [
      { required: true, message: '请上传头像' }
    ]
  }
  private form: any = {
    type: 3,
    headimgurl: '',
    name: '',
    describes: '',
    experience: '',
    mobile: ''
  }
  @Prop({ default: false})
  private isEdit!: any
  @Prop({})
  private id!: number
  private async created () {
    if (this.isEdit) {
      const data = await this.$store.dispatch('organization/getTeamUser', this.isEdit)
      this.form = data.data
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
        that.form.headimgurl = res.url
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
      if (valid && this.form.headimgurl !== '') {
        const data = {
          cid: this.id,
          gid: this.$store.state.user.userInfo.gid,
          ...this.form
        }
        let result
        if (this.isEdit) {
          result = await this.$store.dispatch('organization/putTeamUser', {
            'id': this.isEdit,
            params: {
              ...data
            }
          })
        } else {
          result = await this.$store.dispatch('organization/addTeamUser', data)
        }
        if (result.errcode === 200) {
          this.$message.success(`人员${this.isEdit ? '修改' : '添加'}成功！`)
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
