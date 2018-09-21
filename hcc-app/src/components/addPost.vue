<template>
  <div class="bg">
      <navBar></navBar>
      <div v-if="!isLoggedIn">
          <h3>You have to Login or SignUp first to post!</h3>
      </div>
        <form class="container">
            <div class="form-group">
                <label for="postTitle">Title*</label>
                <input type="text" class="form-control" id="postTitle" placeholder="Title" v-model="title">
            </div>

            <div class="form-group">
                <label for="postContents">Contents*</label>
                <textarea class="form-control" id="postContents" rows="3" placeholder="Contents" v-model="contents"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image URL</label>
                <input type="text" class="form-control" id="imageUrl" placeholder="Image URL" v-model="imageUrl">
            </div>
            <div class="form-group">
                <label for="tags">Tags</label>
                <input type="text" class="form-control" id="tags" placeholder="Tags (separated by comma)" v-model="tags">
            </div>
            <div class="form-group">
                <label for="author">Username</label>
                <input type="text" class="form-control" id="author" placeholder="Username" disabled v-model="userName">
            </div>
            <button type="submit" class="btn btn-primary mb-2" v-on:click.prevent="validateInputs">Add Post</button>
        </form>
  </div>
</template>

<script>
import navBar from '../components/navBar';
export default {
  data() {
    return {
        title:'',
        contents:'',
        imageUrl:"",
        tags:[],
        userName:'',
        isLoggedIn:false
    };
  },
  components:{
      navBar,
  },
  methods:{
      validateInputs(){
          if(this.title==='' || this.contents==='')
           return alert('Please Fill All The Necessary Fields');

         this.tags=this.tags.split(',');
         if(this.tags.length>5)
           return alert('Please include only upto 5 tags');
            
         this.addPost();
      },
      addPost(){
        //   axios.post(`${process.env.ROOT_API}/posts/`,{
          axios.post('/posts',{
              title:this.title,
              body:this.contents,
              imageUrl:this.imageUrl,
              tags:this.tags,
              userName:this.userName
          }).then(res=>{
              console.log(res);
              this.$router.push("/posts")
          }) .catch(function (error) {
                 console.log(error);
          });

        this.title='';
        this.contents='';
        this.imageUrl='';
        this.userName='';
        this.tags='';

     
      }
  },
  created(){
      if(JSON.parse(localStorage.getItem('userData')).userName){
        this.userName=JSON.parse(localStorage.getItem('userData')).userName;
        this.isLoggedIn=true;
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    form{
        width: 60%;
        /* margin:6em auto 0 auto; */
        margin: 3em auto 0 auto;
        padding: 2em 0;
    }
    .bg{
          background: rgb(32, 31, 31);
          color: white;
          /* height: 100vh; */
    }

    textarea{
        height: 150px;
    }

</style>
