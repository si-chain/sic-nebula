<template>
  <div class="mp-config">
    <!-- <p class="label">请输入欢迎词 
      <el-button v-if="!speechId" size="mini" type="success" @click="addWelcomeSpeech">提交欢迎词</el-button>
      <el-button v-else size="mini" type="success" @click="putWelcomeSpeech">更新欢迎词</el-button>
    </p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入欢迎词"
      v-model="textarea">
    </el-input> -->
    <el-form :model="form" label-width="100px" size="mini" style="width:600px">
      <el-form-item label="当前配置商城">
        <el-select
          clearable
          @change="agencyChange"
          placeholder="服务用户"
          v-model="form.cid"
        >
          <el-option :key="item.id" :label="item.groupname" :value="item.id" v-for="item in groups"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <p class="label">logo配置</p>
    <el-upload
      class="avatar-uploader"
      action
      :show-file-list="false"
      :http-request="handleUpload">
      <img v-if="LogoUrl" :src="LogoUrl" class="avatar-img">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="label">banner配置 <el-button size="mini" type="success"@click="addBannerLog()">添加</el-button></p>
    <div class="banner-box">
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
    </div>
    <div v-if="isAgency">
      <p class="label">服务团队 <el-button size="mini" type="success"@click="addTeamLog()">添加</el-button></p>
      <div class="banner-box">
        <el-table
          :data="ServiceTeam"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
            <template slot-scope="scope">
              <el-popover placement="top" trigger="hover">
                <img :src="scope.row.headimgurl" :alt="scope.row.name" width="200" height="">
                <el-tag slot="reference">{{scope.row.name}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
            <!-- <template slot-scope="scope">
              <el-tag v-if="scope.row.state === 0" type="danger">失效</el-tag>
              <el-tag v-else>生效</el-tag>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="describes"
            label="职责描述"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="experience"
            label="服务经验"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="editTeam(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeTeamUser(scope.row)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <el-dialog :visible.sync="addBanner" title="banner配置">
      <banner v-if="addBanner" :id="form.cid" :isEdit="editBannerId" @close="closeBanner()"></banner>
    </el-dialog>
    <el-dialog :visible.sync="addTeam" title="团队配置">
      <serviceTeam v-if="addTeam" :id="form.cid" :isEdit="editTeamId" @close="closeTeam()"></serviceTeam>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import banner from '@/views/HR/components/addBanner.vue'
import serviceTeam from './components/serviceTeam.vue'
import Cuoss from 'cuoss'

@Component({
  components: {
    banner,
    serviceTeam
  }
})
export default class MpConfig extends Vue {
  private textarea: string = ''
  private speechId: any = false
  private editBannerId: any = undefined
  private editTeamId: any = undefined
  private logoId: any = false
  private LogoUrl: string = ''
  private isLoading: boolean = false
  private addBanner: boolean = false
  private addTeam: boolean = false
  private logoList: any[] = []
  private groups: any[] = []
  private tableData: any[] =  []
  private ServiceTeam: any[] =  []
  private isAgency: boolean = false
  private form: any = {
    cid: ''
  }
  @Watch('isAgency')
  private async isAgencyChange (val: boolean) {
    if (val) {
      const ServiceTeam = await this.$store.dispatch('hr/getUserList', {
        gid: this.form.cid,
        type: 3,
        cid: this.$store.state.user.userInfo.gid,
        size: 20
      })
      if (ServiceTeam.errcode === 200) {
        this.ServiceTeam = ServiceTeam.data.records
      }
    }
  }
  private async created () {
    const res = await this.$store.dispatch('organization/getGroupList')
    res.success ? this.groups = res.data : this.groups = []
    this.form.cid = res.data[1].id
    this.groups.map((group: any) => {
      if (this.form.cid === group.id && group.grouplevel === 2) {
        this.isAgency = true
      }
    })
    this.getData()
  }
  private agencyChange (val: any) {
    this.form.cid = val
    this.groups.map((group: any) => {
      if (this.form.cid === group.id ) {
        group.grouplevel === 2 ? this.isAgency = true : this.isAgency = false
      }
    })
    this.getData()
  }
  private async getData () {
    const speechData = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.form,
      'key': 'welfareWelcomeSpeech'
    })
    if (speechData.errcode === 200 && speechData.data.length > 0) {
      this.textarea = speechData.data[0].value
      this.speechId = speechData.data[0].id
    }
    const logoData = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.form,
      'key': 'welfareLogo'
    })
    if (logoData.errcode === 200) {
      if (logoData.data.length > 0) {
        this.logoList = [{
          url: logoData.data[0].value,
          name: logoData.data[0].name
        }]
        this.LogoUrl = logoData.data[0].value
        this.logoId = logoData.data[0].id
      } else {
        this.LogoUrl = ''
        this.logoId = false
      }
    }
    const bannerData = await this.$store.dispatch('hr/getMpConfigs', {
      ...this.form,
      'key': 'welfareBannner'
    })
    if (bannerData.errcode === 200) {
      this.tableData = bannerData.data
    }
  }
  // 添加配置
  private async addConfigure (addData: any) {
    const data = await this.$store.dispatch('hr/addConfigure', {
      ...this.form,
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
      'id': this.form.cid,
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
  // 上传logo
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
    this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await this.$store.dispatch('hr/removeConfigure', item.id)
      if (data.errcode === 200) {
        this.$message.success('删除成功!')
      } else {
        this.$message.error('删除失败!')
      }
      this.getData()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
  // 删除团队成员
  private removeTeamUser (item: any) {
    this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await this.$store.dispatch('organization/delTeamUser', item.id)
      if (data.errcode === 200) {
        this.$message.success('删除成功!')
      } else {
        this.$message.error('删除失败!')
      }
      this.isAgencyChange(true)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
  // 添加banner
  private addBannerLog () {
    this.editBannerId = undefined
    this.addBanner = true
  }
  private addTeamLog () {
    this.editTeamId = undefined
    this.addTeam = true
  }
  // 编辑banner
  private editBanner (item: any) {
    this.editBannerId = item.id
    this.addBanner = true
  }
  private editTeam (item: any) {
    this.editTeamId = item.id
    this.addTeam = true
  }
  private closeBanner () {
    this.addBanner = false
    this.getData()
  }
  private closeTeam () {
    this.addTeam = false
    this.getData()
    this.isAgencyChange(true)
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
