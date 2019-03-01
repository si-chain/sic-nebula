<template>
  <div class="mp-config">
    <p class="label">请输入欢迎词</p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入欢迎词"
      v-model="textarea">
    </el-input>
    <p class="label">logo配置</p>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="label">banner配置</p>
    <div class="banner-box">
      <el-button size="mini" type="success">添加</el-button>
      <el-button size="mini" type="danger">删除</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
         <el-table-column
          prop="date"
          label="上传时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="text-align: right; padding: 10px 0;"
        layout="prev, pager, next"
        :total="3">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MpConfig extends Vue {
  private textarea: string = ''
  private imageUrl: string = ''
  private tableData: any[] =  [
    {
      date: '2019-02-02',
      name: '乐健一生',
      status: '已开启'
    },
    {
      date: '2019-02-02',
      name: '华夏健康人生促销',
      status: '已开启'
    }
  ]
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
.mp-config {
  padding: 30px;
}
.label {
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 10px;
  margin: 20px 0 10px;
  border-bottom: 1px solid #ccc6;
}
.avatar-uploader-icon {
  font-size: 28px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;

  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
