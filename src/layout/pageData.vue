<template>
  <div class="page-data">
    <slot name="form"></slot>
    <div class="grid" v-loading="$parent.isLoading">
      <slot name="table"></slot>
      <el-pagination
        :current-page="data.current || data.pageNo"
        :page-size="data.size || data.pageSize"
        :page-sizes="[5,10,15,20]"
        :total="data.total || data.totalCount"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-if="data.total || data.totalCount"
      ></el-pagination>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import miniPage from '../mixin/MixinPage'

@Component
export default class PageData extends Vue {
  @Prop({})
  private data!: any
  public handleGetList: any
  public $parent: any
  public handleSizeChange (size: number) {
    console.log('size', size)
    this.$parent.handleGetList(this.data.current, size)
  }
  public handleCurrentChange (current: number) {
    console.log(current)
    window.scrollTo(0, 0)
    this.$parent.handleGetList(current, this.data.size)
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  float: right;
  margin: 10px;
}
</style>


