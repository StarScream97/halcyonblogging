<template>
  <div>
    <navBar></navBar>
    <div class="container blogContainer bg">
      <!-- <form class="mt-3 mb-1" id="search">
          <div class="form-group">
              <input type="text" class="form-control"  placeholder="Search" v-model="search">
          </div>
      </form> -->

      <div id="posts" v-for="post in allPosts.slice().reverse()" v-bind:key=post._id>
        <div class="post my-5">
          <div class="authorInfo">
               <router-link v-bind:to="{ name: 'singleUser', params: { userName:post.author.userName}}"><img :src="post.author.profileImg" class="circle" alt=""></router-link>
              <div class="authorDetails">
                <!-- <router-link to="/user/" class="authorName">{{post.author.userName}}</router-link> -->
                <router-link v-bind:to="{ name: 'singleUser', params: { userName:post.author.userName}}" class="authorName">{{post.author.userName}}</router-link>

                  <p class="authorBio">{{post.author.bio}}</p>
              </div>
              
          </div>
          <div class="blogImg">
            <p class="postDate">{{post.date}}</p>
            <router-link v-bind:to="{ name: 'singlePost', params: { title:post._id}}"> <img :src="post.imageUrl" alt=""></router-link>
          </div>
          <div class="blogContents px-3 py-4">
             <router-link :to="{ name: 'singlePost', params: { title:post._id}}"><h3 class="postTitle">{{post.title}}</h3></router-link> 
              <p class="postBody">{{post.body.slice(0,200)+'...'}}<router-link v-bind:to="{ name: 'singlePost', params: { title:post._id}}"  class="readMore">Read More</router-link></p>
              <div class="tags" v-for="tag in post.tags" v-bind:key=tag.index>
                <router-link v-bind:to="{ name: 'searchByTag', params: { tag:tag}}" v-if="tag" class="tag my-2">{{tag}}</router-link>
              </div>
          </div>
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
      allPosts: [],
      search:''
    };
  },
  components:{
    navBar,
  },
  methods: {
   
  },
  created() {
    if(!JSON.parse(localStorage.getItem('userData'))){
        this.$router.push('/signin');
      }
    axios.get('/posts').then(res => {
      this.allPosts=res.data;
    });


  },
  mounted(){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .bg{
  background: rgb(32, 31, 31); 
   color: white;
} */
p {
  font-family: "Lora";
}

h1,h2,h3,h4,h5 {
  font-family: "Neuton";
}
.readMore{
  text-transform: uppercase;
  color: rgb(23, 23, 44);
  font-weight: bold;
}
.readMore:hover{
  text-decoration: none;
}

#search {
  width: 75%;
  margin: 0 auto;
}
#posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.post {
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 75%;
  height: auto; 
  position: relative;
}
.authorInfo{
  display: flex;
  margin-bottom: 5px;
}

.circle {
  width: 55px;
  height: 50px;
  -webkit-border-radius: 27px;
  -moz-border-radius: 27px;
  border-radius: 27px;
  }
.authorDetails{
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  margin-top: -0.5em;
}
.authorName{
  font-family: "Montserrat";
  font-size: 1.5rem;
  display: inline-block;
  color: black;
  margin-bottom: 20px;
}
.authorName:hover{
  text-decoration: none;
  cursor: pointer;
}
.authorBio{
  font-family: "Poppins";
  font-size: 0.8rem;
  margin-top: -1.4em;
  display: inline-block;
}
.authorImg img{
  width: 100%;
  height: auto;
}

.blogImg img {
  width: 100%;
  height: auto;
  border-radius: 5px;
    transition: all 0.5s;
}
.blogImg img:hover{
  transform: scale(1.1);
  transition: all 0.5s;
}
.blogImg {
  position: relative;
  z-index: 3;
  border-radius: 5px;
  /* box-shadow: 0px 21px 28px -15px rgba(15,14,15,1); */
  box-shadow: 0 5px 20px rgba(15, 14, 15, 0.3), 0 3px 12px rgba(15, 14, 15, 1);
  overflow: hidden;
}
.blogContainer{
  width: 70%;
  margin: 0 auto;
}
.blogContents {
  width: 96%;
  background: rgb(250, 248, 248);
  border-radius: 4px;
  padding-top: 2em;

  margin: -1em auto;
  box-shadow: 0 5px 20px rgba(15, 14, 15, 0.3), 0 3px 12px rgba(15, 14, 15, 1);
}
.postDate {
  position: absolute;
  top: 1em;
  right: 0;
  background: rgb(245, 232, 232);
  color: black;
  padding: 5px 7px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.postTitle {
  color: rgb(20, 14, 14);
}

.postTitle:hover{
  text-decoration: none;
  cursor: pointer;
}
.postBody {
  color: rgb(70, 72, 73);
  line-height: 25px;
} 
.tags{
 display: inline-block;
}
.tag{
  margin:5px 10px 5px 0;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
  padding: 3px 6px;
  border-radius: 5px;
  background: lightblue;
  font-family: "Poppins";
  font-size: 0.7rem;
  color:black;
}
.tag:hover{
  text-decoration: none;
}

@media (max-width:700px){
  .blogContainer{
    width: 100%;
  }
  .post{
    width:100%;
  }
}
</style>
