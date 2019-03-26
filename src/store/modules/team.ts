import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'
import axios from 'axios'

interface IState {
  pagelist: any[]
}
const state: IState = {
  pagelist: []
}

const mutations: MutationTree<IState> = {

}
const actions: ActionTree<IState, any> = {
  async getTeamMember ({}): Promise<any> {
    const res = await httpservice.getTeamMember()
    return res
  },
  async getPageList ({}): Promise<any> {
    const res = await axios.get('/ai/json/team/pageList.json')
    return res
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
