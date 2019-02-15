<template>
  <div class="service">
    <div class="menu-item-head">
      <title-item class="help-item-title-left" backgroundColor="#67c23a" name="服务标准" fontSize="12px"></title-item>
      <i class="el-icon-back" @click="changeView"></i>
    </div>
    <div class="service-menu-content">
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="grid-content">
            <div class="service-item-title">
              <i class="iconfont icon-user"></i>
              寿险标准
            </div>
            <div class="service-item-content">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="中西医体检，健康就诊，一对一咨询。">
                <div slot="reference"><i class="iconfont icon-vip"></i>金卡（2w~5w）</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，私人医生，紧急救援，绿通服务。">
                <div slot="reference"><i class="iconfont icon-vip"></i>白金卡（5w~10w）</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，海外医疗，日本体检。">
                <div slot="reference"><i class="iconfont icon-vip"></i>铂金卡（10w~20w）</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，订制礼遇，生日礼宾。">
                <div slot="reference"><i class="iconfont icon-vip"></i>钻石卡（20w~50w）</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，养老社区试住 等。">
                <div slot="reference"><i class="iconfont icon-vip"></i>黑钻卡（50w以上）</div>
              </el-popover>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div class="service-item-title">
              <i class="el-icon-menu"></i>
              团险标准
            </div>
            <div class="service-item-content">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="24小时客服，理赔3天到账。">
                <div slot="reference"><i class="iconfont icon-vip"></i>常规客户</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content=" 包含以上，提供柜台一对一人工服务，增值服务（绿色通道）">
                <div slot="reference"><i class="iconfont icon-vip"></i>银牌vip客户</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，增值服务+超值服务+日常关怀服务">
                <div slot="reference"><i class="iconfont icon-vip"></i>金牌vip客户</div>
              </el-popover>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div class="service-item-title">
              <i class="iconfont icon-car"></i>
              车险标准
            </div>
            <div class="service-item-content">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，增值服务+超值服务+日常关怀服务">
                <div slot="reference"><i class="iconfont icon-vip"></i>入门级车主</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，增值服务+超值服务+日常关怀服务">
                <div slot="reference"><i class="iconfont icon-vip"></i>中高级车主</div>
              </el-popover>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="包含以上，增值服务+超值服务+日常关怀服务">
                <div slot="reference"><i class="iconfont icon-vip"></i>豪华车车主</div>
              </el-popover>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ServiceView extends Vue {
  private changeView () {
    this.$emit('change', 'UserMenu')
  }
}
</script>
<style lang="scss" scoped>
.service-menu-content {
  padding: 0 40px;
}
.service-item-title {
  .iconfont,.el-icon-menu {
    color: #67c23a;
  }
}
.service-item-content {
  margin: 0px 20px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  font-size: 12px;
}
</style>
