import { ActionTree, GetterTree, MutationTree } from 'vuex'
import AuthenticateFormDTO from '~/models/AuthenticateFormDTO'

export const state = () => ({
    email: '',
    profiles: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    email: state => state.email,
    profiles: state => state.profiles
}

export const mutations: MutationTree<RootState> = {
    SET_USER: (state: any, response: any) => {
      state.email = response.email
      state.profiles = response.profiles
    }
}

export const actions: ActionTree<RootState, RootState> = {
  loginUser({state, commit}, user: AuthenticateFormDTO) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('http://localhost:8080/auth', {
      email: user.email,
      senha: user.password
    }).then( resp => {
        window.localStorage.setItem('Authorization', resp.string + ': ' + resp.token)
        commit('SET_USER', {
            email: user.email,
            profiles: []
        })
        resolve(resp.token)
      }).catch( error => {
        commit('SET_USER', {
            email: user.email,
            profiles: []
        })
        reject(error)
      }
      )
    })
  }
}
