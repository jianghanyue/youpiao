<template>
  <div class="home">
    <div class="yonghu">
      <input type="text" v-model="message">
      <button type="button" @click="handleSubmit">创建用户</button>
      <div class="username">
        用户名：{{ this.username }}
        <a href="javascript:;"
        v-bind:class="[ this.username ? activeClass : 'aaa' ]"
        @click="handleOutClick"
        >退出</a>
      </div>
    </div>
    <ul>
      <li v-for="comment in comments">
        <h1 class="names">
          {{ comment.name }}
        </h1>
        <div class="pic" v-bind:style="{backgroundImage:`url(${comment.pic})`}">
        </div>
        <div class="like-peop">
          <span  v-for="commen in comment.like">
            {{ commen.name }}
          </span>
        </div>
        <div class="like">
          <button v-bind:class="[ comment.completed ? 'color like-y' : 'like-y' ]" @click="() => handleClick(comment.completed,comment.id)">
            {{comment.completed ? "已投" : "喜欢"}}
          </button>
        </div>
      </li>
    </ul>
    <div class="piao" @click="handleTouSubmit">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    comments: function () {
        return this.$store.state.comment.all
     }
  },
  methods: {
    handleClick: function (com,id) {
        if(com === false){
          this.$store.dispatch({ type: 'PUT_COMMENT', like: this.username,id: id })
          this.$store.dispatch({ type: 'ADD_TOUPIAO', id: id,username: this.username })
        }
    },
    handleOutClick: function () {
      this.username = ""
      this.$store.dispatch('FETCH_COMMENTS')
      window.localStorage.removeItem('username')
    },
    handleSubmit: function () {
      this.username = this.message
      window.localStorage.removeItem('username')
      window.localStorage.setItem('username',this.username)
      if(this.$store.state.yonghu.all.find( t => t.name == this.username )){
        this.$store.state.yonghu.all.find( t => t.name == this.username ).tou.map( re => {
          const id = this.$store.state.comment.all.find( val => val.id == re.toupiaoId ).id
          this.$store.commit({ type: 'LOAD_COMMENT', id: id })
        })
      }else{
        this.$store.dispatch({ type: 'ADD_USERNAME',username: this.username })
      }
      this.message = ""
    },
    handleTouSubmit: function () {
      console.log(this.$store.state.comment.alls)
      this.$store.dispatch({ type: 'ADD_COMMENT', all: this.$store.state.comment.alls })
    }
  },
  created: function () {
      console.log(this.$store.state.comment.all.length);
      if(window.localStorage.getItem('username')){
        const lname = window.localStorage.getItem('username')
        this.username = lname
        if(this.$store.state.comment.all.length !== 0){
          console.log(11);
          if(this.$store.state.yonghu.all.find( t => t.name == lname )){
            this.$store.state.yonghu.all.find( t => t.name == lname ).tou.map( re => {
              const id = this.$store.state.comment.all.find( val => val.id == re.toupiaoId ).id
              this.$store.commit({ type: 'LOAD_COMMENT', id: id })
            })
          }
        }
      }
  },
  data: () => ({
    message: '',
    username: '',
    activeClass: 'display aaa'
  })
}
</script>

<style>
  .like-peop{
    width: 200px;
    margin: 10px auto;
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
  }
  .like-peop>span{
    padding: 3px;
    background-color: yellow;
    margin-right: 7px;
    margin-top: 5px;
  }
  .home .color{
    background-color: #878787;
  }
  .yonghu{
    width: 255px;
    margin: 0 auto;
  }
  .username{
    text-align: center;
  }
  .piao{
    width: 200px;
    margin: 0 auto;
    line-height: 40px;
    border-radius: 20px;
    background-color: yellow;
    text-align: center;
    margin-top: 20px;
  }
  .yonghu{
    margin-bottom: 5px;
  }
  .home ul{
    width: 100%;
    display: flex;
    padding: 0;
    margin: 0;
  }
  .home li{
    list-style: none;
    padding: 10px;
    width: 225px;
    background-color: #e1f5fe;
    margin: 0 5px;
  }
  .home li h1{
    margin-bottom: 10px;
    margin-top: 0px;
    text-align: center;
    font-size: 24px;
    color: #e91e63;
  }
  .pic{
    width: 200px;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 300px;
    margin: 0 auto;
  }
  .like{
    display: flex;
    width: 200px;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 10px;
  }
  .like-y{
    width: 100%;
    background-color: #ff1744;
    font-size: 14px;
    padding: 10px;
    border: 0;
    outline: 0;
    text-align: center;
    color: #fff
  }
  .aaa{
    display: none;
  }
  .home .display{
    display: block;
    text-decoration: none;
    text-align: center;
  }
  .yonghu{
    height: 80px;
  }
</style>
