<template>
  <div class="bg">
      <navBar></navBar>
    <div class="container">
        <div class="showcaseTexts ml-3">
            <div class="texts">
                <h3>BlackFeather97</h3>
                <p>Just another Blogging Site</p>
            </div>
        </div>

        <div class="features">
            <div class="feature">
                <div><img src="../../Images/boy.png" alt=""></div>
                <div> <h5>Profile</h5></div>
                <div> <p>Ability to create your own profile including username, email, profile picture. Its totally customizable!</p></div>
            </div>
            <div class="feature">
                <div><img src="../../Images/computer.png" alt=""></div>
                    <div> <h5>Blog</h5></div>
                    <div> <p>Blog posts with the ability to insert pictures and tags for your posts. Able to search posts with certain tags.</p></div>
            </div>
            <div class="feature">
                <div><img src="../../Images/blog.png" alt=""></div>
                <div><h5>Social</h5></div>
                    <div><p>Get to know other users and see what they've been blogging about.View their profile and like their posts. Comment what you think. Become Social.</p></div>
            </div>
             <div class="feature">
                <div><img src="../../Images/shield.png" alt=""></div>
                <div><h5>Security</h5></div>
                    <div><p>Your account passwords are hashed and safely stored on the database, along with all your posts and comments.</p></div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import navBar from '../components/navBar';

export default {
    components:{
        navBar
    }
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .bg{
        height: 100vh;
        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
         url("https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-626650.png");
        background-position: center;
        background-size: cover;
        color: white;
    }
    .features{
        margin-top:9em;
        display: grid;
        grid-template-columns: repeat(12,1fr);
        grid-gap: 1em;
        padding: 5px 10px;
    }
    .feature{
        grid-column: span 3;
    }
    .feature img{
        width: 100px;
        height: 100px;
        margin: 1em 0;
    }
    .showcaseTexts{
        padding-top: 5em;
    }
    h1,h2,h3,h4,h5{
        font-family: "Montserrat";
        font-size: 1.4rem;
    }
    p{
        font-family: "Lora";
        font-size: 0.9rem;
    }

@media (max-width: 1000px){
    .feature{
        grid-column: span 6;
    }
    .bg{
        height: 130vh;
    }
}
@media (max-width: 500px){
    .feature{
        grid-column: span 12;
    }
    .bg{
        height: 230vh;
    }
}
</style>


