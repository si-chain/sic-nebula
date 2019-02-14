/*
 * @Author: jhd
 * @Date: 2019-01-22 14:04:56
 * @Description: tag store file
 */
import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'
// import { error, success } from '../../utils/notification'
interface IEvent {
  x: string
  y: number
  z: number
}
interface IState {
  daily_event: IEvent[]
}
const state: IState = {
  daily_event: []
}
const actions: ActionTree<IState, any> = {
  async getDailyEvent ({ commit }): Promise<any> {
    const res: Ajax.AjaxResponse = await httpservice.getdaily_event()
    commit('SET_EVENNT', res)
    return res
  }
}
const mutations: MutationTree<IState> = {
  'SET_EVENNT' (state: IState, payload: any[]) {
    state.daily_event = payload
  }
}
export default {
  state,
  actions,
  mutations
}
