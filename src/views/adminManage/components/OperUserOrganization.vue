<template>
  <el-form size="mini" :model="form" :rules="rules" :status-icon="true" label-width="100px" ref="form">
    <el-form-item label="组织属性" prop="grouptype">
      <el-radio-group v-model="form.grouptype">
        <el-radio-button :disabled="disabledOrganization" :label="0" v-if="!isTeam">机构</el-radio-button>
        <el-radio-button :disabled="disabledDepartment" :label="1" v-if="!isTeam">HR</el-radio-button>
        <el-radio-button :label="2" v-if="isTeam">团队</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="组织名称" prop="groupname">
      <el-input v-model="form.groupname"></el-input>
    </el-form-item>
    <el-form-item label="组织电话" prop="mobile">
      <el-input type="number" v-model="form.mobile"></el-input>
    </el-form-item>
    <el-form-item label="机构编码" prop="code">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="上级公司" prop="pid">
      <el-select disabled filterable v-model="form.pid">
        <el-option
          :key="group.id"
          :label="group.groupname"
          :value="group.id"
          v-for="group in groups"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="部门负责人">
      <el-select
        :loading="loading"
        :remote-method="handleGetUserList"
        clearable
        filterable
        placeholder="请输入关键词"
        remote
        reserve-keyword
        v-model="form.director"
      >
        <el-option :key="item.id" :label="item.cname" :value="item.id" v-for="item in users">
          <span style="float: left">{{ item.cname }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="组织地址" prop="gprovince">
      <el-row :gutter="15" justify="space-between" type="flex">
        <el-col :span="8">
          <el-select clearable filterable placeholder="省" v-model="currentProvince">
            <el-option
              :key="index"
              :label="item"
              :value="item"
              v-for="(item,index) in provinceList"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select clearable filterable placeholder="市" v-model="currentCity">
            <el-option :key="index" :label="item" :value="item" v-for="(item,index) in cityList"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select clearable filterable placeholder="区" v-model="currentArea">
            <el-option :key="index" :label="item" :value="item" v-for="(item,index) in areaList"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item prop="address">
      <el-input placeholder="详细地址" v-model="form.location"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="detail">
      <el-input type="textarea" v-model="form.detail"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handleCreate"
        icon="el-icon-download"
        type="primary"
        v-if="type === 'create'"
      >新增</el-button>
      <el-button @click="handleUpdate" icon="el-icon-download" type="primary" v-else>更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import cityData from '@/utils/city'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class OperUserOrganization extends Vue {
  @Prop({ default: false})
  private isTeam!: boolean
  @Prop({ required: true})
  private group!: object
  @Prop({})
  private type!: string

  private form: any = {
    gprovince: '',
    gcity: '',
    garea: '',
    pid: '',
    grouptype: 0,
    location: ''
  }
  private rules: any = {
    groupname: [
      { required: true, message: '请输入组织名', trigger: 'blur' }
    ],
    code: [{ required: true, message: '请输入机构编码', trigger: 'blur' }],
    gprovince: [
      { required: true, message: '请填写省市区', trigger: 'blur' }
    ],
    gcity: [{ required: true, message: '请填写省市区', trigger: 'blur' }],
    garea: [{ required: true, message: '请填写省市区', trigger: 'blur' }]
  }
  private cascaderDefaultProps: any = {
    children: 'children',
    label: 'groupname',
    value: 'id'
  }
  private loading: boolean =  false
  private users: any[] = []
  private currentProvince: string = ''
  private currentCity: string = ''
  private currentArea: string = ''
  private provinceList: any[] = []
  private parentGroup: any = {}
  private get groups () {
    return this.$store.state.organization.groups
  }
  private get disabledOrganization () {
    return this.parentGroup.grouptype === 1 || this.parentGroup.grouptype === 2
  }
  private get  disabledDepartment () {
    return this.parentGroup.grouptype === 2
  }
  private get provinceIndex () {
    const index = this.provinceList.indexOf(this.currentProvince)
    if (index <= 0) return 0
    return index
  }
  private get cityIndex () {
    const index = this.cityList.indexOf(this.currentCity)
    if (index <= 0) return 0
    return index
  }
  private get cityList (): any {
    return cityData.city[this.provinceIndex] || []
  }
  private get areaList (): any {
    return cityData.district[this.provinceIndex][this.cityIndex] || []
  }
  @Watch('form', {deep: true, immediate: true})
  private formChange (val: any) {
    if (val.director) {
      this.handleGetUserAccountInfo(val.director)
    }
  }
  private async created () {
    this.provinceList = cityData.province
    if (this.type === 'create') {
      this.parentGroup = JSON.parse(JSON.stringify(this.group))
      this.form.grouptype = this.parentGroup.grouptype || 0
      this.form.pid = this.parentGroup.id
    } else {
      const group = JSON.parse(JSON.stringify(this.group))
      this.form = group
      this.currentProvince = this.form.gprovince
      this.currentCity = this.form.gcity
      this.currentArea = this.form.garea
    }
    await this.$store.dispatch('organization/getGroupList')
  }
  private handleToForm () {
    this.form.gprovince = this.currentProvince
    this.form.gcity = this.currentCity
    this.form.garea = this.currentArea
  }
  // 新增组织
  private async handleCreate () {
    this.handleToForm()
    const data = await this.$store.dispatch('organization/createUserOrganization', this.form)
    if (data.success) {
      this.$message.success('新增成功')
    } else {
      this.$message.error(data.msg)
    }
    this.$emit('update')
  }
  // 更新组织
  private async handleUpdate () {
    this.handleToForm()
    const data = await this.$store.dispatch('organization/updateUserOrganization', {
      id: this.form.id,
      pid: this.form.pid,
      mobile: this.form.mobile,
      code: this.form.code,
      groupname: this.form.groupname,
      grouptype: this.form.grouptype,
      director: this.form.director,
      location: this.form.location,
      detail: this.form.detail,
      gprovince: this.form.gprovince,
      gcity: this.form.gcity,
      garea: this.form.garea
    })
    if (data.success) {
      this.$message.success('更新成功')
    } else {
      this.$message.error(data.msg)
    }
    this.$emit('update')
  }
  // 获取当前组织下的用户列表
  private async handleGetUserList (query: any) {
    if (query !== '') {
      this.loading = true
      const data = await this.$store.dispatch('user/getUserAccountList', { cname: query })
      if (data.success) {
        this.loading = false
        this.users = data.data
      } else {
        this.loading = false
        this.users = []
        this.$message.error(data.msg)
      }
    } else {
      this.users = []
    }
  }
  // 获取主管信息
  private async handleGetUserAccountInfo (uid: number) {
    const data = await this.$store.dispatch('user/getUserAccountInfo', uid)
    if (data.success) {
      this.users = [data.data]
    } else {
        this.form.pid = ''
        this.$message.error(data.msg)
    }
  }
}
</script>
