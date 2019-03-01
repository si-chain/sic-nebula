<template>
  <div class="add-rules">
    <el-form :model="formInline" class="header-form clearfix" label-width="150px" >
      <el-form-item label="公司名称">
        <el-input size="mini" v-model="formInline.name" placeholder="公司名称"></el-input>
      </el-form-item>
      <el-form-item label="经营业务许可证号">
        <el-input size="mini" v-model="formInline.number" placeholder="经营业务许可证号"></el-input>
      </el-form-item>
      <el-form-item label="经营许可证有效期">
        <el-input size="mini" v-model="formInline.time" placeholder="经营许可证有效期"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input size="mini" v-model="formInline.user" placeholder="联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系人身份证号">
        <el-input size="mini" v-model="formInline.idcard" placeholder="联系人身份证号"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号">
        <el-input size="mini" v-model="formInline.phone" placeholder="联系人手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input size="mini" v-model="formInline.email" placeholder="邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-right" style="text-align: center">
      <el-button type="primary" size="mini" plain @click="cancel">确定</el-button>
    </div>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AddAgency extends Vue {
  private formInline: any = {
    name: '',
    number: '',
    time: '',
    time1: '',
    user: '',
    idcard: '',
    phone: '',
    email: ''
  }
  private cancel () {
    setTimeout(() => {
      this.$emit('cancel')
    }, 500)
  }
}
</script>
