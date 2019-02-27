<template>
  <div class="session-list">
    <div class="title clearfix">
      <title-item class="title-left" name="关键词列表" fontSize="16px"></title-item>
      <!-- <div class="el-button-box"> -->
        <el-button type="success" size="mini" @click="addQuestionLog">添加</el-button>
      <!-- </div> -->
    </div>
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
          prop="question"
          label="问题">
        </el-table-column>
        <el-table-column
          prop="synonymList"
          label="相似问题">
          <template slot-scope="scope">
            <span v-for="item in scope.row.synonymList" :key="item.id">{{item.content}},</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="answer"
          label="回复内容">
        </el-table-column>
        <el-table-column
          prop="timeSlot"
          label="时间范围">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createDate | format('yyyy-mm-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="更新时间">
          <template slot-scope="scope">
            <span>{{scope.row.updateDate | format('yyyy-mm-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="done"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="editQuestion(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="moveQuestion(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageOptions.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageOptions.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
    <el-dialog
      title="新建关键词回复"
      :visible.sync="showQuestion"
      width="800px">
      <addQuestion :edit="edit" @close="closeAddLog" v-if="showQuestion"></addQuestion>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import addQuestion from './components/addQuestion.vue'

@Component({
  components: {
    addQuestion
  }
})
export default class SessionSet extends Vue {
  private tableData: any[] = []
  private loading: boolean = true
  private showQuestion: boolean = false
  private edit: boolean = false
  private pageTotal: number = 1
  private pageOptions: any = {
    size: 10,
    current: 1
  }
  // SessionSet
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
      const data = await this.$store.dispatch('wxtool/getSingleList', {
        ...this.params,
        type: 1,
        ...this.pageOptions
      })
      this.tableData = data.records
      this.pageTotal = data.total
      this.loading = false
    } else {
      await this.$store.dispatch('user/getUserInfo')
      this.getData()
    }
  }
  private handleSizeChange (val: number) {
    console.log(`每页 ${val} 条`)
    this.pageOptions.size = val
    this.getData()
  }
  private handleCurrentChange (val: number) {
    console.log(`当前页: ${val}`)
    this.pageOptions.current = val
    this.getData()
  }
  private closeAddLog () {
    this.showQuestion = false
    this.getData()
  }
  private async moveQuestion (item: any) {
    this.$store.commit('wxtool/SET_SINGLETAGID', item.id)
    const data = await this.$store.dispatch('wxtool/wechatDeleteSingle')
    if (data.errcode === 200) {
      this.$notify({
        title: '提示',
        message: `${item.question}关键词，已删除`,
        type: 'success'
      })
      this.getData()
    } else {
      this.$notify({
        title: '提示',
        message: `${item.question}标签，因${data.data}删除失败`,
        type: 'error'
      })
    }
  }
  private editQuestion (item: any) {
    this.$store.commit('wxtool/SET_SINGLETAGID', item.id)
    this.edit = true
    this.showQuestion = true
  }
  private addQuestionLog () {
    this.edit = false
    this.showQuestion = true
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

