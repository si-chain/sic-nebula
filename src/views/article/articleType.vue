<template>
  <div class="article-type">
      <el-tree
        :data="typeData"
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-tag v-if="node.level !== 3" type="success" size="mini" @click="() => append(data)">
              添加子节点
            </el-tag>
            <el-tag style="margin-left: 10px;" type="danger" size="mini" @click="() => remove(node, data)">
              删除当前节点
            </el-tag>
          </span>
        </span>
      </el-tree>
      <el-dialog title="添加类型" :visible.sync="dialogFormVisible" width="600px" append-to-body>
        <el-form :model="addOptions" size="mini">
          <el-form-item label="活动名称" label-width="120px">
            <el-input v-model="addOptions.codeName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="Code" label-width="120px">
            <el-input v-model="addOptions.code"></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ArticleType extends Vue {
  private dialogFormVisible: boolean = false
  private typeData: any[] = [
    {
      id: 0,
      codeName: '活动',
      level: 0,
      children: []
    }
  ]
  private addOptions: any = {
    codeType: '',
    code: '',
    level: '',
    codeName: '',
    parentId: ''
  }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private defaultProps: any = {
    children: 'children',
    label: 'codeName'
  }
  private async created () {
    this.getData()
  }
  private async getData () {
    const data = await this.$store.dispatch('article/getArticleTypes', {
      ...this.params,
      codeType: 'articleType1',
      level: 1,
      parentId: ''
    })
    if (data.errcode === 200) this.typeData[0].children = this.getTreeData(data.data.records)
  }
  private getTreeData (data: any[]) {
    if (data.length === 0) return []
    data.map((child: any) => {
      child.label = child.codeName
      if (child.children.length > 0) {
        this.getTreeData(child.children)
      }
    })
    return JSON.parse(JSON.stringify(data))
  }
  private async append (node: any) {
    this.addOptions.codeName = ''
    switch (node.level) {
      case 0:
        this.addOptions.codeType = 'articleType1'
        this.addOptions.level = 1
        this.addOptions.parentId = ''
        break
      case 1:
        this.addOptions.codeType = 'articleType2'
        this.addOptions.level = 2
        this.addOptions.parentId = node.id
        break
      default:
        break
    }
    this.dialogFormVisible = true
  }
  private async remove (node: any) {
    const data = await this.$store.dispatch('article/delArticleType', [node.key])
    if (data.errcode === 200) this.$message.success('删除成功')
    else this.$message.error(data.data)
    this.getData()
  }
  private async submit () {
    const data = await this.$store.dispatch('article/addArticleType', {
      ...this.params,
      ...this.addOptions
    })
    if (data.errcode === 200) this.$message.success('添加成功')
    else this.$message.error(data.data)
    this.dialogFormVisible = false
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.article-type {
  width: 500px;
  margin: 0 auto;
  .el-tree {
    height: 400px;
    overflow-y: auto;
  }
}
</style>
