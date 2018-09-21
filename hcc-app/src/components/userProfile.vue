<template>
  <div>
    <navBar></navBar>
    <div class="py-5 container boundary">
       
          <div class="userDefaults mt-5">
            <div class="profileImg"><img :src="userDetails.profileImg" alt=""></div>
            <div class="userDetails">
                  <p class="name">{{this.userDetails.name}}</p>
                  <p class="username">@{{this.userDetails.userName}}</p>
                  <p class="bio">{{this.userDetails.bio}}</p>                
                  <p class="email">{{this.userDetails.email}}</p>                
                  <p class="website">{{this.userDetails.website}}</p>
                  <p class="phone">{{this.userDetails.phone}}</p>
              </div>
          </div>
        <div class="updateForm">
          <form action="">
            <input type="password" placeholder="Password"  v-model="password">
              <input type="password" placeholder="Repeat Password"  v-model="rpassword">
              <input type="text" placeholder="Profile Image" v-model="imageUrl">
              <input type="text" placeholder="Website"  v-model="website">
              <input type="text" placeholder="Phone"  v-model="phone">
              <input type="text" placeholder="Bio"  v-model="bio">
              <button class="btn btn-primary" v-on:click.prevent="validateInputs">Update</button>
            </form>
      </div>
    </div>
    <h2 class="container text-center text-capitalize my-3">Posts by {{userDetails.userName}}</h2>
   
    <div class="container posts">
      <div class="post" v-for="(post) in userDetails.posts" :key="post.index">
        <div class="imgDiv"><img :src="post.imageUrl"></div>
        <div class="tags" v-for="tag in post.tags" :key="tag.index">
          <router-link v-bind:to="{ name: 'searchByTag', params: { tag:tag}}" v-if="tag" class="tag">{{tag}}</router-link>
          <!-- <p class="tag" :v-if="tag">{{tag}}</p> -->
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
        password:'',
        rpassword:'',
        website:'',
        phone:'',
        imageUrl:'',
        bio:'',
        userName:''
    };
  },
  components:{
    navBar,
  },
  methods: {
    validateInputs(){
      if(this.password!== this.rpassword)
        alert("Please make sure the passwords match");

      this.updateData();
    },
    updateData(){
      axios.post('/authors/update',{
        userName:this.userDetails.userName,
        website:this.website,
        phone:this.phone,
        bio:this.bio,
        profileImg:this.imageUrl,
        password:this.password
      }).then((res)=>{
        this.update=true;
        this.userDetails = res.data;
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created() {
    this.userName=JSON.parse(localStorage.getItem('userData')).userName;
    axios.get(`/authors/${this.userName}`).then(res => {
        this.userDetails = res.data[0];
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boundary{
  display: grid;
  grid-template-columns: repeat(12,1fr);
  /* grid-column-gap: 4em; */
}

.userDefaults{
  grid-column: span 5;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  box-shadow: 3px 3px 5px 5px rgba(0, 0, 0, 0.5);
}
.profileImg{
  height: auto;
  overflow: hidden;
  z-index:2;
  /* border-radius: 5px; */
  border-radius: 0 0 7px 7px;
}
.profileImg img{
  width: 100%;
  height: 100%;
  transition: all 0.5s;
}
.profileImg:hover img{
  transform: scale(1.1);
  transition: all 0.5s;
  cursor: pointer;
}
.userDetails{
  background: white;
  padding: 5px 15px;
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


.userDefaults:hover .profileImg img{
  /* opacity: 0.5; */
  transition: all 0.5s;
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





h1,h2,h3,h4,h5 {
  font-family: "Lora";
}
.updateForm{
  grid-column: span 7;
  transition: all 0.5;
}
form{
    margin-top: 3em;
    transition:  0.5;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    padding: 8px 10px;
}
form:hover{
  box-shadow: none;
  transition: 0.5s;
}
form input{
    display: block;
    width: 100%;
    margin: 10px 0;
    border-radius: 5px;
    padding: 4px 8px;
    outline: none;
    border: 1px solid;
    transition: all 0.5;
    outline: none;
    font-family: "Poppins";
}

@media (max-width: 1000px){
  .userDefaults{
    grid-column: span 12;
    margin: 2em auto;
  }
  .updateForm{
    grid-column: span 12;
  }
  .posts{
    grid-column: span 12;
  }
}
@media (max-width: 800px){
 .post{
   grid-column: span 12;
 }
}


</style>
