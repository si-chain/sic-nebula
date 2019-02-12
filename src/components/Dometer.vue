<template>
  <span class="iOdometer"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Odometer from 'Odometer'
import 'odometer/themes/odometer-theme-default.css'

@Component
export default class IOdometer extends Vue {

  @Prop({ default: 0 })
  private value!: number
  @Prop({ default: 'minimal' })
  private theme!: string
  @Prop({ default: '(.ddd),dd' })
  private format!: string
  @Prop({ default: 3000 })
  private duration!: number
  @Prop({ default: 'odometer' })
  private className!: string
  @Prop({ default: 'count' })
  private animation!: string
  @Prop({})
  private formatFunction!: () => void
  private instance: any 
  @Watch('value')
  private valuechange (value: any) {
    if (this.instance && this.instance.update) {
      this.instance.update(value)
    }
  }
  private mounted () {
    this.instance = new Odometer({
      el: this.$el,
      value: this.value,
      theme: this.theme,
      format: this.format,
      duration: this.duration,
      animation: this.animation,
    })
    this.instance.render()
  }
}
</script>