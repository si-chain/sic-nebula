<template>
  <div class="session-list">
    <div class="title clearfix">
      <title-item class="title-left" name="KOL分析" fontSize="16px"></title-item>
      <!-- <el-button type="success" size="mini" @click="addQuestionLog">添加</el-button> -->
    </div>
    <el-form ref="form" style="text-align: left;" :inline="true" :model="formOptions" label-width="80px">
      <el-form-item label="消息类型">
        <el-select size="mini" v-model="formOptions.sortType" placeholder="请选择">
          <el-option label="阅读时长" value="1"></el-option>
          <el-option label="间隔时间" value="2"></el-option>
          <el-option label="转发次数" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input size="mini" v-model="formOptions.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="getData">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table
        :data="tableData"
        :loading="loading"
        :height="($store.state.app.viewHeight - 126)"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="articleTitle"
          label="文章标题">
        </el-table-column>
        <el-table-column
          prop="articleThumbnail"
          label="文章图标">
          <template slot-scope="scope">
            <img width="60" height="60" :src="scope.row.articleThumbnail" />
          </template>
        </el-table-column>
        <el-table-column
          prop="readerWxNickname"
          label="阅读者昵称">
        </el-table-column>
        <el-table-column
          prop="shareCount"
          label="分享次数">
        </el-table-column>
        <el-table-column
          prop="readerWxAvatar"
          label="阅读者头像">
          <template slot-scope="scope">
            <img width="60" height="60" :src="scope.row.readerWxAvatar" />
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="readCount"
          label="阅读次数">
        </el-table-column>
        <el-table-column
          prop="lastShareDate"
          label="最后分享时间">
          <template slot-scope="scope">
            <span>{{scope.row.lastShareDate | format('yyyy-MM-dd hh.mm')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageOptions.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageOptions.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SessionSet extends Vue {
  private tableData: any[] = []
  private loading: boolean = true
  private formOptions: any = {
    sortType: '3',
    keyWord: ''
  }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private created () {
    this.getData()
  }
  private async getData () {
    if (this.params.cid) {
      const data = await this.$store.dispatch('wxtool/getKOLTable', {
        ...this.params,
        ...this.formOptions
      })
      this.tableData = data
      this.loading = false
    } else {
      await this.$store.dispatch('user/getUserInfo')
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
.session-list {
  font-size: 14px;
  .title {
    display: flex;
    padding: 20px 0;
    text-align: right;
    justify-content: space-between;
    .title-left {
      flex: 1;
    }
    .el-button {
      // width: 200px;
      margin-right: 20px;
    }
  }
}
</style>

