<template>
  <div class="task-info">
    <el-row :gutter="10">
          <el-col :span="6">
            <div class="grid-content bg-purple task1">
              <div class="task-title-box">
                <title-item class="help-item-title-left" backgroundColor="#38c701" name="潜在客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over">
                  <div class="time-tip ash">
                    <p>总潜客：</p>
                    <p>{{90 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成目标客户：</p>
                    <p>{{82 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成准客户：</p>
                    <p>{{44 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成客户：</p>
                    <p>{{21 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>剩余潜客：</p>
                    <p>{{81 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/1">
                    <el-button type="primary" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple task2">
              <div class="task-title-box over-task">
                <title-item class="help-item-title-left" backgroundColor="#efa010" name="目标客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over">
                  <div class="time-tip ash">
                    <p>总目标客户：</p>
                    <p>{{80 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成准客户：</p>
                    <p>{{33 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成客户：</p>
                    <p>{{22 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>剩余客户：</p>
                    <p>{{60 - Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/2">
                    <el-button type="warning" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple task3">
              <div class="task-title-box over-task ">
                <title-item class="help-item-title-left" backgroundColor="#ff6066" name="准客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over">
                  <div class="time-tip ash">
                    <p>总准客户：</p>
                    <p>{{40 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>已转化成客户：</p>
                    <p>{{21 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>剩余准客户：</p>
                    <p>{{19 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/3">
                    <el-button type="danger" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple task4">
              <div class="task-title-box over-task">
                <title-item class="help-item-title-left" backgroundColor="#8f9398" name="客户" :showTooltip="false" fontSize="18px"></title-item>
              </div>
              <div class="task-item">
                <div class="grid-content bg-purple hover-box over">
                  <div class="time-tip ash">
                    <p>总成交客户：</p>
                    <p>{{21 + Math.floor( Math.random() * 10 )}}人</p>
                  </div>
                  <div class="time-tip ash">
                    <p>当前综合效率：</p>
                    <p>{{18 + Math.floor( Math.random() * 10 )}}%</p>
                  </div>
                  <!-- <router-link to="/data/custom-handle/4">
                    <el-button type="info" round>继续处理</el-button>
                  </router-link> -->
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TaskDialog extends Vue {
   private activeObj: any = {
    // 总潜客
    all: 80 + Math.floor( Math.random() * 10 ),
    // 目标客户
    targetTip: 60 + Math.floor( Math.random() * 10 ),
    // 准客户
    grantTip: 20 + Math.floor( Math.random() * 10 ),
    // 客户
    customTip: 10 + Math.floor( Math.random() * 10 ),
    // 剩余
    superlusTip: 10 + Math.floor( Math.random() * 10 )
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

.grid-content {
  padding: 10px;
  border: 1px solid $bg-color;
  border-radius: 5px;
  margin-top: 10px;
  .task-title-box {
    display: flex;
    justify-content: center;
    background: #f10;
    padding: 8px 0px;
    background: #11cd63;
    color: #fff;
  }
  .over-task {
    background: #38f;
    .time-tip {
      color: #38f;
      display: flex;
    }
  }
  .el-button {
    margin: 30px 0 10px 0;
  }
  .task-item-active {
    border: 1px solid #67c23a !important;
  }
  
  .hover-box:hover,.hover-box:focus {
    border: 1px solid #67c23a !important;
  }
  .task-item {
    position: relative;
    // .el-button {
    //   margin: 30px 0 10px 0;
    //   position: absolute;
    //   bottom: 20px;
    //   left: 26%;
    // }
  }
}
.task1 {
  .task-title-box {
    background: #38c701
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #38c701;
    line-height: 2
  }
}
.task2 {
  .task-title-box {
    background: #efa010
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #efa010;
    line-height: 2
  }
}
.task3 {
  .task-title-box {
    background: #ff6066
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #ff6066;
    line-height: 2
  }
}
.task4 {
  .task-title-box {
    background: #8f9398
  }
  .grid-content {
    height: 262px;
  }
  .time-tip {
    color: #8f9398;
    line-height: 2
  }
}
.time-tip {
  color: #38f;
  display: flex;
}
</style>

