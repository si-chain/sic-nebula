<template>
  <div class="hr-detail">
    <el-form :model="form" size="mini" label-width="150px" style="width:600px;padding-top: 50px;margin: 0px 25%;">
      <el-form-item label="公司名称">
        <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信息代码">
        <el-input v-model="form.code" placeholder="请输入统一社会信息代码"></el-input>
      </el-form-item>
      <el-form-item label="营业执照">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="归属密码">
        <span class="symb-code">1111</span>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 200px" type="success">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HRdetail extends Vue {
  private form: any = {}
  private imageUrl: string = ''
  private handleAvatarSuccess (res: any, file: any) {
    this.imageUrl = URL.createObjectURL(file.raw)
  }
  private beforeAvatarUpload (file: any) {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }
}
</script>
<style lang="scss" scoped>
.hr-detail {
  height: 100%;
  background: url(https://confidentcustomer.com/img/site/heading_bg.png);
  background-size: 100% 100%;
  text-align: left;
  .el-form {
    font-size: 50px;
    .el-input {
      width: 320px;
    }
  }
}


.symb-code {
  font-size: 30px;
  font-weight: 600;
  color: #ffffff;
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
  color: #ffffff;
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
