<template>
  <page-data class="article-list" :data="pageList">
    <template slot="form">
      <el-form :model="form" label-width="100px" size="mini">
        <el-form-item label="文章类型">
          <el-radio-group @change="handleGetList()" v-model="form.postType">
            <el-radio-button label="1,2,3,6">全部</el-radio-button>
            <el-radio-button label="1">草稿</el-radio-button>
            <el-radio-button label="2">共享</el-radio-button>
            <el-radio-button label="3">经代专属</el-radio-button>
            <el-radio-button label="6">个人</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章状态">
          <el-radio-group @change="handleGetList()" v-model="form.approvalStatus">
            <el-radio-button :label="undefined">全部</el-radio-button>
            <el-radio-button label="3">待审核</el-radio-button>
            <el-radio-button label="1">审核通过</el-radio-button>
            <el-radio-button label="2">审核未通过</el-radio-button>
          </el-radio-group>
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
              ;(form = { range: [],postType:'1,2,3,6' }), handleGetList(1, 10)
            "
            icon="el-icon-refresh"
            type="reset"
          >重置</el-button>
          <el-button
            @click="$router.push({ path: `/article-manage/edit` })"
            icon="el-icon-plus"
            type="success"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <!-- <el-table :data="" stripe></el-table> -->
      <el-table :data="pageList.records" stripe >
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="文章名称" prop="title"></el-table-column>
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
        <el-table-column label="审核状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.approvalStatus | filterApprovalStatus }}
          </template>
        </el-table-column>
        <el-table-column label="审核信息" prop="approvalOpinion" width="180"></el-table-column>
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

  </page-data>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import miniPage from '../../mixin/MixinPage'

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
  }
})
export default class Articles extends Vue {
  private list: any[] = []
  private form: any = { postType: '1,2,3,6', range: [] }
  private pageList: any = {
    current: 1,
    size: 10,
    total: 0,
    records: []
  }
  // public getData = this.getList()
  public handleGetList: any
  private get userInfoId () {
    return {
      cid: this.$store.state.user.userInfo.cid
    }
  }
  /**
   * name
   */
  public async getList (params: any, form: any) {
    if (!form.range) {
      form.range = []
    }
    if (!this.userInfoId.cid) {
      await this.$store.dispatch('user/getUserInfo')
    }
    const data = await this.$store.dispatch('article/getArticles', {
      ...params,
      ...this.userInfoId,
      postType: form.postType,
      approvalStatus: form.approvalStatus,
      createDateBegin: form.range[0],
      createDateEnd: form.range[1]
    })
    this.pageList = data.data
  }
  private async created () {
    const data = await this.handleGetList()
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
