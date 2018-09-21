<template>
  <div class="bg">
      <navBar></navBar>
    <form>
  <div class="form-row">
    <div class="col-md-4 col-sm-12 mb-3">
      <label>Full name*</label>
      <input type="text" class="form-control" placeholder="Full name" required v-model="name">
    </div>
    <div class="col-md-4 col-sm-12 mb-3">
      <label>Email*</label>
      <input type="email" class="form-control" placeholder="Email" required v-model="email">
    </div>
    <div class="col-md-4 col-sm-12 mb-3">
      <label>Username*</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Username" required v-model="username">
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 col-sm-12 mb-3">
      <label>Password*</label>
      <input type="password" class="form-control" placeholder="Password" required v-model="password">
    </div>
    <div class="col-md-6 col-sm-12 mb-3">
      <label>Repeat Password*</label>
      <input type="password" class="form-control" placeholder="Repeat Password" required v-model="rpassword">
    </div>
   
  </div>
    <div class="form-row">
       <div class="col-md-12 col-sm-12 mb-3">
      <label>Profile Image</label>
      <input type="text" class="form-control" placeholder="Profile Image URL" v-model="imageUrl">
    </div>
    </div>
  <div class="form-row">
    <div class="col-md-12 col-sm-12 mb-3">
      <label>Bio*</label>
      <input type="text" class="form-control" placeholder="A short Bio of Yourself" required v-model="bio">
    </div>
</div>
<div class="form-row">
    <div class="col-md-6 col-sm-12 mb-3">
      <label>Website</label>
      <input type="text" class="form-control" placeholder="Website" required v-model="website">
    </div>
    <div class="col-md-6 col-sm-12 mb-3">
      <label>Phone</label>
      <input type="text" class="form-control" placeholder="Phone" v-model="phone">
    </div>
  </div>
  <button class="btn btn-primary" v-on:click.prevent="validateInputs" type="submit">Sign Up</button>
</form>

  </div>
</template>

<script>
import navBar from '../components/navBar';

export default {
  data() {
    return {
        name:'',
        email:'',
        password:"",
        rpassword:'',
        bio:'',
        imageUrl:'',
        username:'',
        phone:'',
        website:''
    };
  },
  components:{
      navBar,
  },
  methods:{
      validateInputs(){
          if(this.name==='' || this.email==='' || this.password===''|| this.rpassword==='' || this.bio==='')
            alert('Please Fill All The Necessary Fields');

        if(this.password!==this.rpassword)
            alert('Please make sure the passwords match');

         this.signUp();
      },
      signUp(){
          axios.post('/authors',{
              name:this.name,
              userName:this.username,
              profileImg:this.imageUrl,
              bio:this.bio,
              website:this.website,
              phone:this.phone,
              password:this.password,
              email:this.email
          }).then(res=>{
              window.localStorage.setItem('userData',JSON.stringify(res.data));
              console.log(res.data);
              this.$router.push("/posts")
          }) .catch(function (error) {
                 console.log(error);
          });

       

               
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    form{
        width: 70%;
        margin:0 auto 2em auto;
        height: 90vh;
        padding:5em 3em 1em 3em;
    }
    .bg{
      height: 100vh;
        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
            url("https://images8.alphacoders.com/906/thumb-1920-906880.jpg");
        background-position: center;
        background-size: cover;
          /* background: rgb(32, 31, 31); */
          color: white;
          /* height: 91vh; */
          box-shadow: 5px 5px 8px 8px rgb(32, 31, 31);
    }

    @media (max-width: 1000px){
      form{
        width: 100%;
      }
      .bg{
        height: 160vh;
      }
    }

</style>
