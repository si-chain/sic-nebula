<template>
  <div style="padding: 20px 10px">
    <el-form :model="form" :rules="rules" label-width="120px" ref="form" size="mini">
      <el-form-item label="文章类型" prop="postType" v-if="$route.query.type==='news'">
        <el-radio-group v-model="form.postType">
          <el-radio-button :label="4">公司新闻</el-radio-button>
          <el-radio-button :label="5">活动通知</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章类型" prop="postType" v-else>
        <el-radio-group v-model="form.postType">
          <el-radio-button :label="1">草稿</el-radio-button>
          <el-radio-button :label="2">共享</el-radio-button>
          <el-radio-button :label="3">经代专属</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否原创" prop="isOriginal" v-if="!$route.query.type">
        <el-radio-group v-model="form.isOriginal">
          <el-radio-button label="1">原创</el-radio-button>
          <el-radio-button label="2">转载</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="原文URL" v-if="'' + form.isOriginal === '2'">
        <el-input placeholder="请输入原文URL" v-model="form.sourceUrl"></el-input>
      </el-form-item>
      <el-form-item label="文章标题" prop="title" v-if="'' + form.isOriginal === '1'">
        <el-input placeholder="请输入文章标题" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item
        label="文章内容"
        prop="content"
        v-if="'' + form.isOriginal === '1'"
        v-loading="isLoading"
      >
        <Editor :init="init" height="1000px" id="tinymce" v-model="form.content"></Editor>
      </el-form-item>
      <el-form-item label="文章图标" prop="thumbnailName" v-if="'' + form.isOriginal === '1'">
        <Upload
          :fileList="form.fileNailList"
          :limit="1"
          @remove="handleRemoveNail"
          type="public"
          v-model="nailObj"
        ></Upload>
      </el-form-item>
      <el-form-item label="文章标签">
        <el-input placeholder="请输入文章标签（用逗号或空格分隔）" v-model="form.tags"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleUpdate" icon="el-icon-check" type="success" v-if="id">保存</el-button>
        <el-button @click="handleCreate" icon="el-icon-plus" type="primary" v-else>新增</el-button>
        <el-button @click="$router.go(-1)" icon="el-icon-back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import Cuoss from 'cuoss'

@Component({
  components: {
    Editor
  }
})
export default class ArticleEdit extends Vue  {
  private isLoading: boolean = false
  private init: any = {
    language_url: 'https://cdn.17doubao.com/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: 'https://cdn.17doubao.com/tinymce/skins/lightgray',
    min_height: 300,
    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
    toolbar: `bold italic underline strikethrough | fontsizeselect | forecolor backcolor
      | alignleft aligncenter alignright alignjustify | bullist numlist | outdent
       indent blockquote | undo redo | link unlink image code | removeformat`,
    branding: false,
    images_upload_handler: function (blobInfo: any, success: any, failure: any) {
      this.handleImgUpload(blobInfo, success, failure)
    }
  }
  private rules: any = {
    authorName: [
      { required: true, message: '请填写作者姓名', trigger: 'blur' }
    ],
    thumbnailName: [
      { required: true, message: '请上传文章图标', trigger: 'change' }
    ],
    postSource: [
      { required: true, message: '请选择文章来源', trigger: 'blur' }
    ],
    postType: [
      { required: true, message: '请选择文章类型', trigger: 'blur' }
    ],
    isOriginal: [
      { required: true, message: '请选择是否原创', trigger: 'blur' }
    ],
    title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
    content: [
      { required: true, message: '请输入文章内容', trigger: 'blur' }
    ]
  }
  private nailObj: any = {}
  private form: any = {
    isOriginal: '1',
    postType: 3,
    fileNailList: []
  }
  private id: string = ''
  @Watch('nailObj')
  private nailObjChange (val: any) {
    this.$set(this.form, 'thumbnailName', val.name)
    this.form.fileNailList.push(val)
    this.form.thumbnail = val.url
    this.form.postSource = 1
    if (this.$route.query.type === 'news') {
      this.form.isOriginal = 1
    }
  }
  private created () {
    tinymce.init({})
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.handleArticleDetail()
      this.isLoading = false
    }
  }
  private handleValidate () {
    return new Promise((resolve, reject) => {
      if (!this.$refs.form) {
        resolve()
      }
      const form: any = this.$refs.form
      form.validate((valid: any) => {
        if (valid) {
          resolve()
        } else {
          reject('验证不通过')
        }
      })
    })
  }
  private handleCreate () {
    this.isLoading = false
  }
  private handleUpdate () {
    console.log('更新')
  }
  // 获取详情
  private async handleArticleDetail () {
    const data = await this.$store.dispatch('article/getArticleDetail', {
      id: this.id,
      uid: this.$store.state.user.userInfo.id
    })
    this.form = data.data
  }
  // 删除图标
  private handleRemoveNail () {
    this.form.fileNailList = []
    this.form.thumbnail = ''
    this.form.thumbnailName = ''
  }
  private handleImgUpload (blobInfo: any, success: any, failure: any) {
    const cuoss = new Cuoss({
      baseURL: '/api'
    })
    const that = this
    cuoss.upload(blobInfo.blob(), {
      parseFail (error: any) {
        that.$message.error(error)
      },
      uploadSuccess (res: any) {
        success(res.url)
      },
      uploadFail (error: any) {
        failure(error)
      }
    })
  }
}
</script>

