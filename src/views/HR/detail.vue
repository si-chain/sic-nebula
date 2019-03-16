<template>
  <div class="hr-detail">
    <el-form :model="form" ref="groupInfo" :rules="rules" size="mini" label-width="150px" style="width:60%;padding-top: 50px;margin: 0px 19%;">
      <el-form-item label="公司名称" prop="groupname">
        <el-input v-model="form.groupname" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信息代码" prop="code">
        <el-input v-model="form.code" placeholder="请输入统一社会信息代码"></el-input>
      </el-form-item>
      <el-form-item label="营业执照">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="handleUpload">
          <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="归属密码" prop="attributionCode" v-if="attributionCode !== null">
        <span class="symb-code">{{attributionCode}}</span>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" style="width: 84%;margin-top: 20px;" type="success" @click="submit">{{attributionCode ? '更改' : '注册'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Cuoss from 'cuoss'

@Component
export default class HRdetail extends Vue {
  private form: any = {
    groupname: '',
    code: '',
    businessLicense: '',
    grouptype: 0,
    appId: 2
  }
  private rules: any = {
    groupname: [
      { required: true, message: '请输入公司名称', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    code: [
      { required: true, message: '请输入统一社会信息代码', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ]
  }
  private imageUrl: string = ''
  private isLoading: boolean = false
  private attributionCode: any = 0
  private async created () {
    this.getData()
  }
  // 获取机构信息
  private async getData () {
    if (this.$store.state.user.userInfo.gid) {
      const info = await this.$store.dispatch('hr/getGroupInfo', this.$store.state.user.userInfo.gid)
      this.form = {
        groupname: info.data.groupname,
        code: info.data.code,
        businessLicense: info.data.businessLicense,
        grouptype: 0
      }
      this.attributionCode = info.data.attributionCode
    } else {
      await this.$store.dispatch('user/getUserInfo')
      this.getData()
    }
  }
  // 上传oss
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
        that.form.businessLicense = res.url
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
    const groupInfo: any = this.$refs.groupInfo
    groupInfo.validate(async (valid: boolean) => {
      if (valid) {
        const data = await this.$store.dispatch('hr/updateGroupInfo', {
          id: this.$store.state.user.userInfo.gid,
          ...this.form
        })
        if (data.errcode === 200) {
          this.$message.success('信息更新成功')
        } else {
          this.$message.error(data.errmsg)
        }
        this.getData()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.hr-detail {
  height: 100%;
  background: #ccc6;
  background-size: 100% 100%;
  text-align: left;
  padding-top: 50px;
  .el-form {
    font-size: 50px;
    padding: 50px;
    background: #ffffff;
    box-shadow: 0 0 5px 1px #aaa3a3;
    border-radius: 6px;
    .el-input {
      width: 84%;
    }
  }
}


.symb-code {
  font-size: 30px;
  font-weight: 600;
  // color: #ffffff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 80px;
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  color: #d9d9d9;
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
