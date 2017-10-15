import axios from 'axios'

const state = {
  all: []
}

const mutations = {
  'ADD_YONGHU' (state, { com }) {
    state.all = com
  },
  'ADD_TOUPIAO' (state, { newall }) {
    state.all = newall
  }
}

const actions = {
  'ADD_YONGHU' ({ commit }) {
    axios.get(`http://localhost:3012/yonghu`)
      .then( res => {
        const com = res.data
        commit('ADD_YONGHU', { com })
      })
  },
  'ADD_TOUPIAO' ({ commit },{ id,username }) {
    axios.get('http://localhost:3012/yonghu').then( all => {
      let newall = all.data
      const yonghuxinxi = newall.find( t => t.name == username )
      console.log(yonghuxinxi);
      commit('ADD_TOUPIAO', { newall })
      axios.put(`http://localhost:3012/yonghu/${yonghuxinxi.id}`, { ...yonghuxinxi,tou: [...yonghuxinxi.tou,{toupiaoId: id}] })
        .then( res => {
        })
    })
  },
  'ADD_USERNAME' ({ commit },{ username }) {
    axios.post('http://localhost:3012/yonghu', {
      name: username,
      tou: []
    }).then( res => {

    })
  }
}

export default {
  state,
  mutations,
  actions
}
