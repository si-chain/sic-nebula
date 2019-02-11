<template>
  <div class="title-item">
    <span v-if="LeftIcon === ''" class="left-color" :style="{background: backgroundColor}"></span>
    <span v-else><i class="iconfont" :class="LeftIcon" :style="{color: backgroundColor, fontSize: fontSize}"></i></span>
    <span class="name" :style="{fontSize: fontSize}">{{ name }}</span>
    <el-popover v-if="showTooltip"
      placement="top-start"
      :title="ToolTipTitle"
      width="200"
      trigger="hover"
      :content="msg">
      <i class="icon" :class="icon" slot="reference"></i>
    </el-popover>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TitleItem extends Vue {
  // background
  @Prop({ default: '#f88330' })
  private backgroundColor!: string
  // 名字
  @Prop({ default: ''})
  private name!: string
  // tooltip 提示信息
  @Prop({ default: '这是提示信息' })
  private msg!: string
  // 是否显示tooltip
  @Prop({ default: false })
  private showTooltip!: boolean
  // ToolTipTitle
  @Prop({ default: '' })
  private ToolTipTitle!: string
  // 提示信息默认icon
  @Prop({ default: 'el-icon-question' })
  private icon!: string
  // 字体大小
  @Prop({ default: '14px' })
  private fontSize!: string
  // 左侧自定义icon
  @Prop({ default: ''})
  private LeftIcon!: string
}
</script>

<style lang="scss" scoped>
.title-item {
  display: flex;
  margin-left: 3px;
  span {
    margin-right: 5px;
    line-height: 23px;
  }
  .name {
    font-weight: 700;
  }
  .left-color {
    width: 4px;
    margin-top: 2px;
    height: 20px;
  }
  .icon {
    margin-top: 3px;
    color: #858282;
  }
}
</style>

