<template>
  <div class="tree-view-wrap">
    <el-form ref="form" :inline="true" label-width="85px">
      <el-form-item label="选择文章">
        <el-select size="mini" v-model="articleId" filterable placeholder="请选择">
          <el-option
            v-for="item in $store.state.wxtool.artList"
            :key="item.id"
            :label="item.articleTitle"
            :value="item.articleId">
            <span style="float: left">{{ item.articleTitle }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择分享者">
        <el-select size="mini"
          v-model="readWxOpenId"
          placeholder="请选择"
          @change="readWxOpenIdChange">
          <el-option
            v-for="item in readWxOpenArr"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="全部层级" prop="showAll">
        <el-switch size="mini" v-model="showAll"></el-switch>
      </el-form-item>
      <el-form-item label="显示KOL" prop="isKOL">
        <el-switch size="mini" v-model="isKOL"></el-switch>
      </el-form-item>
      <el-popover
        placement="top-start"
        width="200"
        trigger="hover"
        content="选择是否显示KOL,并可以规定KOL排序规则">
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
      <!-- <el-form-item v-show="isKOL" label="规则" prop="sortType">
        <el-radio-group v-model="sortType">
          <el-radio :label="1">阅读时长</el-radio>
          <el-radio :label="2">时间间隔</el-radio>
          <el-radio :label="3">转发总次数</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item v-if="isKOL" label="KOLs">
        <span v-for="(item, index) in $store.state.wxtool.KOLUser" :key="item.id">
          <el-popover
            placement="top-start"
            title="用户信息"
            width="260"
            trigger="hover">
            <div>
              <p><img width="40" height="40" :src="item.readerWxAvatar"/></p>
              <p>微信昵称：{{item.readerWxNickname}}</p>
              <p>地点：{{item.location}}</p>
              <p v-if="sortType === 1">阅读时间：{{item.lastReadDuration / 60}}分钟</p>
              <p v-if="sortType === 2">时间间隔：{{Math.ceil(item.firstViewInterval / 60)}}分钟</p>
              <p v-if="sortType === 3">转发次数：{{item.shareCount}}次</p>
              <p v-if="sortType === 3">最后转发时间：{{item.lastShareDate | format('yyyy-MM-dd hh.mm')}}</p>
            </div>
            <el-button size="mini" round slot="reference" :style="{backgroundColor: color[index]}" :type="type[index]" @click="clickTag(item, color[index])" style="margin-right: 5px">{{item.readerWxNickname}}</el-button>
          </el-popover>
        </span>
      </el-form-item>
      
    </el-form>
    <div :style="{height: viewHeight + 'px'}" id="wechat-tree-view"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ECharts from 'echarts'

@Component
export default class PathAnalysis extends Vue {
  // todo
  private articleId: string = ''
  private isKOL: boolean = false
  private showAll: boolean = false
  private sortType: number = 3
  private readWxOpenId: string = ''
  private readWxOpenArr: any[] =  []
  private type: any[] = ['primary', 'success', 'warning', 'danger', 'info']
  private color: any[] = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
  private viewHeight: number = 600
  private options: any = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        // backgroundColor: '#aca7a7',
        // borderColor: '',
        enterable: false,
        formatter: (params: any) => {
          const res = `<div class="tooltip-wrap">
          <img style="width: 40px; height: 40px" src="${params.data.avatar}" />
          <p class="red">${params.name}</p>
          <p>地址：${params.data.location}</p>
          <p>阅读时长：${Math.ceil(params.data.readDuration / 60)} 分钟</p>
          <p>转发总次数：${params.data.shareCount} 次</p>
          <p>第一次阅读间隔：${Math.ceil(params.data.firstViewInterval / 60)}分钟</p>
          <p>最后转发时间：${params.data.lastShareDate ? params.data.lastShareDate : '暂无转发'}</p></div>`
          return res
        },
        textStyle: { color: '#fff', align: 'center' }
    },
    backgroundColor: '#fff',
    series: [
        {
            type: 'tree',
            data: [],
            z: 5,
            top: '5%',
            left: '15%',
            bottom: '1%',
            right: '10%',
            symbol: 'emptyCircle',
            symbolSize: [10, 10],
            roam: true,
            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 14
                },
                distance: 30,
                rotate: 90,
                backgroundColor: 'red'
            },
            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },
            initialTreeDepth: 10,
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }
    ]
  }
  @Watch('articleId')
  private async articleIdChange (val: string) {
    this.isKOL = false
    const dom = ECharts.init(document.getElementById('wechat-tree-view'))
    dom.showLoading()
    const treeData = await this.$store.dispatch('wxtool/getTree', {
      articleId: val
    })
    this.readWxOpenArr = treeData
    this.readWxOpenId = treeData[0].value
    this.readWxOpenIdChange(this.readWxOpenId)
  }
  @Watch('isKOL')
  private async isKOLChange (val: boolean) {
    const dom = ECharts.init(document.getElementById('wechat-tree-view'))
    if (val) {
      dom.showLoading()
      const kolArr = await this.$store.dispatch('wxtool/getKol', {
        params: {
          sortType: this.sortType,
          articleId: this.articleId,
          readWxOpenId: this.readWxOpenId
        },
        setColor: '#adc4e1'
      })
      this.options.series[0].data = kolArr
      dom.setOption(this.options)
      dom.hideLoading()
    } else {
      dom.showLoading()
      let id = ''
      this.articleId === '' ? id = this.$store.state.wxtool.artList[0].articleId : id = this.articleId
      this.options.series[0].data = await this.$store.dispatch('wxtool/getTree', id)
      dom.setOption(this.options)
      dom.hideLoading()
    }
  }
  // @Watch('readWxOpenId')
  private async readWxOpenIdChange (val: string) {
    this.isKOL = false
    const dom = ECharts.init(document.getElementById('wechat-tree-view'))
    dom.showLoading()
    const treeData = await this.$store.dispatch('wxtool/getTree', {
      articleId: this.articleId,
      readWxOpenId: val
    })
    this.options.series[0].data = treeData
    dom.setOption(this.options)
    dom.hideLoading()
  }
  @Watch('sortType')
  private async sortTypeChange (val: number) {
    const dom = ECharts.init(document.getElementById('wechat-tree-view'))
    dom.showLoading()
    this.readWxOpenId = this.$store.state.wxtool.treeData[0].value
    const kolArr = await this.$store.dispatch('wxtool/getKol', {
      params: {
        sortType: val,
        articleId: this.articleId,
        readWxOpenId: this.readWxOpenId
      },
      setColor: '#adc4e1'
    })
    this.options.series[0].data = kolArr
    dom.setOption(this.options)
    dom.hideLoading()
  }
  @Watch('showAll')
  private async showAllChange (val: boolean) {
    const dom = ECharts.init(document.getElementById('wechat-tree-view'))
    if (val) {
      this.options.series[0].initialTreeDepth = -1
    } else {
      this.options.series[0].initialTreeDepth = 10
    }
    dom.setOption(this.options)
  }
  private get params () {
    return {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid
    }
  }
  private mounted () {
    this.$nextTick( async () => {
      this.viewHeight  = document.documentElement.clientHeight + 380
      if (this.params.cid) {
        await this.$store.dispatch('wxtool/getArts', this.params)
        this.articleId = this.$store.state.wxtool.artList[0].articleId
        this.articleIdChange(this.articleId)
      } else {
        await this.$store.dispatch('user/getUserInfo')
        await this.$store.dispatch('wxtool/getArts', this.params)
        this.articleId = this.$store.state.wxtool.artList[0].articleId
        this.articleIdChange(this.articleId)
      }
    })
  }
  private setWxOpenId (id: string) {
    this.readWxOpenId = id
  }
  private async clickTag (data: any, color: string) {
    const dom = ECharts.init(document.getElementById('wechat-tree-view'))
    dom.showLoading()
    await this.$store.dispatch('wxtool/getTree', this.articleId)
    const result = await this.$store.dispatch('wxtool/setKolColor',
      {sharerWxOpenid: data.readerWxOpenid, setColor: color})
    this.options.series[0].data = result
    dom.setOption(this.options)
    dom.hideLoading()
  }
}
</script>
<style lang="scss" scoped>
.tree-view-wrap {
  background: #ffffff;
  .el-form {
    padding-top: 10px;
    .el-icon-question {
      line-height: 33px;
      color: #999;
    }
    .el-select {
      width: 300px;
    }
  }
}
#wechat-tree-view {
  width: 100%;
}
 .tooltip-wrap {
   p {
     word-wrap:break-word; 
     word-break:normal;
     line-height: 15px;
   }
 }
</style>

