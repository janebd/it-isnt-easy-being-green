module.exports = `
<head>
  <title>Search | {{searchparams}} | Aero Bot List</title>
  <link rel="icon" type="image/png" href="https://mcfacts.xyz/Images/aerobotlistlogo.png" />
  <meta name="description" content="Aerobot List is the choice botlist for you to grow your bot.">
  <meta name="keywords" content="Aero Bot List, Discord, Daylight">
  <meta name="author" content="Aero Bot List">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#87ceeb">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script type="text/javascript" src="https://cookieconsent.popupsmart.com/src/js/popper.js"></script><script> window.start.init({Palette:"palette6",Mode:"banner bottom",Theme:"edgeless",LinkText:"Read This",Time:"5",})</script>
 
<!--  bootstrap style -->
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.5.1/css/bootstrap.min.css" rel="stylesheet">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"> </script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
  
  
<!-- styling -->
  
<style>
  body {
    background-color: #87ceeb;
  }



.collapse.in{
    display:block !important;
    float: top;
    width: 100%;
}

.card{
    margin-bottom: 15px;
}

.card:hover{
     transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
  cursor: pointer;
}
  
  hr {
    color: #black;
  }
  
  html {
  
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    padding: 0;
}
.hero {
    position: relative;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    filter: brightness(60%);
}
.hero-content {
    position: relative; 
    font-family: "Monserrat", sans-serif;
    color: white;
    text-align: center;
    margin: 0.625rem;
}
.hero-title {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 0;
    color: black;
}
.hero-subtitle {
    font-size: 2rem;
    font-weight: 200;
    margin-top: 1rem;
    color: black;
}
  
  .hero-button {
    background-color: #ae2d59;
    color: white;
    border: 1px solid #cb376a;
    margin-top: 5rem;
    padding: 0.9375rem 1.875rem;
    font-family: "Monserrat", sans-serif;
    font-size: 1.125rem;
    font-weight: 200;
    cursor: pointer;
}
.hero-button:hover {
    background-color: #cb376a;
    border: 1px solid #db7598;
}

* {
  margin: 0;
  padding: 0;
}

.hero {
  background: linear-gradient(#87ceeb, orange);
  height: 95vh;
}
  
  .featured {
    width: 100%;
  }

.searchbar{
    margin-bottom: auto;
    margin-top: auto;
    height: 60px;
    background-color: #353b48;
    border-radius: 30px;
    padding: 10px;
    }
    .search_input{
    color: white;
    border: 0;
    outline: 0;
    background: none;
    width: 0;
    caret-color:transparent;
    line-height: 40px;
    transition: width 0.4s linear;
    }
    .searchbar:hover > .search_input{
    padding: 0 10px;
    width: 450px;
    caret-color:red;
    transition: width 0.4s linear;
    }
    .searchbar:hover > .search_icon{
    background: white;
    color: #e74c3c;
    }
    .search_icon{
    height: 40px;
    width: 40px;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color:white;
    text-decoration:none;
    }
</style>
 </head>


<body>
  
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="/">
<img src="https://mcfacts.xyz/Images/aerobotlistlogo.png" height="30px" width="30px">
</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNavDropdown">
<ul class="navbar-nav" id="nav">
<li class="nav-item active">
<a class="nav-link" href="/">Home</a>
</li>
<li class="nav-item">
<a class="nav-link" href="/addbot">Add Bot</a>
</li>
<li class="nav-item">	
	<a class="nav-link" href="/faq">FAQ</a>
</li>
</ul>
<ul class="nav navbar-nav ml-auto" id="profiledata">
<li class="nav-item" id="profile">
<a onclick="login()" href="#" class="nav-link"><span class="glyphicon glyphicon-log-in"></span> Login With Discord</a>
</li>
</ul>
</div>
</nav>
  
  <section class="hero">

    <div class="hero-content">
        <img src="https://mcfacts.xyz/Images/aerobotlistlogo.png" style="border-radius:50%;" height="125px">
        <br />
       <h1 class="hero-title">
  
            Search Result for {{searchparams}}
       </h1>
         
       <h2 class="hero-subtitle">
            Top Bots Found for You Associated with {{searchparams}}
       </h2>
         
    <div class="container">
      <div class="d-flex justify-content-center">
       <div class="searchbar">
          <input autocomplete="off" class="search_input" type="search" name="query" id="searchquery" placeholder="Search for..." value="{{searchparams}}">
          <a href="#" onclick="searchbot()" class="search_icon"><i class="fas fa-search"></i></a>
        </div>
        </div>
    </div>
    
    </div>
  </section>
    

  

<div class="featured text-center" id="result" >
  <br />
  <br />
  <h1>Search Result</h1>
  <br />

<div class="row justify-content-center mx-auto" id="topvotedbots" style="width: 75%;">
{{result}}
</div>


</div>
</div>




<footer class="page-footer font-small blue">

  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">&copy; 2020 Copyright Aero Bot List
  </div>
  <!-- Copyright -->

</footer>


<script>
function searchbot(){
  if(document.getElementById("searchquery").value == "")return;
  window.location.href = "https://aerobotlist.com/search?q=" + document.getElementById("searchquery").value
}


  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
  
function login(){
  window.location.href="/login"
}
  
 function logout(){
  eraseCookie("username")
  eraseCookie("discriminator")
  eraseCookie("id")
  eraseCookie("avatar")
  eraseCookie("access_token")
  window.location.reload()
}
  
  let url = new URL(window.location.href)
  window.onload = function(){
       if(url.searchParams.has("username") && url.searchParams.has("avatar") && url.searchParams.has("discriminator") && url.searchParams.has("id")){
        setCookie("username", url.searchParams.get("username"), 3)
        setCookie("discriminator", url.searchParams.get("discriminator"), 3)
        setCookie("avatar", url.searchParams.get("avatar"), 3)
        setCookie("id", url.searchParams.get("id"), 3)
        setCookie("access_token", url.searchParams.get("access_token"), 3)
        window.history.pushState({}, document.title, "/");
       }
     if(getCookie("username") !== undefined && getCookie("username") !== null){
       
        document.getElementById("profile").className = "nav-item dropdown"
        if(getCookie("avatar") !== undefined && getCookie("avatar") !== null){
        document.getElementById("profile").innerHTML = '<a class="nav-link" href="/users/' + getCookie("id") + '"><img height="25px" src=' + getCookie("avatar") + ' style="border-radius: 50%; margin: 0px 5px;">' + getCookie("username") + "#" + getCookie("discriminator") + "</a>"
        }
        document.getElementById("profiledata").innerHTML += '<li class="nav-item" id="profile"><a onclick="logout()" href="#" class="nav-link"><span class="glyphicon glyphicon-log-in"></span>Logout</a></li>'
        
     }
  }
</script>
`
