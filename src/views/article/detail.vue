<template>
  <div>
    <header style="padding:20px;">
      <h1 style="font-size:30px;margin-bottom:1%">{{data.title}}</h1>
      <div>
        <span v-if="data.isOriginal===2">
          转自:
          <a :href="data.sourceUrl">{{data.title}}</a>
        </span>
        <span v-else>原创:{{data.authorName}}</span>
      </div>
    </header>
    <div v-html="data.content"></div>

    <div class="btns" style="margin-top: 20px;display:flex;justify-content: center">
      <el-button @click="$router.go(-1)" icon="el-icon-back">返回</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ArticleDetail extends Vue {
  private data: any = {}
  private async created () {
    const data = await this.$store.dispatch('article/getArticleDetail', {id: this.$route.params.id})
    console.log(data)
    this.data = data.data
  }
}
</script>
