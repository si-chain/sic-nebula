<!--
 * @Author: jhd
 * @Description: 数据运营分析 file content
 * @Date: 2019-03-08 14:00:53
 -->
<template>
  <div class="session-list">
    <div class="title clearfix">
      <title-item class="title-left" name="运营数据分析" fontSize="16px"></title-item>
      <!-- <el-button type="success" size="mini" @click="addQuestionLog">添加</el-button> -->
    </div>
    <div class="table-box">
      <div class="kol-all view-box" id="kol-all"></div>
      <div class="view-box" v-for="i in viewBox" :key="i.id">
        <div class="left-view " :id="`view-box-left-${i.id}`"></div>
        <div class="right-view" :id="`view-box-right-${i.id}`"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ECharts from 'echarts'

@Component
export default class SessionSet extends Vue {
  private tableData: any[] = []
  private loading: boolean = true
  private formOptions: any = {
    sortType: '3',
    keyWord: ''
  }
  private gridSet: any = {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  }
  private allXAxis: any[] = []
  private viewBox: any[] = []
  private allData: any = {
    readData: [],
    shareData: []
  }
  private hotDataInfo: any = []
  private ReportDate: any[] = []
  // 全部文章的数据分析
  private allViewOptions: any = {
    color: '#f10',
    title: {
      text: '全部文章分析',
      subtext: '排列所有文章前五的kol'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: this.gridSet,
    xAxis: [
      {
        type: 'category',
        data: this.allXAxis,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '用户转发次数',
        type: 'bar',
        itemStyle: {
          color: '#2ec7c9'
        },
        data: this.allData.shareData
      },
      {
        name: '用户阅读次数',
        type: 'bar',
        itemStyle: {
          color: '#b6a2de'
        },
        data: this.allData.readData
      }
    ]
  }
  // 单个文章的数据分析
  private options: any = {
    title: {
      text: '',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: this.gridSet,
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [
      {
        name: '分享次数',
        type: 'bar',
        itemStyle: {
          color: '#ffb868'
        },
        barWidth: '20px',
        data: []
      }
    ]
  }
  private hotOptions: any = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data:[]
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[]
      }
    ]
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
      const data = await this.$store.dispatch('wxtool/getReportDate', {
        ...this.params,
        sortType: '3'
      })
      if (data.errcode === 200) {
        this.ReportDate = data.data
        data.data.map(async (item: any) => {
          if (item.isAll) {
            const readData: number[] = []
            const shareData: number[] = []
            item.reportDate.map((report: any) => {
              readData.push(report.shareCount)
              shareData.push(report.readCount)
              this.allXAxis.push(report.readerWxNickname)
            })
            this.allData = {
              'readData': readData,
              'shareData': shareData
            }
          } else {
            const child: any = {
              data: [],
              id: item.articleId,
              title: item.articleTitle,
              users: []
            }
            item.reportDate.map((report: any) => {
              child.data.push(report.readCount)
              child.users.push(report.readerWxNickname)
            })
            this.viewBox.push(child)
          }
        })
        this.allViewOptions.series[0].data = this.allData.shareData
        this.allViewOptions.series[1].data = this.allData.readData
        const kolAll = ECharts.init(document.getElementById('kol-all'))
        kolAll.setOption(this.allViewOptions)
        this.$nextTick(() => {
          this.viewBox.map((child: any, index: number) => {
            const dom = ECharts.init(document.getElementById(`view-box-left-${child.id}`))
            const options = this.options
            options.title.text = child.title
            options.yAxis.data = this.viewBox[index].users
            options.series[0].data = this.viewBox[index].data
            dom.setOption(options)
          })
        })
      }
      this.loading = false
      this.ReportDate.map(async (reportItem: any) => {
        const hotData = await this.$store.dispatch('wxtool/getReportDate', {
          ...this.params,
          sortType: '5',
          postId: reportItem.articleId
        })
        const resData: any = []
        const resUserData: any = []
        hotData.data[1].reportDate.map((item: any) => {
          resData.push(item.readCount)
          resUserData.push(item.readerWxNickname)
        })
        resData.push(hotData.data[0].allReadCount - eval(resData.join('+')))
        resUserData.push('其他')
        this.hotDataInfo.push({
          'user': resUserData,
          'data': resData
        })
        this.$nextTick(() => {
          const dom = ECharts.init(document.getElementById(`view-box-right-${reportItem.articleId}`))
          const options = this.hotOptions
          options.legend.data = resUserData
          resUserData.map((user: any, index: number) => {
            options.series[0].data.push({
              'value': resData[index],
              'name': user
            })
          })
          dom.setOption(options)
        })
      })
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
.kol-all {
  // width: 100%;
  height: 400px;
  margin: 0 auto;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
}
.kol-all:hover {
  border: 2px solid #38c701;
}
.view-box {
  height: 300px;
  display: flex;
 
  .left-view {
    flex: 5;
    padding: 20px;
    margin: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
  .left-view:hover {
    border: 2px solid #38c701;
  }
  .right-view {
    flex: 3
  }
}
</style>

