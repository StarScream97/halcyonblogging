<template>
  <div>
    <navBar></navBar>
    <div class="container">
        <div class="post">
          <div class="authorInfo">
               <router-link v-bind:to="{ name: 'singleUser', params: { userName:post.author.userName}}"><img v-if="post.author.profileImg" :src="post.author.profileImg" class="circle" alt=""></router-link>
              <div class="authorDetails">
                <router-link v-bind:to="{ name: 'singleUser', params: { userName:post.author.userName}}" class="authorName">{{post.author.userName}}</router-link>
                  <p class="authorBio">{{post.author.bio}}</p>
              </div>
              
          </div>
          <div class="blogImg">
            <p class="postDate">{{post.date}}</p>
             <img :src="post.imageUrl" alt="">
          </div>
          <div class="blogContents px-3 py-4">
              <h3 class="postTitle">{{post.title}}</h3>
              <p class="postBody">{{post.body}}</p>
              <div class="tags" v-for="tag in post.tags" v-bind:key=tag.index>
                <router-link v-bind:to="{ name: 'searchByTag', params: { tag:tag}}" v-if="tag" class="tag my-2 mr-3">{{tag}}</router-link>
              </div>
          </div>
          <div class="form-row ml-3">
            <div class="col-md-12 mb-3">
              <label>Comment</label>
              <textarea class="form-control" placeholder="Comment" v-model="comment"></textarea>
              <button class="btn btn-success mt-2" v-on:click.prevent="commentOnPost">Comment</button>
            </div>
          </div>

         <h3 class="ml-3">Comments</h3>
         
          <div v-for="comment in post.comments" :key="comment._id" class="ml-3 comments">
              <div v-if="comment" class="comment">
                <router-link :to="{ name: 'singleUser', params: { userName:comment.name}}" class="commenter">{{comment.name}}:</router-link>
                <!-- <p class="commenter">{{comment.name}}:</p> -->
                <p class="ml-2 commentText">{{comment.comment}}</p>
              </div>
              <div v-else><p>No Comments on the Post</p></div>
          </div>
          <div v-for="comment1 in comments23" class="comments" :key="comment1.index">
            <div class="comment ml-3">
              <router-link :to="{ name: 'singleUser', params: { userName:comment1.name}}" class="commenter">{{comment1.name}}:</router-link>
                <p class="ml-2 commentText">{{comment1.comment}}</p>
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
      post: [],
      id:this.$route.params.title,
      comment:'',
      userName:'' ,
      commenter:'',
      comments23:[]     
    };
  },
  components:{
    navBar,
  },
  methods: {
    commentOnPost(){
      axios.post('/posts/post',{
        id:this.post._id,
        name:this.userName,
        comment:this.comment
      }).then(res=>{
          console.log(res);
      }).catch(err=>{
        console.log(err);
      })
     this.comments23.push({
          name:this.userName,
          comment:this.comment
    })
    this.comment='';
    }
  },
  created() {
    axios.get(`${process.env.ROOT_API}/posts/${this.id}`).then(res => {
      this.post = res.data;
    });
    this.userName=JSON.parse(localStorage.getItem('userData')).userName;  
    this.comments23=[]; 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  font-family: "Lora";
}

h1,h2,h3,h4,h5 {
  font-family: "Neuton";
}
.post {
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 75%;
  height: auto; 
  position: relative;
  margin: 5em auto;
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
}
.blogImg {
  position: relative;
  z-index: 3;
  border-radius: 5px;
  /* box-shadow: 0px 21px 28px -15px rgba(15,14,15,1); */
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
.postBody {
  color: rgb(70, 72, 73);
  line-height: 25px;
} 
.tags{
 display: inline-block;
}
.tag{
  color: black !important;
  background: lightgray;
  padding: 3px 10px;
  border-radius: 7px;
  box-shadow: 2px 2px 1px 1px rgb(90, 88, 88);
}
.tag:hover{
  text-decoration: none;
}

.comment{
    padding: 8px 10px;
    margin: 5px 0;
    box-shadow: 3px 3px 3px 3px rgba(0,0,0,0.5);
    border-radius: 5px;
    display: flex;
}
.commentText{
    font-family: "Roboto Condensed";
    font-size: 0.8rem;
    margin: auto 0;
}
.commenter{
  font-family: "Lora";
  font-size: 1.2rem;
  margin: auto 0;
}

</style>
