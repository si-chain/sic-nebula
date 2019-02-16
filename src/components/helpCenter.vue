<template>
  <div class="help-center">
    <div class="header">
      <p class="title">
        <!-- <i class="icon el-icon-question"></i> -->
        <span class="title-name">帮助中心与服务</span>
        <i class="icon el-icon-arrow-right"></i>
      </p>
      <div class="help-container">
        <div class="help-item">
          <div class="help-item-title">
            <title-item class="help-item-title-left" name="帮助中心" fontSize="12px"></title-item>
            <!-- <span class="help-item-title-right">
              进入
              <i class="el-icon-d-arrow-right"></i>
            </span> -->
          </div>
          <div class="help-item-content">
            <p class="help-item-content-title">数据中心有什么用？</p>
            <p class="help-item-content-msg">学会分析各种险类的分组数据情况，找到用户的敏感点，对您的营销运营有很大的帮助。比如您可以通过数据分析出用户的..</p>
          </div>
          <!-- <div class="help-item-content">
            <p class="help-item-content-title">数据中心有什么用？</p>
            <p class="help-item-content-msg">学会分析各种险类的分组数据情况，找到用户的敏感点，对您的营销运营有很大的帮助。比如您可以通过数据分析出用户的..</p>
          </div> -->
          <div class="help-item-content help-item-link">
            <a>数据概况名词说明</a>
            <a>从数据分析了解用户情况</a>
          </div>
        </div>
        <div class="help-item">
          <div class="help-item-title">
            <title-item class="help-item-title-left" name="数据服务窗口" fontSize="12px"></title-item>
          </div>
          <div class="custom-service">
            <el-button size="mini" plain>在线客服</el-button>
            <span>服务电话：4000610299</span>
          </div>
        </div>
        <div class="help-item">
          <div class="help-item-title">
            <title-item class="help-item-title-left" name="找服务" fontSize="12px"></title-item>
          </div>
          <div class="help-item-content help-item-link no-top no-border">
            <a>发布服务需求</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export default class HelpCenter extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable.scss";

.help-center {
  height: calc(100vh - 50px);
  text-align: left;
  .title {
    text-align: center;
    line-height: 42px;
    border-bottom: 1px solid $bg-color;
    .title-name {
      margin: 0 5px;
      font-size: 14px;
    }
  }
}
.help-container {
  margin: 5px;
}

.help-item-title {
  margin-top: 10px;
  display: flex;
  .help-item-title-left {
    flex: 2;
  }
  .help-item-title-right {
    flex: 1;
    font-size: 13px;
    line-height: 25px;
  }
}
.help-item-content {
  margin: 15px;
  font-size: 14px;
  .help-item-content-title {
    line-height: 33px;
  }
  .help-item-content-msg {
    font-size: 12px;
    color: #858383;
  }
}
.help-item-link {
  font-size: 12px;
  text-align: left;
  border-top: 1px solid #787987;
  border-bottom: 1px solid #787987;
  margin-top: 26px;
  padding: 9px 0px;
  a {
    display: block;
    line-height: 20px;
    margin-left: 5px;
    color: #006880;
  }
}
.custom-service {
  background: #e6e6e6;
  border-radius: 3px;
  text-align: center;
  padding: 10px 0px;
  margin: 10px;
  span {
    font-size: 12px;
    margin-top: 4px;
    display: block;
  }
}
.no-top {
  margin-top: 0;
}
.no-border {
  border: none;
}
</style>

