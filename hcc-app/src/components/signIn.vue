<template>
  <div class="bg">
      <navBar></navBar>
    <form>
    <p v-if="isError">Provided Email and Password do not match</p>
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label>Email*</label>
      <input type="email" class="form-control" placeholder="Email" required v-model="email">
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label>Password*</label>
      <input type="password" class="form-control" placeholder="Password" required v-model="password">
    </div>
  </div>
  <button class="btn btn-primary" v-on:click.prevent="validateInputs" type="submit">Sign In</button>
</form>

  </div>
</template>

<script>
import navBar from '../components/navBar';

export default {
  data() {
    return {
        email:'',
        password:'',
        isError:false
    };
  },
  components:{
      navBar,
  },
  methods:{
      validateInputs(){
          if(this.email==='' || this.password==='')
            alert('Please Fill All The Necessary Fields');


         this.signIn();
      },
      signIn(){
          axios.post(`/authors/signin`,{
              password:this.password,
              email:this.email
          }).then(res=>{
              window.localStorage.setItem('userData',JSON.stringify(res.data));
            //   console.log(res.data);
              this.$router.push("/profile")
          }) .catch((error)=>{
              this.isError=true;
          }) 
               
      }
  },
  mounted(){
    // console.log(process.env.ROOT_API);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



    form{
        width: 80%;
        margin:3.4em auto 0 auto;
        height: 90vh;
        padding: 8em 3em;
    }
    form input{
      width: 100%;
    }
    .bg{
          /* background: rgb(32, 31, 31); */
          background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
            url("https://images5.alphacoders.com/889/thumb-1920-889632.jpg");
        background-position: center;
        background-size: cover;
          color: white;
          height: 91vh;
          box-shadow: 5px 5px 8px 8px rgb(32, 31, 31);
    }

</style>
