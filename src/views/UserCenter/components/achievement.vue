<template>
  <div class="honor">
    <div class="menu-item-head">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="我的业绩" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div>
      <div id="charts-achievement"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import ECharts from 'echarts'


@Component
export default class AchievementView extends Vue {
  private option: any = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        type: 'pie',
        radius : '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: [
          {value: 535, name: '团险'},
          {value: 510, name: '个险'},
          {value: 634, name: '车险'},
          {value: 735, name: '寿险'}
        ]
      }
    ]
  }
  private mounted () {
    this.$nextTick( () => {
      const dom = ECharts.init(document.getElementById('charts-achievement'))
      dom.setOption(this.option)
    })
  }
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>

<style lang='scss'>
#charts-achievement {
  width: 600px;
  height: 600px;
}
 
</style>
