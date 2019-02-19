<template>
  <div class="custom-handle">
    <div class="table-box">
      <div class="title">{{title}}</div>
      <div class="table-query">
        <div class="msg">
          当前客户为"{{title}}"级别
        </div>
        <div class="btn-box">
          <el-button size="mini" type="success">导入用户</el-button>
          <el-input size="mini" v-model="productionName" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 98%">
        <el-table-column
          prop="name"
          width="120"
          label="姓名">
          <template slot-scope="scope">
            <a target="_black" class="link" :href="`https://s.17doubao.com/analysis/timeline/${scope.row.id}`">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          width="80"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="age"
          width="80"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="eName"
          label="所属企业">
          <template slot-scope="scope">
            <a target="_black" class="link" :href="`https://s.17doubao.com/enterprise/infor?ename=${scope.row.eName}`">{{ scope.row.eName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="status"
          label="判定状态">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="event-box">
      <div class="info tool-box">
        <div class="title">用户信息</div>
        <div class="user-detail">
          <p>客户：{{currentRow.name}}</p>
          <p>姓别：{{currentRow.sex}}</p>
          <p>年龄：{{currentRow.age}}岁</p>
          <p>住址：{{currentRow.address}}</p>
          <p>手机：{{currentRow.phone}}</p>
          <p>既往事件：</p>
          <div class="user-event-box">
            <!-- <vueSeamlessScroll class="srcoll-box hover-box" :data="eventLogs" :class-option="scrollOption">
              
            </vueSeamlessScroll> -->
            <ul class="rowup">
              <li :key="index" v-for="(item,index) in eventLogs">
                <div class="msg-box" v-if="item.bizroot === '豆包管家'">
                  <span class="name">{{currentRow.name}}</span> <span>{{ item.timestr }}</span>
                  <p>{{item.m}}</p>
                </div>
                <div class="msg-box" v-else>
                  <span class="name">{{item.bizname}}</span> <span>{{ item.timestr }}</span>
                  <p>{{item.m}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>    
      </div>
      <div class="event-center tool-box">
        <div class="call-center">
          <div class="title">呼叫中心</div>
          <div class="btn-box">
            <a target="_black" class="el-button el-button--primary el-button--mini is-round" :href="`http://kfnew.17doubao.com/kf/api/customerLogin?username=boyu.zhang@baodanyun-inc.com&to=${currentRow.id}`">
              开始外呼
            </a>
            <!-- <el-button size="mini" type="primary" round>历史对话</el-button> -->
          </div>
        </div>
        <div class="doubt-center">
          <div class="title">疑议处理</div>
          <div class="doubt box">
            <p>当前用户未拒绝销售</p>
            <el-input
              size="mini"
              type="textarea"
              :rows="12"
              placeholder="请输入内容"
              v-model="usertextarea">
            </el-input>
            <div style="text-align: right">
              <el-button size="mini" type="primary" round>确定处理</el-button>

            </div>
          </div>
        </div>
      </div>
      <div class="production tool-box">
        <div class="pro-list">
          <div class="title">产品列表</div>
          <div class="query">
            <el-input size="mini" v-model="productionName" placeholder="请输入内容"></el-input>
            <el-button size="mini" type="success">查询</el-button>
          </div>
          <div class="list">
            <div class="production" v-for="(item, index) in productionList" :key="index" @click="showPro(item)">{{item.production}}</div>
          </div>
        </div>
        <div class="policy-query">
          <div class="title">保单查询</div>
          <div class="query">
            <el-input size="mini" v-model="policyNumber" placeholder="请输入内容"></el-input>
            <el-button size="mini" type="success">查询</el-button>
          </div>
          <!-- <div class="todo">
            <el-input size="mini" v-model="policyNumber" placeholder="请输入内容"></el-input>
            <el-button size="mini" type="success">成功按钮</el-button>
          </div> -->
        </div>
      </div>
      <div class="handle tool-box">
        <div class="handle-list">
          <div class="title">客户处理</div>
          <div class="btn-box">
            <el-button v-if="currentRow.status === '潜在客户'" size="mini" type="primary" round>升级为目标客户</el-button>
            <el-button v-if="currentRow.status === '目标客户'" size="mini" type="primary" round>升级为准客户</el-button>
            <el-button v-if="currentRow.status === '准客户' || currentRow.status === '成交客户'" :disabled="currentRow.status === '成交客户'" size="mini" type="primary" round>升级为客户</el-button>
          </div>
        </div>
        <!-- <div class="log">
          <div class="title">处理日志</div>
          <div class="log-list">
            <p>张某升级为准客户</p>
            <p>李某升级为客户</p>
            <p>王某升级为客户</p>
            <div class="log-tip">
              当前任务：潜客耗时64小时
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <el-dialog
      :title="proTitle"
      :visible.sync="proDialog"
      width="50%">
      <span>{{link}}</span><br>
      <el-button size="mini" type="success"
      v-clipboard:copy="link"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">复制链接</el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import vueSeamlessScroll from 'vue-seamless-scroll'

@Component({
  components: {
    vueSeamlessScroll
  }
})
export default class customHandle extends Vue{
  private proDialog: boolean = false
  private proTitle: string = ''
  private title: string = '潜在客户'
  private link: string = ''
  // @Watch('$route')
  // private routerChange (val: any) {
  //   console.log(val)
  // } 
  private currentRow: any = {
    name: '欧阳阿丹',
    id: '118686',
    sex: '女',
    age: '27',
    phone: '18609231233',
    status: '潜在客户',
    address: '河南省平顶山市',
    eName: '好贷天下信息技术(北京)有限公司'
  }
  private userList: any = [
    {
      taskname: '潜在客户',
      tabledate : [
        {
          name: '欧阳阿丹',
          id: '118686',
          sex: '女',
          age: '27',
          status: '潜在客户',
          address: '河南省平顶山市',
          phone: '13755641139',
          eName: '好贷天下信息技术(北京)有限公司'
        },
        {
          name: '乔良',
          sex: '男',
          id: '19579',
          age: '29',
          status: '目标客户',
          phone: '13367573123',
          address: '山西省朔州市怀仁县',
          eName: '北京普惠职道科技发展有限责任公司'
        },
        {
          name: '柳恒茂',
          sex: '男',
          age: '36',
          eName: '北京正安维视科技股份有限公司',
          id: '506070',
          status: '成交客户',
          phone: '13388933121',
          address:  '河北省保定市涞水县'
        },
        {
          name: '刘桐伟',
          sex: '男',
          age: '28',
          eName: '贵州白山云科技有限公司',
          id: '125147',
          status: '准客户',
          phone: '13788933113',
          address:  '山东省临沂市沂南县'
        }
      ]
    },
    {
      taskname: '目标客户',
      tabledate : [
        {
          name: '宋涛',
          sex: '男',
          age: '31',
          eName: '北京荣之联科技股份有限公司',
          id: '52260',
          status: '成交客户',
          phone: '13234621231',
          address: '河北省保定市高碑店市'
        },
        {
          name: '张鹭鸶',
          sex: '女',
          age: '33',
          eName: '北京永信达实业开发公司',
          id: '511212',
          status: '意向客户',
          phone: '13811238731',
          address: '北京市市辖区朝阳区'
        },
        {
          name: '张晓敏',
          sex: '女',
          age: '29',
          eName: '北京迪思公关顾问有限公司',
          id: '35627',
          status: '准客户',
          phone: '13677381165',
          address: '河北省邯郸市邯郸县'
        },
        {
          name: '张家敏',
          sex: '男',
          age: '27',
          eName: '北京四达人效人力资源服务有限公司',
          id: '151538',
          status: '潜在客户',
          phone: '13088723367',
          address: '福建省三明市沙县',
        },
        {
          name: '邸俊麟',
          sex: '男',
          age: '56',
          eName: '北京金隅物业管理有限责任公司金隅环贸分公司',
          id: '45174',
          status: '成交客户',
          phone: '1335673123',
          address: '北京市市辖区朝阳区',
        }
      ]
    },
    {
      taskname: '准客户',
      tabledate : [
        {
          name: '谷音',
          sex: '男',
          age: '36',
          eName: '北京智云星辉科技有限公司',
          id: '518127',
          status: '准客户',
          phone: '13788311456',
          address: '陕西省宝鸡市渭滨区',
        },
        {
          name: '郑瑞',
          sex: '男',
          age: '39',
          eName: '北京博奇电力科技有限公司',
          id: '480842',
          status: '成交客户',
          phone: '15655341188',
          address: '湖北省十堰市丹江口市',
        },
        {
          name: '高情',
          sex: '女',
          age: '36',
          eName: '北京新中关摩尔商业管理有限公司',
          id: '158020',
          status: '准客户',
          phone: '13088912331',
          address: '北京市县',
        },
        {
          name: '覃健',
          sex: '男',
          age: '31',
          eName: '悉地（ 北京） 国际建筑设计顾问有限公司',
          id: '171488',
          status: '成交客户',
          phone: '1335673123',
          address: '广西壮族自治区南宁市',
        },
        {
          name: '范金龙',
          sex: '男',
          age: '37',
          eName: '北京金隅地产经营管理有限公司',
          id: '88466',
          status: '成交客户',
          phone: '18765552331',
          address: '黑龙江省齐齐哈尔市富拉尔基区',
        }
      ]
    },
    {
      taskname: '客户',
      tabledate : [
        {
          name: '刁鹏飞',
          sex: '男',
          age: '34',
          eName: '北京中科江南信息技术股份有限公司',
          id: '507653',
          status: '忠诚客户',
          phone: '13567561123',
          address:  '黑龙江省牡丹江市西安区',
        },
        {
          name: '赵群',
          sex: '男',
          age: '32',
          eName: '北京迪思公关顾问有限公司',
          id: '80334',
          status: '成交客户',
          phone: '13187563345',
          address:  '辽宁省抚顺市抚顺县',
        },
        {
          name: '程翔',
          sex: '男',
          age: '63',
          eName: '北京天毓山庄旅游开发有限公司',
          id: '56704',
          status: '成交客户',
          phone: '18677564451',
          address:  '北京市市辖区西城区',
        },
        {
          name: '王青苗',
          sex: '女',
          age: '25',
          eName: '北京中科江南信息技术股份有限公司',
          id: '513450',
          status: '准客户',
          phone: '13234328867',
          address:  '山东省淄博市沂源县',
        },
        {
          name: '黄津',
          sex: '男',
          age: '27',
          eName: '北京顺拓慷诚企业管理咨询有限公司',
          id: '521683',
          status: '成交客户',
          phone: '1335673123',
          address:  '辽宁省阜新市海州区',
        }
      ]
    }
  ]
  private scrollOption: object = {
    step: 0.2, // 步长 越大滚动速度越快
    limitMoveNum: 10, // 启动无缝滚动最小数据量 this.dataList.length
    hoverStop: true, // 是否启用鼠标hover控制
    direction: 1, // 1 往上 0 往下
    openWatch: true, // 开启data实时监听
    singleHeight: 0, // 单条数据高度有值hoverStop关闭
    waitTime: 1000 // 单步停止等待时间
  }
  private usertextarea: string = ''
  private policyNumber: string = ''
  private productionName: string = ''
  private eventLogs: any[] = [
    {
      "bizcode": "020806",
      "bizname": "微信回复",
      "bizroot": "豆包管家",
      "evttime": "20190200",
      "ispush": false,
      "m": "",
      "oid": "",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480201390,
      "time": null,
      "timestr": "16:56",
      "uid": 159259
    },
    {
      "bizcode": "010801",
      "bizname": "微信主动咨询消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "好",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480200595,
      "time": null,
      "timestr": "16:56",
      "uid": 159259
    },
    {
      "bizcode": "0110",
      "bizname": "坐席客服回复用户消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "如果之前有被确诊过 是大动脉炎的 就不可以，不能带病投保",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480182877,
      "time": null,
      "timestr": "16:56",
      "uid": 159259
    },
    {
      "bizcode": "0110",
      "bizname": "坐席客服回复用户消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "投保规则有一条是既往症不在可保范围内，它的具体解释:除了之前被确诊的疾病外，还包括体检报告中被告知的“建议进一步检查”项和凭借客户的经验，觉得身体不舒服可能会是某种疾病或症状的现象，统称为既往症。",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480153023,
      "time": null,
      "timestr": "16:55",
      "uid": 159259
    },
    {
      "bizcode": "020806",
      "bizname": "微信回复",
      "bizroot": "豆包管家",
      "evttime": "20190200",
      "ispush": false,
      "m": "",
      "oid": "",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480152270,
      "time": null,
      "timestr": "16:55",
      "uid": 159259
    },
    {
      "bizcode": "010801",
      "bizname": "微信主动咨询消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "近半年没有打算",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480151474,
      "time": null,
      "timestr": "16:55",
      "uid": 159259
    },
    {
      "bizcode": "020806",
      "bizname": "微信回复",
      "bizroot": "豆包管家",
      "evttime": "20190200",
      "ispush": false,
      "m": "",
      "oid": "",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480110569,
      "time": null,
      "timestr": "16:55",
      "uid": 159259
    },
    {
      "bizcode": "010801",
      "bizname": "微信主动咨询消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "没有",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480109776,
      "time": null,
      "timestr": "16:55",
      "uid": 159259
    },
    {
      "bizcode": "0110",
      "bizname": "坐席客服回复用户消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "有打算要手术吗",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550480044703,
      "time": null,
      "timestr": "16:54",
      "uid": 159259
    },
    {
      "bizcode": "020806",
      "bizname": "微信回复",
      "bizroot": "豆包管家",
      "evttime": "20190200",
      "ispush": false,
      "m": "",
      "oid": "",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479956905,
      "time": null,
      "timestr": "16:52",
      "uid": 159259
    },
    {
      "bizcode": "010801",
      "bizname": "微信主动咨询消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "近半年没有",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479956109,
      "time": null,
      "timestr": "16:52",
      "uid": 159259
    },
    {
      "bizcode": "0110",
      "bizname": "坐席客服回复用户消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "请问您近期有没有 做手术 住院 就诊",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479903010,
      "time": null,
      "timestr": "16:51",
      "uid": 159259
    },
    {
      "bizcode": "020806",
      "bizname": "微信回复",
      "bizroot": "豆包管家",
      "evttime": "20190200",
      "ispush": false,
      "m": "",
      "oid": "",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479834529,
      "time": null,
      "timestr": "16:50",
      "uid": 159259
    },
    {
      "bizcode": "010801",
      "bizname": "微信主动咨询消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "大动脉炎可以报销吗",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479833760,
      "time": null,
      "timestr": "16:50",
      "uid": 159259
    },
    {
      "bizcode": "020806",
      "bizname": "微信回复",
      "bizroot": "豆包管家",
      "evttime": "20190200",
      "ispush": false,
      "m": "",
      "oid": "",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479812022,
      "time": null,
      "timestr": "16:50",
      "uid": 159259
    },
    {
      "bizcode": "010801",
      "bizname": "微信主动咨询消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "不能报销的范围，能具体说明白点吧",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479811226,
      "time": null,
      "timestr": "16:50",
      "uid": 159259
    },
    {
      "bizcode": "0110",
      "bizname": "坐席客服回复用户消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "当然 根据保费不同 保障范围也是不同的",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479774182,
      "time": null,
      "timestr": "16:49",
      "uid": 159259
    },
    {
      "bizcode": "0110",
      "bizname": "坐席客服回复用户消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "这是 报销医保结算外的自付一的金额",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479748983,
      "time": null,
      "timestr": "16:49",
      "uid": 159259
    },
    {
      "bizcode": "0110",
      "bizname": "坐席客服回复用户消息",
      "bizroot": "豆包客服",
      "evttime": "20190200",
      "ispush": false,
      "m": "被保险人首先 不能有任何病史，不如 高血压 糖尿病 咽炎等",
      "oid": "husujun@126xmpp",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479727024,
      "time": null,
      "timestr": "16:48",
      "uid": 159259
    },
    {
      "bizcode": "020806",
      "bizname": "微信回复",
      "bizroot": "豆包管家",
      "evttime": "20190200",
      "ispush": false,
      "m": "",
      "oid": "",
      "openid": "oAH_qsjBThLqHPI7jHNfMn9lA0DY",
      "sid": "",
      "t": 1550479724322,
      "time": null,
      "timestr": "16:48",
      "uid": 159259
    }
  ]
  private tableData: any = [
    {
      name: '欧阳阿丹',
      id: '118686',
      sex: '女',
      age: '27',
      phone: '18609231233',
      status: '潜在客户',
      address: '河南省平顶山市',
      eName: '好贷天下信息技术(北京)有限公司'
    },
    {
      name: '乔良',
      sex: '男',
      id: '19579',
      age: '29',
      phone: '13245672231',
      status: '目标客户',
      address: '山西省朔州市怀仁县',
      eName: '北京普惠职道科技发展有限责任公司'
    },
    {
      name: '柳恒茂',
      sex: '男',
      age: '36',
      phone: '18553455221',
      eName: '北京正安维视科技股份有限公司',
      id: '506070',
      status: '成交客户',
      address:  '河北省保定市涞水县'
    },
    {
      name: '刘桐伟',
      sex: '男',
      age: '28',
      phone: '15967542312',
      eName: '贵州白山云科技有限公司',
      id: '125147',
      status: '准客户',
      address:  '山东省临沂市沂南县'
    }
  ]
  private productionList: any[] = [
    {
      "NO.": "1",
      "production": "“万贯家财”家庭财产保险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1437-1649.html?from=spks",
      "适用人群": "仅限房屋所有人投保",
      "保险期限": "一年",
      "特色": "低至10元享百万保障",
      "活动特惠": "现价只需10元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "2",
      "production": "豆包-安心个人综合意外险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1437-1649.html?from=spks",
      "适用人群": "18-65周岁",
      "保险期限": "一年",
      "特色": "综合意外保障",
      "活动特惠": "现价只需500元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "3",
      "production": "苏黎世中国“百万人生”人身意外伤害保险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1672-1976.html?from=spks",
      "适用人群": "18-65周岁",
      "保险期限": "一年",
      "特色": "交通意外累计赔付",
      "活动特惠": "现价只需750元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "4",
      "production": "“安心无忧”意外保障计划",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2097-2606.html",
      "适用人群": "18-65周岁",
      "保险期限": "一年",
      "特色": "意外医疗0元免赔",
      "活动特惠": "现价只需60元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "5",
      "production": "“欣享百万”意外保障计划",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2189-2750.html?cuid=&from=spks",
      "适用人群": "18-60周岁",
      "保险期限": "一年",
      "特色": "意外风险保障全面",
      "活动特惠": "现价只需498元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "6",
      "production": "住院无忧保障计划",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-100639-101314.html?from=spks",
      "适用人群": "18-47周岁",
      "保险期限": "一年",
      "特色": "高额意外身故伤残保障",
      "活动特惠": "现价只需209元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "7",
      "production": "住院无忧保障计划（续保版）",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-100642-101323.html?from=spks",
      "适用人群": "18-47周岁",
      "保险期限": "一年",
      "特色": "特含疾病住院费用补偿",
      "活动特惠": "现价只需280元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "8",
      "production": "易安个人账户资金安全保险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1783-2137.html?from=spks",
      "适用人群": "18-75周岁",
      "保险期限": "一年",
      "特色": "低保费、高保障",
      "活动特惠": "现价只需1元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "9",
      "production": "账户保个人账户资金安全险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1780-2133.html?from=spks",
      "适用人群": "18-60周岁",
      "保险期限": "一年",
      "特色": "涵盖账户类型全面",
      "活动特惠": "现价只需6元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "10",
      "production": "慧馨安少儿两全保险",
      "link": "https://cps.qixin18.com/wsz1006308/product/detail-100667-101391.html",
      "适用人群": "出生满30天-17周岁",
      "保险期限": "20年~30年",
      "特色": "50种重疾+8种特定疾病",
      "活动特惠": "现价只需920元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "11",
      "production": "延年防癌疾病保险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2106-2620.html?from=spks",
      "适用人群": "40-65周岁",
      "保险期限": "一年",
      "特色": "轻症癌症赔付后仍可续保",
      "活动特惠": "现价只需60.5元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "12",
      "production": "慧馨安少儿定期重大疾病保险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2178-2735.html?from=spks",
      "适用人群": "出生满28天-17周岁",
      "保险期限": "20年~30年",
      "特色": "重疾保障最高可达160万",
      "活动特惠": "现价只需103元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "13",
      "production": "（至尊保）重大疾病保险 ",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-10055-100834.html?from=spks",
      "适用人群": "出生满28天-50周岁",
      "保险期限": "终身",
      "特色": "81种重疾+50种轻症",
      "活动特惠": "现价只需406.5元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "14",
      "production": "康爱卫士老人专属恶性肿瘤保险  ",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2194-2759.html?from=spks",
      "适用人群": "46-75周岁",
      "保险期限": "10年~20年",
      "特色": "高费用恶性肿瘤双倍赔付",
      "活动特惠": "现价只需435元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "15",
      "production": "安心保少儿疾病住院医疗保障",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1626-1905.html?from=spks",
      "适用人群": "出生满30天-18周岁",
      "保险期限": "一年",
      "特色": "含住院医疗和门诊",
      "活动特惠": "现价只需264元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "16",
      "production": "“学习无忧”疾病医疗学平险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1624-1899.html?from=spks",
      "适用人群": "18-27周岁",
      "保险期限": "一年",
      "特色": "门诊住院全保",
      "活动特惠": "现价只需72元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "17",
      "production": "少儿白血病专项保障保险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2110-2626.html?from=spks",
      "适用人群": "出生满29天-18周岁",
      "保险期限": "一年",
      "特色": "50万保额仅需2毛/天",
      "活动特惠": "现价只需16元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "18",
      "production": "儿童走失险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2118-2645.html?from=spks",
      "适用人群": "出生满30天-18周岁",
      "保险期限": "一年",
      "特色": "儿童走失有保障",
      "活动特惠": "现价只需30元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "19",
      "production": "手足口疾病险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1941-2387.html?from=spks",
      "适用人群": "出生满30天-18周岁",
      "保险期限": "一年",
      "特色": "30天超短等待期",
      "活动特惠": "现价只需30元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "20",
      "production": "吃货无忧险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-1843-2216.html?from=spks",
      "适用人群": "6-17周岁",
      "保险期限": "一年",
      "特色": "急性肠胃炎保障",
      "活动特惠": "现价只需15元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "21",
      "production": "珍爱未来B款少儿教育年金保险产品计划",
      "link": "https://cps.qixin18.com/wsz1006308/product/detail-100625-101270.html",
      "适用人群": "出生满60天-9周岁",
      "保险期限": "一年",
      "特色": " 返还比例高达120%",
      "活动特惠": "现价只需742元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "22",
      "production": "横琴优爱宝定期寿险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-2148-100844.html?from=spks",
      "适用人群": "18-60周岁",
      "保险期限": "一年",
      "特色": " 保额最高可达150万",
      "活动特惠": "现价只需237元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    },
    {
      "NO.": "23",
      "production": "瑞和定期寿险",
      "link": "https://cps.qixin18.com/lc1007040/product/detail-10074-321123303.html?from=spks",
      "适用人群": "18-55周岁",
      "保险期限": "一年",
      "特色": "可保障至88周岁",
      "活动特惠": "现价只需640元起！",
      "出单总奖励比例": "20%",
      "A提成比例": "2%",
      "技术服务费": "11.50%"
    }
  ]
  private setCurrent (row: any) {
    const singleTable: any = this.$refs.singleTable
    singleTable.setCurrentRow(row)
  }
  private handleCurrentChange (val: any) {
    this.currentRow = val
  }
  private async created () {
    switch (this.$route.params.type) {
      case '1':
        this.title = '潜在客户'
        break
      case '2':
        this.title = '目标客户'
        break
      case '3':
        this.title = '准客户'
        break
      case '4':
        this.title = '客户'
        break
      default:
        break;
    }
    this.getTableData()
  }
  private mounted () {
    // this.setCurrent(this.currentRow)
  }
  private getTableData () {
    const that = this
    this.userList.map((item: any) => {
      if (item.taskname === that.title) {
        that.tableData = item.tabledate
        that.handleCurrentChange(that.tableData[0])
      }
    })
  }
  private showPro (data: any) {
    this.proTitle = data.production
    this.link = data.link
    this.proDialog = true
  }
  private onCopy () {
    this.$notify({
      title: '操作',
      message: '链接已复制到剪切板',
      type: 'success'
    })
  }
  private onError (e: any) {
    this.$notify({
      title: '操作',
      message: '复制失败，请稍后重试！',
      type: 'warning'
    })
  }
}
</script>

<style lang="scss" scoped>
.custom-handle {
  overflow-x: hidden;
  overflow-y: auto;
  // margin: 10px;
  height: 100%;
  background: #fff;
  border: 7px solid #ebebeb;
  padding: 0 10px 10px 10px;
  .table-query {
    display: flex;
    justify-content: space-between;
    .msg {
      font-size: 14px;
      font-weight: 600;
      margin-left: 20px;
    }
    .btn-box {
      display: flex;
      // margin-right: 10px;
      .el-input {
        margin: 0 13px;
      }
    }
  }
  .table-box {
    .title {
      line-height: 30px;
      border: 1px solid #ccc;
      margin: 10px;
    }
  }
  .el-table {
    border: 1px solid #ccc6;
    margin: 0 auto;
    margin-top: 10px;

  }
  .event-box {
    height: 500px;
    display: flex;
    margin-top: 10px;
    text-align: left;
    .tool-box {
      margin: 0 5px;
      .title {
        line-height: 30px;
        color: #ffffff;
        font-size: 17px;
        background: #8c8885!important;
        text-align: center;
      }
    }
    .info {
      flex: 3;
      border: 1px solid #ccc6;
      .title {
        background: #11cd63
      }
      .user-detail {
        text-align: left;
        padding: 10px 20px;
        p {
          line-height: 30px;
        }
      }
      .user-event-box {
        height: 270px;
        width: 100%;
        overflow-y: scroll;
        border: 1px solid #ccc6;
      }
    }
    .event-center {
      flex: 3;
      // display: flex;
      .title {
        background: #4089ef;
      }
      .call-center {
        border: 1px solid #ccc6;
        .btn-box {
          padding: 30px 40px;
          display: flex;
          .el-button {
            flex: 1;
          }
        }
        margin-bottom: 10px;
      }
      .doubt { 
        border: 1px solid #ccc6;
        padding: 10px 20px;
        p {
          line-height: 40px;
        }
        div {
          margin-top: 10px;
        }
      }
    }
    .production {
      flex: 2;
      .title {
        background: #11cd63
      }
      .pro-list,.policy-query {
        border: 1px solid #ccc6;
      }
      .policy-query {
        margin-top: 10px;
      }
      .query {
        display: flex;
        padding: 10px;
        .el-input {
          flex: 3
        }
        .el-button {
          flex: 1;
          margin-left: 5px;
        }
      }
      .list {
        height: 328px;
        overflow-y: auto;
        .production {
          text-align: center;
          line-height: 23px;
          border: 1px solid #ccc6;
          // margin-bottom: 2px;
          margin: 2px 5px;
          cursor: pointer;
        }
      }
      
    }
    .handle {
      flex: 2;
      border: 1px solid #ccc6;
      .title {
        background: #11cd63
      }
      .handle-list {
        // border: 1px solid #ccc6;
        text-align: center;
        .el-button {
          display: block;
          margin: 0 auto;
          margin-top: 20px;
          width: 80%;
          margin-bottom: 20px;
        }
      }
    }
  }
  .msg-box {
    margin-bottom: 20px;
    .name {
      font-weight: 600;
    }
    span {
      margin-right: 20px;
    }
  }
}
</style>

