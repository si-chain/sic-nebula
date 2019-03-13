<template>
  <div class="mp-config">
    <p class="label">请输入欢迎词 
      <el-button v-if="textarea === ''" size="mini" type="success" @click="addWelcomeSpeech">提交欢迎词</el-button>
      <el-button v-else size="mini" type="success" @click="putWelcomeSpeech">更新欢迎词</el-button>
    </p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入欢迎词"
      v-model="textarea">
    </el-input>
    <p class="label">logo配置</p>
    <el-upload
      class="avatar-uploader"
      action
      :show-file-list="false"
      :http-request="handleUpload">
      <img v-if="LogoUrl" :src="LogoUrl" class="avatar-img">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="label">banner配置 <el-button size="mini" type="success"@click="addBanner = true">添加</el-button></p>
    <div class="banner-box">
      <el-button-group>
        
      </el-button-group>
      <el-table
        :data="tableData"
        border
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
            <el-button-group>
              <el-button size="mini" type="primary" icon="el-icon-edit" >编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" >删除</el-button>
            </el-button-group>
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
    <el-dialog :visible.sync="addBanner" title="banner配置">
      <banner v-if="addBanner" :isEdit="false" @close="addBanner = false"></banner>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import uploadImage from '../../components/uploadImage.vue'
import banner from './components/addBanner.vue'
import Cuoss from 'cuoss'

@Component({
  components: {
    uploadImage,
    banner
  }
})
export default class MpConfig extends Vue {
  private textarea: string = ''
  private SpeechId: any = undefined
  private logoId: any = undefined
  private LogoUrl: string = ''
  private isLoading: boolean = false
  private addBanner: boolean = false
  private logoList: any[] = []
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
  private get params () {
    return {
      cid: 12
    }
  }
  private async created () {
    if (!this.params.cid) {
      await this.$store.dispatch('user/getUserInfo')
    }
    const data = await this.$store.dispatch('hr/getMpConfig', {
      ...this.params
    })
    data.data.map((item: any) => {
      if (item.key === 'welcomeSpeech') {
        this.textarea = item.value
        this.SpeechId = item.id
      }
      if (item.key === 'logo') {
        this.logoList = [{
          url: item.value,
          name: item.name
        }]
        this.LogoUrl = item.value
        this.logoId = item.id
      }
    })
  }
  // 添加配置
  private async addConfigure (addData: any) {
    const data = await this.$store.dispatch('hr/addConfigure', {
      ...this.params,
      ...addData
    })
    if (data.errcode === 200) {
      this.$message.success('添加成功!')
    } else {
      this.$message.error('添加失败!')
    }
    return data
  }
  // 修改配置
  private async putConfigure (id: number, putData: any) {
    const data = await this.$store.dispatch('hr/putConfigure', {
      'id': id,
      params: {
        ...putData
      }
    })
    if (data.errcode === 200) {
      this.$message.success('修改成功!')
    } else {
      this.$message.error('修改失败!')
    }
    return data
  }
  // 添加欢迎词
  private async addWelcomeSpeech () {
    const data = {
      'key': 'welcomeSpeech',
      'value': this.textarea,
      'name': '欢迎词'
    }
    await this.addConfigure(data)
  }
  // 修改欢迎词
  private async putWelcomeSpeech () {
    const data = {
      'key': 'welcomeSpeech',
      'value': this.textarea,
      'name': '欢迎词'
    }
    await this.putConfigure(this.SpeechId, data)
  }
  private handleGetImage (file: any) {
    this.logoList = [{
      url: file.url,
      name: file.name
    }]
    const data = {
      'key': 'logo',
      'value': file.url,
      'name': file.name
    }
    if (this.logoId) {
      this.putConfigure(this.logoId, data)
    } else {
      this.addConfigure(data)
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
        that.logoList = [{
          url: res.url,
          name: files.file.name
        }]
        const data = {
          'key': 'logo',
          'value': res.url,
          'name': files.file.name
        }
        let result: any = {}
        if (that.logoId) {
          result = await that.putConfigure(that.logoId, data)
        } else {
          result = await that.addConfigure(data)
        }
        if (result.errcode === 200) that.LogoUrl = res.url
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
}
</script>
<style lang="scss" scoped>
.mp-config {
  padding: 30px;
  text-align: left;
}
.label {
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 10px;
  margin: 20px 0 10px;
  border-bottom: 1px solid #ccc6;
}
.avatar-uploader {
  padding: 20px 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-icon-plus,.avatar-img {
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
.avatar-img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
