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
          label="关键词"
          width="200">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签">
          <!-- <template slot-scope="scope">
            <span v-for="item in scope.row.synonymList" :key="item.id">{{item.content}},</span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="answer"
          label="回复内容"
          width="500">
        </el-table-column>
        <!-- <el-table-column
          prop="timeSlot"
          label="回复时间">
        </el-table-column> -->
        <el-table-column
          prop="markets"
          label="营销策略"
          width="500">
        </el-table-column>
        <el-table-column
          prop="day1"
          label="第一天"
          width="150">
        </el-table-column>
        <el-table-column
          prop="day2"
          label="第二天"
          width="150">
        </el-table-column>
        <el-table-column
          prop="day3"
          label="第三天"
          width="150">
        </el-table-column>
        <!-- <el-table-column
          prop="done"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="editQuestion(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="moveQuestion(scope.row)"></el-button>
          </template>
        </el-table-column> -->
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
      this.tableData = [
        {
          "question": "**的***产品比你们的****",
          "answer": `**的***产品也是有一定的市场知名度的，其实保险产品没有绝对的好坏之分，
              更多的是适合还是不适合，每个人的实际情况不同，需求点自然有差异，不是单纯的对比产品责任就
              可以满足个人及家庭的需求的； 您还是很有研究滴~保险产品多少都有各自的设计特点和亮点，
              企业在选择产品的时候是需要充分了解员工需求、结合企业形象来综合选择的，
              这也是泛海集团在对比筛选经过多轮招标最终选择了我们的原因；`,
          "tag": '疑似同行',
          "timeSlot": "9:00",
          "markets": `**的***产品也是有一定的市场知名度的，其实保险产品没有绝对的好坏之分，
            更多的是适合还是不适合，每个人的实际情况不同，需求点自然有差异，不是单纯的对比产
            品责任就可以满足个人及家庭的需求的； 您还是很有研究滴~保险产品多少都有各自的
            设计特点和亮点，企业在选择产品的时候是需要充分了解员工需求、结合企业形象来综合选择的，
            这也是泛海集团在对比筛选经过多轮招标最终选择了我们的原因；`,
          "day1": '',
          "day2": '',
          "day3": '',
          "createDate": 1550040575000
        },
        {
          "question": `1.有（乳腺结节、甲状腺结节…）可以投保么 2.不告知会怎么样？`,
          "answer": `这个问题要看咱们的实际情况来确定，系统会在咱们提交了订单后自动生成核保所需材料，
              咱们按照提示提供材料由后台核保判断，不过有一点您可以放心，企业的议价能力远高于个人， 
              因此企业定制的产品核保条件通常是优于个人的 咱们投保的时候如实告知，系统会给咱们一个
              完整的回复，不管结果如何，咱们都踏实，也不用担心理赔问题 这个问题可能涉
              及员工个人隐私问题，建议您联系我们人工客服解答`,
          "tag": '准客户',
          "timeSlot": "9:00",
          "markets": `根据性别，设置时间发送关怀信息: 8：30   20:30`,
          "day1": `亲亲，早起喝一杯水吧，补充水分身体健康，开开心心的哟~ 这个同学请注意，
            晚上要早点睡觉觉，身体才可以棒棒哒~`,
          "day2": `昨晚有木有早睡？睡没睡还是记得喝杯水~ 亲爱的童鞋，请在22:00前完成睡眠的酝酿`,
          "day3": `早上不问候你我都不习惯了~ 有没有在等我的消息呢？~`,
          "createDate": 1550040575000
        },
        {
          "question": "打个折吧/便宜点儿吧/返佣么？",
          "answer": `在泛海集团的套餐里，不仅是优质的产品，还有对应的优质增值服务，已经是企业价格，
            没有空间了 所有的费用都是支撑我们的保障和服务的，便宜不鸟了~ 返佣违规，抵制返佣~`,
          "tag": '细节控',
          "timeSlot": "9:00",
          "markets": `**的***产品也是有一定的市场知名度的，其实保险产品没有绝对的好坏之分，
            更多的是适合还是不适合，每个人的实际情况不同，需求点自然有差异，不是单纯的对比产品责任
            就可以满足个人及家庭的需求的； 您还是很有研究滴~保险产品多少都有各自的设计特点和亮点，
            企业在选择产品的时候是需要充分了解员工需求、结合企业形象来综合选择的，这也是泛海集团
            在对比筛选经过多轮招标最终选择了我们的原因；`,
          "day1": '',
          "day2": '',
          "day3": '',
          "createDate": 1550040575000
        },
        {
          "question": "买过***公司的***产品，还需要买什么",
          "answer": `可怜的娃娃，自己买了保险都不知道是啥责任是不，你把保单的条款
            拍照发给我们给你看看吧~ 你愿意的话，带着保单给我们看看先，不着急买新的保险，
            先把咱有的弄明白了再说~`,
          "tag": '疑似同行',
          "timeSlot": "9:00",
          "markets": `1.展现专业技能 2.体现员工关怀`,
          "day1": `亲，别忘了给我拍保单哦~`,
          "day2": `如果没有拍，就继续提醒 亲，你是不是把我忘了`,
          "day3": `如果没有拍，就继续提醒 为什么你的事儿我比你记得还清楚`,
          "createDate": 1550040575000
        }
      ]
      this.pageTotal = 3
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

