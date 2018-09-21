<template>
  <div>
    <navBar></navBar>
    <div class="py-5 container boundary">
        <div class="userDefaults d-flex flex-column">
            <div class="profileImg"><img :src="userDetails.profileImg" alt=""></div>
            <div class="userDetails">
                <p class="name">{{this.userDetails.name}}</p>
                <p class="username">@{{this.userDetails.userName}}</p>
                <p class="email">{{this.userDetails.email}}</p>
                <div v-if="this.userDetails.bio"><p class="bio" >{{this.userDetails.bio}}</p></div>
                <div v-if="this.userDetails.website"><p class="website" >{{this.userDetails.website}}</p></div>
                <div v-if="this.userDetails.phone"><p class="phone" >{{this.userDetails.phone}}</p></div>
                
            </div>
            <!-- <button class="btn btn-success mt-2"  v-on:click.prevent="edit">Edit</button> -->
        </div>
      
    </div>
    <h2 class="container text-center text-capitalize my-3">Posts by {{userDetails.userName}}</h2>
    
    <div class="container posts">
      <div class="post" v-for="(post) in userDetails.posts" :key="post.index">
                  
        <router-link :to="{ name: 'singlePost', params: { title:post._id}}"><div class="imgDiv"><img :src="post.imageUrl"></div>   </router-link> 

        <div class="tags" v-for="tag in post.tags" :key="tag.index">
               <router-link v-bind:to="{ name: 'searchByTag', params: { tag:tag}}" v-if="tag" class="tag">{{tag}}</router-link>
        </div>
        <div class="info">
          <p class="title">{{post.title}}</p>
          <p class="body">{{post.body.slice(0,100)}}</p>
          <p class="date">{{post.date}}</p>
        </div>
      </div>
    </div> 
    
  </div>
</template>

<script>
import navBar from '../components/navBar';
export default {
  data() {
    return {
        userDetails:[],
        userName:''
    };
  },
  components:{
    navBar,
  },
  methods: {
   
  },
  created() {
    this.userName=this.$route.params.userName;
    axios.get(`/authors/${this.userName}`).then(res => {
        this.userDetails = res.data[0];
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boundary{
 /* width: 30%; */
 margin: 0 auto;
}




.userDefaults{
  /* margin-top: 2em; */
  margin: 2em auto;
  box-shadow:4px 4px 5px 5px rgba(0,0,0,0.3);
  width: 70%;
  /* grid-column: span 5; */
  transition: all 1s;
  border-radius: 5px;
}
.userDetails{
  padding: 5px 8px;
  text-align: center;
}
.userDefaults:hover{
    box-shadow:none;
    cursor: pointer;
    transition: all 1s;
}



.name{
  font-family: "Lora";
  text-transform: uppercase;
  font-size: 1.5rem;
  line-height: 2;
}
.username{
  margin-top: -1.5em;
  font-family: "Poppins";
  font-size: 0.8rem;
}

.bio,.email, .website, .phone{
  font-family: "Neuton";
  font-size: 1.2rem;
  color: rgb(119, 116, 116);
    border-bottom: 1px solid lightgray;
   padding: 4px 0;
}

.userDefaults p{
  margin: 5px 0;
}



.profileImg{
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.profileImg img{
  width: 100%;
  border-radius: 5px;
}
.name{
  font-family: "Montserrat";
  font-size: 1.5rem;
  text-transform: uppercase;
}
.bio{
  font-family: "Neuton";
  font-size: 1.2rem;
}
.username{
  color: rgb(3, 3, 145);
  font-family: "Lora";
  font-weight:300;
  /* font-size: 1.5rem; */
}

.posts{
  display: grid;
  grid-template-columns: repeat(12,1fr);
  grid-column-gap: 1em;
}
.post{
  grid-column: span 4;
  margin-bottom: 1em;
  padding-bottom: 10px;
  transition: all 0.5s;
}
.post:hover{
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
}
.info{
  padding: 5px 15px;
}
.title{
  font-family: "Lora";
  font-size: 1.5rem;
  text-transform: capitalize;
}
.body{
  font-family: "Poppins";
  font-size: 0.8rem;
  text-transform: capitalize;
}
.date{
  font-family: "Montserrat";
  font-size: 0.7rem;
}

.imgDiv img{
  width: 100%;
}

.tags{
  display: inline-block;
}
.tag{
  margin: 5px 3px;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
  padding: 3px 4px;
  border-radius: 5px;
  background: lightblue;
  font-family: "Poppins";
  font-size: 0.7rem;
  color:black;
}
.tag:hover{
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 1000px){
  .post{
    grid-column: span 6;
  }
}
@media (max-width: 800px){
  .post{
    grid-column: span 12;
    /* width:100%; */
  }
}

</style>
