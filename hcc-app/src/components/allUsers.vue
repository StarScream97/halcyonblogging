<template>
  <div>
    <navBar></navBar>
    <div class="container">
      <div class="grids">
          <div v-for="user in users" class="user" :key="user.index">
              <div class="profileImg"><router-link v-bind:to="{ name: 'singleUser', params: { userName:user.userName}}" class="authorName"><img :src="user.profileImg" alt=""></router-link></div>
              <div class="userDetails">
                  <p class="name">{{user.name}}</p>
                  <p class="username">@{{user.userName}}</p>
                  <p class="email">{{user.email}}</p>
                  <div v-if="user.bio"><p class="bio" >{{user.bio}}</p></div>
                  <div v-if="user.website"><p class="website" >{{user.website}}</p></div>
                  <div v-if="user.phone"><p class="phone" >{{user.phone}}</p></div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar";
export default {
  data() {
    return {
      users: [],
      userName: ""
    };
  },
  components: {
    navBar
  },
  methods: {},
  created() {
    axios.get('/authors').then(res => {
      this.users = res.data;
      // console.log(res.data);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grids {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 70px;
  grid-gap: 1em;
  margin: 6em 0;
}
.user {
  grid-column: span 4;
  grid-row: span 7;
  transition: all 1s;
  border-radius: 5px;
   margin-top: 2em;
  box-shadow:4px 4px 5px 5px rgba(0,0,0,0.3);
}

.user:hover{
  box-shadow: none;
  cursor: pointer;
    transition: all 1s;
}

.userDetails{
  padding: 15px 15px;
}

.name {
  font-family: "Lora";
  text-transform: uppercase;
  font-size: 1.5rem;
  line-height: 2;
}
.username {
  margin-top: -1.5em;
  font-family: "Poppins";
  font-size: 0.8rem;
}

.bio,
.email,
.website,
.phone {
  font-family: "Neuton";
  font-size: 1.2rem;
  color: rgb(119, 116, 116);
  border-bottom: 1px solid lightgray;
  padding: 4px 0;
}

.userDetails p {
  margin: 4px 0;
}

.profileImg {
  width: 100%;
  border-radius: 5px;
}
.profileImg img {
  width: 100%;
  min-height: 250px;
  border-radius: 5px;
}
.name {
  font-family: "Montserrat";
  font-size: 1.5rem;
  text-transform: uppercase;
}
.bio {
  font-family: "Neuton";
  font-size: 1.2rem;
}
.username {
  color: rgb(3, 3, 145);
  font-family: "Lora";
  font-weight: 300;
  /* font-size: 1.5rem; */
}

.info {
  padding: 5px 15px;
}
.title {
  font-family: "Lora";
  font-size: 1.5rem;
  text-transform: capitalize;
}
.body {
  font-family: "Poppins";
  font-size: 0.8rem;
  text-transform: capitalize;
}
.date {
  font-family: "Montserrat";
  font-size: 0.7rem;
}

.imgDiv img {
  width: 100%;
}

.tags {
  display: inline-block;
}
.tag {
  margin: 5px 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 3px 4px;
  border-radius: 5px;
  background: lightblue;
  font-family: "Poppins";
  font-size: 0.7rem;
  color: black;
}
.tag:hover {
  text-decoration: none;
  cursor: pointer;
}


@media (max-width: 1000px){
  .user{
    grid-column: span 6;
  }
}
@media (max-width: 800px){
  .user{
    grid-column: span 12;
    /* width:100%; */
  }
}


</style>
