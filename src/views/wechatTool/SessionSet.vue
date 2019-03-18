<template>
  <div class="session-list">
    
    <div class="title clearfix">
      <title-item class="title-left" name="关键词列表" fontSize="16px"></title-item>
      <div class="el-button-box">
        <el-button icon="el-icon-upload" size="mini" @click="UploadExcel">批量上传</el-button>
        <el-button type="success" size="mini" @click="addQuestionLog">添加</el-button>
      </div>
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
            label="序号">
          </el-table-column>
          <el-table-column
            prop="question"
            label="问题"
            width="200"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="synonymList"
            label="相似问题"
            width="200"
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
            label="回复内容"
            width="300"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="timeSlot"
            label="时间范围"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.createDate | format('yyyy-MM-dd hh:mm') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateDate"
            label="更新时间"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.updateDate | format('yyyy-MM-dd hh:mm') }}</span>
            </template>
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
    <div class="table-box">
      
    </div>
    <el-dialog
      title="新建关键词回复"
      :visible.sync="showQuestion"
      width="800px">
      <addQuestion :edit="edit" @close="closeAddLog" v-if="showQuestion"></addQuestion>
    </el-dialog>
    <el-dialog title="批量上传" :visible.sync="isUpload" width="800px">
      <uploadMsgExcel v-if="isUpload" type="1" :templateLink="`https://bj-bdy-public.oss-cn-beijing.aliyuncs.com/online/upload/%E6%B6%88%E6%81%AF%E8%AE%BE%E7%BD%AE.xls`" @close="closeAddLog"></uploadMsgExcel>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import addQuestion from './components/addQuestion.vue'
import uploadMsgExcel from './components/uploadMsgExcel.vue'
import miniPage from '../../mixin/MixinPage'

@Component({
  components: {
    addQuestion,
    uploadMsgExcel
  },
  mixins: [miniPage]
})
export default class SessionSet extends Vue {
  private tableData: any[] = []
  private loading: boolean = true
  private showQuestion: boolean = false
  private edit: boolean = false
  private pageTotal: number = 1
  private isUpload: boolean = false
  private pageOptions: any = {
    size: 10,
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
  private async created () {
    await this.handleGetList()
  }
  private async getList (params?: any, form?: any) {
    this.loading = true
    if (this.params.cid) {
      const data = await this.$store.dispatch('wxtool/getSingleList', {
        ...this.params,
        type: 1,
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
  private UploadExcel () {
    this.isUpload = true
  }
  private closeAddLog () {
    this.showQuestion = false
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
          message: `${item.question}关键词，已删除`,
          type: 'success'
        })
        this.getList()
      } else {
        this.$notify({
          title: '提示',
          message: `${item.question}标签，因${data.data}删除失败`,
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

