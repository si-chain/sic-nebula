<template>
  <div class="add-banner">
    <el-form ref="bannerForm" label-position="right" :rules="rules" label-width="120px" :model="form">
      <el-form-item label="姓名" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCard">
        <el-input size="mini" v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input size="mini" v-model="form.mobile"></el-input>
      </el-form-item>
       <el-form-item label="邮箱" prop="email">
        <el-input size="mini" v-model="form.email"></el-input>
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
    idCard: [
      { required: true, message: '请输入证件号' }
    ],
    email: [
      { required: false, message: '请输入邮箱号' }
    ],
    mobile: [
      { required: false, message: '请输入手机号' }
    ]
  }
  private form: any = {
    idCard: '',
    name: '',
    email: '',
    mobile: '',
    sex: '',
    idCardType: 1,
    type: 1
  }
  @Prop({ default: false})
  private isEdit!: any
  private async created () {
    if (this.isEdit) {
      const data = await this.$store.dispatch('organization/getTeamUser', this.isEdit)
      this.form = data.data
    }
  }
  private submit () {
    const bannerForm: any = this.$refs.bannerForm
    bannerForm.validate(async (valid: boolean) => {
      if (valid && this.form.bannerUrl !== '') {
        const data = {
          cid: this.$store.state.user.userInfo.cid,
          gid: this.$store.state.user.userInfo.gid,
          name: this.form.name,
          sex: this.form.sex,
          type: this.form.type,
          idCard: this.form.idCard,
          email: this.form.email,
          mobile: this.form.mobile,
          idCardType: this.form.idCardType
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
          this.$message.success(`${this.isEdit ? '修改' : '添加'}成功！`)
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
