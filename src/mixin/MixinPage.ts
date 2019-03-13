/*
 * @Author: jhd
 * @Description: pageMixin file content
 * @Date: 2019-02-27 19:15:47
 */

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PageMixin extends Vue {
  private form: any
  private isLoading: boolean = false
  private current: number = 1
  private pageSize: number = 10
  private pageOptions: any = {
    current: 1,
    size: 10,
    total: 0,
    records: []
  }
  private getList: any
  private delete: any = undefined
  public async handleGetList (current: number, pageSize: number) {
    this.isLoading = true
    const data = await this.getList({
      current: current || 1,
      size: pageSize || this.pageSize
    }, this.form)
    this.isLoading = false
    this.pageOptions = data
  }
  public async handlePageChange (current: number, pageSize: number) {
    await this.handleGetList(current, pageSize)
  }
}
