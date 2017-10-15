import axios from 'axios'

const state = {
  all: [],
  alls: [],
}

const mutations = {
  'PUT_COMMENT' (state,{ comments,id,like }) {
    let xiugaicai = state.all.find( t => t.id == id )
    xiugaicai.like = [...xiugaicai.like,{ name:like }]
    xiugaicai.completed = true
  },
  'LOAD_COMMENT' (state,{ id }) {
    let xiugaicai = state.all.find( t => t.id == id )
    console.log('666');
    xiugaicai.completed = true
  },
  'LOAD_COMMENTS' (state, { comments }) {
    state.all = comments
    state.alls = comments
    console.log(state.all.length)
  }

}

const actions = {
  'PUT_COMMENT' ({ commit },{ like,id } ) {
    console.log(state);
    axios.get("http://localhost:3012/toupiao").then( d => {
      console.log(d.data);
      const comments = d.data
      let xiugaicai = d.data.find( t => t.id == id )
      xiugaicai.like = [...xiugaicai.like,{ name:like }]
      commit('PUT_COMMENT', { comments,id,like })
      axios.put(`http://localhost:3012/toupiao/${id}`, { ...xiugaicai,like:xiugaicai.like})
        .then( res => {

        })
    })

  },
  'ADD_COMMENT' ({ commit },{ all }) {
    console.log("66",{all});
    axios.put(`http://localhost:3012/toupiao`, all ).then( res => {
      console.log(res.data);
    })
  },
  'FETCH_COMMENTS' ({ commit }) {
    axios.get(`http://localhost:3012/toupiao`)
      .then( res => {
        const comments = res.data
        commit('LOAD_COMMENTS', { comments })
      })
  }
}

export default {
  state,
  mutations,
  actions
}
