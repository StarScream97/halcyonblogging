<template>
  <div>
        <nav class="navbar navbar-expand-lg navbar-dark  fixed-top">
            <div class="container">
                <router-link to="/" class="navbar-brand">BlackFeather</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navBar">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-if="loggedOut">
                        <router-link to="/posts" class="nav-link">Feeds</router-link>
                    </li>
                    <li class="nav-item" v-if="loggedOut">
                        <router-link to="/posts/add" class="nav-link">Post</router-link>
                    </li> 
                    <li class="nav-item" v-if="!loggedOut">
                        <router-link to="/signin" class="nav-link">Sign In</router-link>
                    </li>
                    <li class="nav-item" v-if="!loggedOut">
                        <router-link to="/signup" class="nav-link">Sign Up</router-link>
                    </li>  
                    <li class="nav-item dropdown" v-if="loggedOut">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Profile
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link v-if="userName" v-bind:to="{ name: 'profile', params: { username:userName}}" class="dropdown-item" href="#">Profile</router-link>
                        <div class="dropdown-divider"></div>
                        <!-- <router-link to="" class="dropdown-item" v-on:click="signOut">Sign Out</router-link> -->
                        <button class="dropdown-item" v-on:click="signOut">Sign Out</button>
                        </div>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link v-bind:to="{ name: 'profile', params: { username:userName}}" class="nav-link">Account</router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link to="/users" class="nav-link" v-if="loggedOut">Users</router-link>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
        userName:'',
        loggedOut:false,
    };
  },
  methods:{
      signOut(){
          localStorage.removeItem('userData');
          this.loggedOut=true;
          this.$router.push("/signin")
      }
  },
  created(){
      if(JSON.parse(localStorage.getItem('userData')).userName){
        this.userName=JSON.parse(localStorage.getItem('userData')).userName;
        this.loggedOut=true;
      }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



.navbar{
background: rgb(14, 13, 13);
  color: white;
  font-family: "Poppins";
}
.nav-link{
    color: white !important;
}
.navbar-brand{
    color: white !important;
}
</style>
