<template>
  <div class="organization-tree">
    <el-form>
      <el-form-item label="组织架构管理">
        <el-input size="mini" style="width: 400px" clearable placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button
            size="mini"
            :disabled="canUpdate"
            @click.stop="handleAdd"
            icon="el-icon-plus"
            type="success"
          >新增</el-button>
          <el-button
            size="mini"
            :disabled="canUpdate"
            @click.stop="handleEdit(current)"
            icon="el-icon-edit"
            type="primary"
          >修改</el-button>
          <el-button
            size="mini"
            :disabled="canDelete"
            @click.stop="handleRemove(current)"
            icon="el-icon-delete"
            type="danger"
          >删除</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-tree
      :data="groupsTree"
      :default-expand-all="true"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @node-click="handleClickNode"
      highlight-current
      node-key="id"
      ref="tree"
      style="overflow-x:auto"
    >
      <span class="custom-tree-nodes" slot-scope="{ node,data }">
        <el-tag size="mini" v-if="data.grouplevel === 2">机构</el-tag>
        <el-tag size="mini" type="success" v-if="data.grouplevel === 3">HR</el-tag>
        <span class="label" style="margin-left: 15px">{{ node.label }}</span>
        <span v-if="data.gprovince" class="el-icon-location-outline" style="margin-left: 20px">
          <span>{{data.gprovince}}-</span>
          <span>{{data.gcity}}-</span>
          <span>{{data.garea}}</span>
        </span>
        <span v-if="data.mobile !== '' && data.mobile" class="el-icon-phone" style="margin-left: 20px">{{data.mobile}}</span>
      </span>
    </el-tree>
    <el-dialog :title="type === 'create' ? '新增组织' : '更新组织'" :visible.sync="dialogVisible">
      <OperUserOrganization
        :group="current"
        :type="type"
        @update="handleUpdate"
        v-if="dialogVisible"
      ></OperUserOrganization>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import totree from '../../utils/totree'
import OperUserOrganization from './components/OperUserOrganization.vue'

@Component({
  components: {
    OperUserOrganization
  }
})
export default class Organization extends Vue {
  private groups: any[] = []
  private groupsTree: any[] = []
  private filterText: string = ''
  private defaultProps: any = {
    children: 'children',
    label: 'groupname'
  }
  private current: any = {}
  private dialogVisible: boolean = false
  private type: string = 'create'
  private users: any[] = []

  private get canUpdate () {
    return !this.current.id
  }
  private get canDelete () {
    return (
      !this.current.id || this.current.pid === 0 || !!this.current.children
    )
  }
  @Watch('filterText')
  private filterTextChange (val: any) {
    const tree: any = this.$refs.tree
    tree.filter(val)
  }
  private created () {
    this.handleGetGroups()
  }
  private async handleGetGroups () {
    const data = await this.$store.dispatch('organization/getGroupList')
    this.groups = data.data.filter((item: any) => {
      return item.grouptype !== 2
    })
    this.groupsTree = totree(this.groups)
  }
  private handleUpdate () {
    this.dialogVisible = false
    this.handleGetGroups()
  }
  private handleAdd () {
    if (this.current.grouplevel === 3) {
      this.$message.error('当前选择组织机构不应存在子集！')
      return false
    }
    this.dialogVisible = true
    this.type = 'create'
  }
  private handleEdit () {
    this.dialogVisible = true
    this.type = 'update'
  }
  private filterNode (value: any, data: any) {
    if (!value) return true
    return data.groupname.indexOf(value) !== -1
  }
  private handleRemove (data: any) {
    this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const res = await this.$store.dispatch('organization/deleteUserOrganization', {
          id: data.id
        })
        if (res.success) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('操作失败')
        }
        this.handleGetGroups()
      })
      .catch(err => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  // 点击树节
  private handleClickNode (data: any) {
    this.current = data
    this.$emit('change', data)
  }
}
</script>
<style lang="scss" scoped>
.organization-tree {
  text-align: left;
  padding: 50px;
}
</style>

