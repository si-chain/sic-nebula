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
              <div><i class="iconfont icon-vip"></i>金卡（2w~5w）</div>
              <div><i class="iconfont icon-vip"></i>白金卡（5w~10w）</div>
              <div><i class="iconfont icon-vip"></i>铂金卡（10w~20w）</div>
              <div><i class="iconfont icon-vip"></i>钻石卡（20w~50w）</div>
              <div><i class="iconfont icon-vip"></i>黑钻卡（50w以上）</div>
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
              <div><i class="iconfont icon-vip"></i>常规客户</div>
              <div><i class="iconfont icon-vip"></i>银牌vip客户</div>
              <div><i class="iconfont icon-vip"></i>金牌vip客户</div>
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
              <div><i class="iconfont icon-vip"></i>入门级车主</div>
              <div><i class="iconfont icon-vip"></i>中高级车主</div>
              <div><i class="iconfont icon-vip"></i>豪华车车主</div>
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
}
</style>
