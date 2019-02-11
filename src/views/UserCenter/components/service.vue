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
              <div><i class="iconfont icon-vip"></i>VIP1</div>
              <div><i class="iconfont icon-vip"></i>VIP2</div>
              <div><i class="iconfont icon-vip"></i>VIP3</div>
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
              <div><i class="iconfont icon-vip"></i>VIP1</div>
              <div><i class="iconfont icon-vip"></i>VIP2</div>
              <div><i class="iconfont icon-vip"></i>VIP3</div>
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
              <div><i class="iconfont icon-vip"></i>VIP1</div>
              <div><i class="iconfont icon-vip"></i>VIP2</div>
              <div><i class="iconfont icon-vip"></i>VIP3</div>
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
