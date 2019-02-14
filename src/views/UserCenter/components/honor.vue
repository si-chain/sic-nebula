<template>
  <div class="honor">
    <div class="menu-item-head">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="荣誉殿堂" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div class="honor-content">
      1.百万圆桌会议（MDRT）
          百万圆桌会议(TheMillionDollarRoundTable,简称MDRT)是全球寿险精英的最高盛会。
        寿险百万圆桌会对大多数中国人来说是陌生的，但它却已成为中国庞大的寿险营销队伍的向往所在。
        国际寿险百万圆桌会议成立于1927年，当时32名销售业绩在百万美元以上的寿险营销员希望组成一个论坛，
        致力于扶植高标准的寿险销售概念，树立寿险营销人员的形象。
      2.IDA国际龙奖
          IDA(InternationalDragonAward)国际龙奖是世界华人金融保险业的最高荣誉殿堂。
        于1998年设立，旨在提供一个公正客观的标准，给予这些优秀的精英们国际性的荣誉与肯定，鼓励大家向更宏伟的目标选择，追求更高品味内涵的生活方式。
        IDA国际龙奖的会员来自于美国、澳大利亚、中国大陆、中国香港、中国澳门、中国台湾、马来西亚、新加坡、泰国、印尼、加拿大、纽西兰、文莱等十多个国家和地区，是全球华人金融保险业中最顶尖优秀的成功人士。
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class HonorView extends Vue {
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>

<style lang='scss'>
.honor-content {
  text-align: left;
}
 
</style>
