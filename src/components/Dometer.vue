<template>
  <span :class="className"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Odometer from 'odometer'
import _ from 'lodash'
import 'odometer/themes/odometer-theme-default.css'

@Component
export default class IOdometer extends Vue {

  @Prop({ default: 0 })
  private value!: number
  @Prop({ default: 'default' })
  private theme!: string
  @Prop({ default: '(,ddd).dd' })
  private format!: string
  @Prop({ default: 1500 })
  private duration!: number
  @Prop({ default: 'odometer' })
  private className!: string
  @Prop({ default: 'count' })
  private animation!: string
  @Prop({})
  private formatFunction!: () => void
  private instance: any = undefined

  @Watch('value', { deep: false })
  private valuechange (value: number) {
    if (this.instance && _.isFunction(this.instance.update)) {
      this.instance.update(value)
    }
  }
  private init () {
    if (this.instance) {
      return
    }
    const dom = this.$el
    const instance = new Odometer({
      el: dom,
      value: 0,
      format: this.format,
      theme: this.theme,
      duration: this.duration,
      animation: this.animation
    })
    instance.render()
    // this.$emit('ready', instance, Odometer)
    this.instance = instance
  }
  private uninit () {
    this.instance = undefined
  }
  private renderInside () {
    if (this.instance && _.isFunction(this.instance.renderInside)) {
      this.instance.renderInside()
    }
  }
  private watchForMutations () {
    if (this.instance && _.isFunction(this.instance.watchForMutations)) {
      this.instance.watchForMutations()
    }
  }
  private startWatchingMutations () {
    if (this.instance && _.isFunction(this.instance.startWatchingMutations)) {
      this.instance.startWatchingMutations()
    }
  }
  private stopWatchingMutations () {
    if (this.instance && _.isFunction(this.instance.stopWatchingMutations)) {
      this.instance.stopWatchingMutations()
    }
  }
  private cleanValue (val: any) {
    if (this.instance && _.isFunction(this.instance.cleanValue)) {
      this.instance.cleanValue(val)
    }
  }
  private bindTransitionEnd () {
    if (this.instance && _.isFunction(this.instance.bindTransitionEnd)) {
      this.instance.bindTransitionEnd()
    }
  }
  private resetFormat () {
    if (this.instance && _.isFunction(this.instance.resetFormat)) {
      this.instance.resetFormat()
    }
  }
  private renderDigit () {
    if (this.instance && _.isFunction(this.instance.renderDigit)) {
      this.instance.renderDigit()
    }
  }
  private formatDigits (value: any) {
    if (this.instance && _.isFunction(this.instance.formatDigits)) {
      this.instance.formatDigits(value)
    }
  }
  private insertDigit (digit: any, before: any) {
    if (this.instance && _.isFunction(this.instance.insertDigit)) {
      this.instance.insertDigit(digit, before)
    }
  }
  private addDigit (value: any, repeating: any) {
    if (this.instance && _.isFunction(this.instance.addDigit)) {
      this.instance.addDigit(value, repeating)
    }
  }
  private addSpacer (chr: any, before: any, extraClasses: any) {
    if (this.instance && _.isFunction(this.instance.addSpacer)) {
      this.instance.addSpacer(chr, before, extraClasses)
    }
  }
  private animate (newValue: any) {
    if (this.instance && _.isFunction(this.instance.animate)) {
      this.instance.animate(newValue)
    }
  }
  private animateCount (newValue: any) {
    if (this.instance && _.isFunction(this.instance.animateCount)) {
      this.instance.animateCount(newValue)
    }
  }
  private getDigitCount () {
    if (this.instance && _.isFunction(this.instance.getDigitCount)) {
      this.instance.getDigitCount()
    }
  }
  private getFractionalDigitCount () {
    if (this.instance && _.isFunction(this.instance.getFractionalDigitCount)) {
      this.instance.getFractionalDigitCount()
    }
  }
  private resetDigits () {
    if (this.instance && _.isFunction(this.instance.resetDigits)) {
      this.instance.resetDigits()
    }
  }
  private animateSlide (value: any) {
    if (this.instance && _.isFunction(this.instance.animateSlide)) {
      this.instance.animateSlide(value)
    }
  }
  private update (newVal: any) {
    if (this.instance && _.isFunction(this.instance.update)) {
      this.instance.update(newVal)
    }
  }
  private mounted () {
    this.init()
    setTimeout(() => {
      this.update(this.value)
    }, 100)
  }
  private beforeDestroy () {
    this.uninit()
  }
}
</script>