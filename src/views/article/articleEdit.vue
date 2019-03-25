<template>
  <div style="padding: 20px 10px; text-align: left">
    <el-form :model="form" :rules="rules" label-width="120px" ref="form" size="mini">
      <el-form-item label="文章类型" prop="postType">
        <el-row :gutter="15" justify="start" type="flex">
          <el-col :span="4">
            <el-select style="width: 100%" clearable filterable placeholder="活动大类" v-model="articleType1">
              <el-option
                :key="index"
                :label="item.codeName"
                :value="item.id"
                v-for="(item,index) in articleType1List"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select style="width: 100%" clearable filterable placeholder="活动小类" v-model="articleType2">
              <el-option :key="index" :label="item.codeName" :value="item.id" v-for="(item,index) in articleType2List"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16"></el-col>
        </el-row>
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
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="handleUpload">
          <img v-if="form.thumbnail" :src="form.thumbnail" class="avatar-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="文章标签">
        <el-input placeholder="请输入文章标签（用逗号或空格分隔）" v-model="form.tags"></el-input>
      </el-form-item> -->
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
import 'tinymce/plugins/media'
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
    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu media',
    toolbar: `bold italic underline strikethrough | fontsizeselect | forecolor backcolor
      | alignleft aligncenter alignright alignjustify | bullist numlist | outdent
       indent blockquote | undo redo | link unlink image code | removeformat | media`,
    branding: false,
    media_live_embeds: true,
    file_picker_types: 'media',
    file_picker_callback: (callback: any, value: any, file: any) => {
      this.handleFileUpload(callback, value, file)
    },
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
      this.handleImgUpload(blobInfo, success, failure)
    },
    video_template_callback: (data: any) => {
      console.log(data)
      // return `<video width="${data.width}" height="${data.height }" ${data.poster ? ` poster="${data.poster}"` : ''`
      // ' controls="controls">\n' + '<source src="${data.source1}" ${data.source1mime ? ` type="${data.source1mime}"` : ''` />\n ${data.source2 ? `<source src="'${data.source2}"` ${data.source2mime ? ` type="${data.source2mime}"` : ''}' />\n' : '' }</video>`
    }
  }
  private articleType1: string = ''
  private articleType2: string = ''
  private articleType1List: any[] = []
  private articleType2List: any[] = []
  private LogoUrl: string = ''
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
  private form: any = {
    isOriginal: '1',
    postType: 3,
    fileNailList: [],
    thumbnail: '',
    title: '',
    postSource: '1',
    sourceUrl: '',
    content: '',
    summary: ''
  }
  private id: string = ''
  @Watch('articleType1')
  private articleType1Change (val: string) {
    this.articleType1List.map((item: any) => {
      if (item.id === val) {
        this.articleType2List = item.children
      }
    })
  }
  // 上传logo
  private handleUpload (files: any) {
    const cuoss = new Cuoss({
      type: 'public',
      baseURL: '/api'
    })
    const that = this
    cuoss.upload(files.file, {
      parseFail (error: any) {
        that.$message.error(error)
      },
      async uploadSuccess (res: any) {
        that.form.thumbnail = res.url
      },
      uploadProgress (progress: any) {
        that.$notify.success({
          title: `${progress < 100 ? 'logo上传中' : '上传成功'}`,
          message: `${progress < 100 ? `文件进度${progress}%` : 'logo上传成功'}`
        })
      },
      uploadFail (error: any) {
        that.$message.error(error.toString())
      },
      parseProgress (res: any) {
        // 解析文件
      },
      parseSuccess (md5: any) {
        // 解析成功
      }
    })
  }
  private async mounted () {
    const typeData1 = await this.$store.dispatch('article/getArticleTypes', {
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid,
      codeType: 'articleType1',
      level: 1,
      parentId: '',
      size: 50
    })
    this.articleType1List = typeData1.data.records
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
  private async handleCreate () {
    this.isLoading = false
    const data = await this.$store.dispatch('article/addArticle', {
      authorId: this.$store.state.user.userInfo.id,
      authorName: this.$store.state.user.userInfo.cname,
      cid: this.$store.state.user.userInfo.cid,
      gid: this.$store.state.user.userInfo.gid,
      ...this.form,
      articleType1: this.articleType1,
      articleType2: this.articleType2
    })
    if (data.errcode === 200) {
      this.$message.success('添加成功')
      this.$router.go(-1)
    } else {
      this.$message.error(data.data)
    }
  }
  private async handleUpdate () {
    const data = await this.$store.dispatch('article/updateArticle', {
      id: this.$store.state.user.userInfo.id,
      params: {
        ...this.form,
        articleType1: this.articleType1,
        articleType2: this.articleType2
      }
    })
    if (data.errcode === 200) {
      this.$message.success('更新成功')
      this.$router.go(-1)
    } else {
      this.$message.error(data.data)
    }
  }
  // 获取详情
  private async handleArticleDetail () {
    const data = await this.$store.dispatch('article/getArticleDetail', {
      id: this.id,
      uid: this.$store.state.user.userInfo.id
    })
    this.form = data.data
    this.articleType1 = data.data.articleType1
    this.articleType2 = data.data.articleType2
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
      uploadProgress (progress: any) {
        that.$notify.success({
          title: `${progress < 100 ? 'logo上传中' : '上传成功'}`,
          message: `${progress < 100 ? `文件进度${progress}%` : 'logo上传成功'}`
        })
      },
      uploadFail (error: any) {
        failure(error)
      },
      parseProgress (res: any) {
        // 解析文件
      },
      parseSuccess (md5: any) {
        // 解析成功
      }
    })
  }
  private handleFileUpload (cb: any, value: any, file: any) {
    const that = this
    if (file.filetype === 'media') {
      // 创建一个隐藏的type=file的文件选择input
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'video/*')
      input.click()
      input.onchange = (val: any) => {
        const file = val.target.files[0]
        if (!file) return
        const cuoss = new Cuoss({
          type: 'public',
          baseURL: '/api'
        })
        cuoss.upload(file, {
          parseFail (error: any) {
            that.$message.error(error)
          },
          async uploadSuccess (res: any) {
            cb(res.url, {title: file.name})
          },
          uploadProgress (progress: any) {
            that.$notify.success({
              title: `${progress < 100 ? 'logo上传中' : '上传成功'}`,
              message: `${progress < 100 ? `文件进度${progress}%` : 'logo上传成功'}`
            })
          },
          uploadFail (error: any) {
            that.$message.error(error.toString())
            that.isLoading = false
          },
          parseProgress (res: any) {
            // 解析文件
          },
          parseSuccess (md5: any) {
            // 解析成功
          }
        })
      }
    }
  }
}
</script>

