<template>
  <div class="mp-config">
    <p class="label">请输入欢迎词 
      <el-button v-if="!speechId" size="mini" type="success" @click="addWelcomeSpeech">提交欢迎词</el-button>
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
      :http-request="uploadLogo">
      <img v-if="LogoUrl" :src="LogoUrl" class="avatar-img">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="label">公司通知</p>
    <el-upload
      class="avatar-uploader"
      action
      :show-file-list="false"
      :http-request="uploadNotify">
      <img v-if="notifyUrl" :src="notifyUrl" class="avatar-img">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-input placeholder="请输入内容" v-model="CompanyNoticeText" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="putCompanyNoticeText"></el-button>
    </el-input>
    <p class="label">banner配置 <el-button size="mini" type="success"@click="addBannerLog()">添加</el-button></p>
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
          <template slot-scope="scope">
            <el-popover placement="top" trigger="hover">
              <img :src="scope.row.value" :alt="scope.row.name" width="200" height="">
              <el-tag slot="reference">{{scope.row.name}}</el-tag>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 0" type="danger">失效</el-tag>
            <el-tag v-else>生效</el-tag>
          </template>
        </el-table-column>
         <el-table-column
          prop="ct"
          label="上传时间">
          <template slot-scope="scope">
            <span>{{scope.row.ct | format('yyyy-MM-dd hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editBanner(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeBanner(scope.row)">删除</el-button>
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
      <banner v-if="addBanner" :isEdit="editId" @close="closeBanner()"></banner>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import uploadImage from '../../components/uploadImage.vue'
import banner from './components/addBanner.vue'
import Cuoss from 'cuoss'

@Component({
  components: {
    // uploadImage,
    banner
  }
})
export default class MpConfig extends Vue {
  private textarea: string = ''
  private speechId: any = false
  private editId: any = undefined
  private logoId: any = false
  private LogoUrl: string = ''
  private notifyUrl: string = ''
  private notifyId: any = false
  private isLoading: boolean = false
  private addBanner: boolean = false
  private logoList: any[] = []
  private notifyId1: any = false
  private tableData: any[] =  []
  private CompanyNoticeText: string = ''
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.gid
    }
  }
  private created () {
    this.getData()
  }
  private async getData () {
    const speechData = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.params,
      'key': 'welfareWelcomeSpeech'
    })
    if (speechData.errcode === 200 && speechData.data.length > 0) {
      this.textarea = speechData.data[0].value
      this.speechId = speechData.data[0].id
    }
    const logoData: any = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.params,
      'key': 'welfareLogo'
    })
    if (logoData.errcode === 200 && logoData.data.length > 0) {
      this.logoList = [{
        url: logoData.data[0].value,
        name: logoData.data[0].name
      }]
      this.LogoUrl = logoData.data[0].value
      this.logoId = logoData.data[0].id
    }
    const NotifyData: any = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.params,
      'key': 'CompanyNoticeImg'
    })
    if (NotifyData.errcode === 200 && NotifyData.data.length > 0) {
      this.notifyUrl = NotifyData.data[0].value
      this.notifyId = NotifyData.data[0].id
    }
    console.log(this.logoId, this.notifyId)
    const NotifyData1 = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.params,
      'key': 'CompanyNoticeText'
    })
    if (NotifyData1.errcode === 200 && NotifyData1.data.length > 0) {
      this.CompanyNoticeText = NotifyData1.data[0].value
      this.notifyId1 = NotifyData1.data[0].id
    }
    const bannerData = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.params,
      'key': 'welfareBannner'
    })
    if (bannerData.errcode === 200) {
      this.tableData = bannerData.data
    }
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
    this.getData()
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
    this.getData()
    return data
  }
  // 添加欢迎词
  private async addWelcomeSpeech () {
    const data = {
      'key': 'welfareWelcomeSpeech',
      'value': this.textarea,
      'name': '欢迎词'
    }
    await this.addConfigure(data)
  }
  // 修改欢迎词
  private async putWelcomeSpeech () {
    const data = {
      'key': 'welfareWelcomeSpeech',
      'value': this.textarea,
      'name': '欢迎词'
    }
    await this.putConfigure(this.speechId, data)
  }
  private async uploadLogoCb (res: any, files: any) {
    const that = this
    that.isLoading = false
    that.logoList = [{
      url: res.url,
      name: files.file.name
    }]
    const data = {
      'key': 'welfareLogo',
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
    return
  }
  private async putCompanyNoticeText () {
    const data = {
      'key': 'CompanyNoticeText',
      'value': this.CompanyNoticeText,
      'name': '公司通知'
    }
    if (this.notifyId1) await this.putConfigure(this.notifyId1, data)
    else await this.addConfigure(data)
  }
  // 上传
  private uploadLogo (files: any) {
    this.handleUpload(files, this.uploadLogoCb)
  }
  private async uploadNotifyCb (res: any, files: any) {
    const that = this
    that.isLoading = false
    that.logoList = [{
      url: res.url,
      name: files.file.name
    }]
    const data = {
      'key': 'CompanyNoticeImg',
      'value': res.url,
      'name': files.file.name
    }
    let result: any = {}
    if (that.notifyId) {
      result = await that.putConfigure(that.notifyId, data)
    } else {
      result = await that.addConfigure(data)
    }
    if (result.errcode === 200) that.LogoUrl = res.url
  }
  private uploadNotify (files: any) {
    this.handleUpload(files, this.uploadNotifyCb)
  }
  private handleUpload (files: any, cb: (res: any, files: any) => Promise<void>) {
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
      uploadSuccess (res: any) {
        cb(res, files)
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
  // 删除banner
  private async removeBanner (item: any) {
    const data = await this.$store.dispatch('hr/removeConfigure', item.id)
    if (data.errcode === 200) {
      this.$message.success('删除成功!')
    } else {
      this.$message.error('删除失败!')
    }
    this.getData()
  }
  // 添加banner
  private addBannerLog () {
    this.editId = undefined
    this.addBanner = true
  }
  // 编辑banner
  private editBanner (item: any) {
    this.editId = item.id
    this.addBanner = true
  }
  private closeBanner () {
    this.addBanner = false
    this.getData()
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
