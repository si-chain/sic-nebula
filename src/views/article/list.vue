<template>
  <page-data class="article-list" :data="pageList">
    <template slot="form">
      <el-form :model="form" label-width="100px" size="mini">
        <el-form-item label="活动类别">
          <el-row :gutter="15" justify="start" type="flex">
            <el-col :span="4">
              <el-select style="width: 100%" clearable filterable placeholder="活动大类" v-model="articleType1">
                <el-option
                  :key="index"
                  :label="item.codeName"
                  :value="item.id"
                  v-for="(item,index) in articleType1List"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select style="width: 100%" clearable filterable placeholder="活动小类" v-model="articleType2">
                <el-option :key="index" :label="item.codeName" :value="item.id" v-for="(item,index) in articleType2List"></el-option>
              </el-select>
            </el-col>
            <el-col :span="16"></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            :default-time="['00:00:00', '23:59:59']"
            @change="handleGetList()"
            clearable
            end-placeholder="结束日期"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            v-model="form.range"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="操作按钮">
          <el-button
            :loading="isLoading"
            @click="handleGetList()"
            icon="el-icon-search"
            type="primary"
          >查询</el-button>
          <el-button
            @click="
              ;(form = { range: [] }), handleGetList(1, 15)
            "
            icon="el-icon-refresh"
            type="reset"
          >重置</el-button>
          <el-button
            @click="$router.push({ path: `/article-manage/edit` })"
            icon="el-icon-plus"
            type="success"
          >新增</el-button>
          <el-button @click="articleTypeManage = true" type="warning">类型管理</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <el-table :data="pageList.records" stripe :height="($store.state.app.viewHeight - 220)">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="活动名称" prop="title"></el-table-column>
        <el-table-column label="发布时间" prop="created" width="150">
          <template slot-scope="scope">
            {{ scope.row.created | format('yyyy-MM-dd hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="作者" prop="authorName" width="80"></el-table-column>
        <el-table-column label="浏览量" prop="views" width="80"></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            {{ scope.row.status | filterStatus }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="审核状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.approvalStatus | filterApprovalStatus }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="审核信息" prop="approvalOpinion" width="180"></el-table-column> -->
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                :disabled="scope.row.status === 2"
                @click="
                  $router.push({ path: `/article-manage/edit/${scope.row.id}` })
                " size="mini"
                icon="el-icon-edit"
                type="primary"
              >编辑</el-button>
              <el-button
                :disabled="scope.row.status === 2"
                @click="handleDelete(scope.row.id)"
                icon="el-icon-delete" size="mini"
                type="warning"
              >删除</el-button>
              <el-button
                :disabled="scope.row.status === 2"
                @click="
                  $router.push({
                    path: `/article-manage/edit/${scope.row.id}`
                  })
                " size="mini"
                icon="el-icon-view"
                type="primary"
              >详情</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="类型管理" :visible.sync="articleTypeManage">
      <articleType ></articleType>
    </el-dialog>
  </page-data>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import miniPage from '../../mixin/MixinPage'
import articleType from './articleType.vue'

@Component({
  mixins: [miniPage],
  filters: {
    filterPostType (type: number) {
      switch (type) {
        case 1:
          return '草稿'
        case 2:
          return '共享'
        case 3:
          return '经代专属'
        case 6:
          return '个人'
      }
    },
    filterApprovalStatus (status: number) {
      switch (status) {
        case 1:
          return '审核通过'
        case 2:
          return '审核未通过'
        case 3:
          return '待审核'
      }
    },
    filterStatus (status: number) {
      switch (status) {
        case 1:
          return '已上传'
        case 2:
          return '上传中'
      }
    }
  },
  components: {
    articleType
  }
})
export default class Articles extends Vue {
  private list: any[] = []
  private form: any = { range: [] }
  private pageList: any = {
    current: 1,
    size: 10,
    total: 0,
    records: []
  }
  private articleTypeManage: boolean = false
  private articleType1: string = ''
  private articleType2: string = ''
  private articleType1List: any[] = []
  private articleType2List: any[] = []
  // public getData = this.getList()
  public handleGetList: any
  private get userInfoId () {
    return {
      cid: this.$store.state.user.userInfo.cid
    }
  }
  @Watch('articleType1')
  private articleType1Change (val: string) {
    console.log(val)
    this.articleType1List.map((item: any) => {
      if (item.id === val) {
        this.articleType2List = item.children
      }
    })
  }
  /**
   * name
   */
  public async getList (params?: any, form?: any) {
    if (!form.range) {
      form.range = []
    }
    if (!this.userInfoId.cid) {
      await this.$store.dispatch('user/getUserInfo')
    }
    const data = await this.$store.dispatch('article/getArticles', {
      ...params,
      ...this.userInfoId,
      articleType1: this.articleType1,
      articleType2: this.articleType2,
      approvalStatus: form.approvalStatus,
      createDateBegin: form.range[0],
      createDateEnd: form.range[1]
    })
    this.pageList = data.data
  }
  private async created () {
    const data = this.handleGetList()
    const typeData1 = await this.$store.dispatch('article/getArticleTypes', {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid,
      codeType: 'articleType1',
      level: 1,
      parentId: '',
      size: 50
    })
    this.articleType1List = typeData1.data.records
  }
  private handleDelete (id: number) {
    this.$confirm('此操作将永久删除该策略, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await this.$store.dispatch('article/delArticle', {
        ids: [id]
      })
      if (data.errcode === 200) {
        this.$message.success('删除成功')
        this.handleGetList()
      } else {
        this.$message.error(data.data)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  // display: flex;
  text-align: left;
  // .el-form-item {
  //   // float: left;
  // }
}
</style>
