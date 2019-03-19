<template>
  <div class="session-list">
    <div class="title clearfix">
      <title-item class="title-left" name="营销策略" fontSize="16px"></title-item>
      <!-- <div class="el-button-box"> -->
        <el-button icon="el-icon-upload" size="mini" @click="isUpload = true">批量上传</el-button>
        <el-button type="success" size="mini" @click="addQuestionLog">添加</el-button>
      <!-- </div> -->
    </div>
    <page-data :data="pageList" style="padding: 20px 10px">
      <template slot="table">
        <el-table
          :data="pageList.records"
          :loading="loading"
          :height="($store.state.app.viewHeight - 146)"
          border
          style="width: 100%">
          <el-table-column
          type="index"
          width="50"
          fixed="left"
          label="序号">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="200"
            fixed="left"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.tagList.length > 0" placement="bottom" trigger="hover">
                <ul style="margin-left: 15px;">
                  <li style="list-style-type: none" v-for="(item,index) in scope.row.tagList" :key="item.id">
                    {{index + 1}}. {{item.answer}}
                  </li>
                </ul>
                <el-tag slot="reference" v-if="scope.row.tagList.length > 0">1. {{scope.row.tagList[0].answer}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="feature"
            label="特点"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="question"
            label="问题"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="synonymList"
            label="相似问题"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.synonymList.length > 0" placement="bottom" trigger="hover">
                <ul style="margin-left: 15px;">
                  <li style="list-style-type: none" v-for="(item,index) in scope.row.synonymList" :key="item.id">
                    {{index + 1}}. {{item.content}}
                  </li>
                </ul>
                <el-tag slot="reference" v-if="scope.row.synonymList.length > 0">1. {{scope.row.synonymList[0].content}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="answer"
            label="答案"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="answer"
            label="营销策略">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.marketingStrategyList.length > 0" placement="bottom" trigger="hover">
                <ul style="margin-left: 15px;">
                  <li style="list-style-type: none; margin-bottom: 20px;" v-for="(item,index) in scope.row.marketingStrategyList" :key="item.id">
                    {{index + 1}}. <span class="el-icon-time" style="padding-right: 10px;">{{item.timeInterval}}</span>
                    <div style="width: 300px;"><span class="iconfont icon-action" style="margin-left: 17px; font-size: 13px;"></span>{{item.action}}</div>
                  </li>
                </ul>
                <el-tag slot="reference" v-if="scope.row.marketingStrategyList.length > 0">1. {{scope.row.marketingStrategyList[0].action}}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="principle"
            label="原则"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="instruction"
            label="营销员指令"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="done"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="editQuestion(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="moveQuestion(scope.row)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </page-data>
    <el-dialog
      title="策略设置"
      :visible.sync="showQuestion"
      width="900px">
      <addMarketing :edit="edit" @close="closeAddLog" v-if="showQuestion"></addMarketing>
    </el-dialog>
    <el-dialog title="批量上传" :visible.sync="isUpload" width="800px">
      <uploadMsgExcel v-if="isUpload" type="4" :templateLink="`https://bj-bdy-public.oss-cn-beijing.aliyuncs.com/online/upload/%E8%90%A5%E9%94%80%E7%AD%96%E7%95%A5%E8%AE%BE%E7%BD%AE.xls`" @close="closeAddLog"></uploadMsgExcel>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import addMarketing from './components/addMarketing.vue'
import uploadMsgExcel from './components/uploadMsgExcel.vue'

@Component({
  components: {
    addMarketing,
    uploadMsgExcel
  }
})
export default class SessionSet extends Vue {
  private tableData: any[] = []
  private loading: boolean = true
  private showQuestion: boolean = false
  private edit: boolean = false
  private pageTotal: number = 1
  private isUpload: boolean = false
  private pageOptions: any = {
    size: 30,
    current: 1
  }
  private pageList: any = {
    current: 1,
    size: 10,
    total: 0,
    records: []
  }
  public handleGetList: any
  // SessionSet
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private created () {
    this.getList()
  }
  private async getList (params?: any, form?: any) {
    this.loading = true
    if (this.params.cid) {
      const data = await this.$store.dispatch('wxtool/getSingleList', {
        ...this.params,
        type: 4,
        ...params,
        ...form
      })
      this.pageList = data
      this.loading = false
    } else {
      await this.$store.dispatch('user/getUserInfo')
      this.getList()
    }
  }
  private closeAddLog () {
    this.showQuestion = false
    this.isUpload = false
    this.getList()
  }
  private async moveQuestion (item: any) {
     this.$confirm('此操作将永久删除该策略, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      this.$store.commit('wxtool/SET_SINGLETAGID', item.id)
      const data = await this.$store.dispatch('wxtool/wechatDeleteSingle')
      if (data.errcode === 200) {
        this.$notify({
          title: '提示',
          message: `已删除`,
          type: 'success'
        })
        this.getList()
      } else {
        this.$notify({
          title: '提示',
          message: `因${data.data}删除失败`,
          type: 'error'
        })
      }
    })
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

