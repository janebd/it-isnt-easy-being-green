module.exports = `
<head>
  <title>404 page not found | Aero Bot List</title>
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
<script  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js"></script>
  
<!-- styling -->
  
<style>
  body {
    background-color: orange;
  }

.card{
    margin-bottom: 15px;
}
  


.collapse.in{
    display:block !important;
    float: top;
    width: 100%;
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
 .under {
text-align: center;
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
<li class="nav-item">
<a class="nav-link" href="/">Home</a>
</li>
<li class="nav-item active">
<a class="nav-link" href="/addbot">Add Bot</a>
</li>
<li class="nav-item active">
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
<iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" style="display: none;"></iframe>  
  <section class="hero">

    <div class="hero-content">
      <h1>OOPS! You requested a page that didnt exist! </h1>
        <img src="https://mcfacts.xyz/Images/aerobotlistlogo.png" style="border-radius:50%;" height="125px">
        <br />
       <h1 class="hero-title" style="font-size: 164px;">
          404
       </h1>
         <div class="under">
          <p>Can not find page requested
</p>
       <a class="btn btn-primary" href="https://aerobotlist.com" role="button">Go Back Home</a>
    
    </div>
  </section>


<script>
function isHTML(str) {
  var a = document.createElement('div');
  a.innerHTML = str;

  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true; 
  }

  return false;
}
function getSelectedOptions(sel, fn) {
    var opts = [], opt;
    
    // loop through options in select list
    for (var i=0, len=sel.options.length; i<len; i++) {
        opt = sel.options[i];
        
        // check if selected
        if ( opt.selected ) {
            // add to array of option elements to return from this function
            opts.push(opt.innerText);
            
            // invoke optional callback function if provided
            if (fn) {
                fn(opt);
            }
        }
    }
    
    // return array containing references to selected option elements
    return opts;
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
if(getCookie("access_token") == undefined)return window.location.href = "/login"
        document.getElementById("{{library}}").selected = "selected"
        let categories = {{category}}

        for(i in categories){
            document.getElementById(categories[i]).selected = "selected"
          
        }


       if(url.searchParams.has("username") && url.searchParams.has("avatar") && url.searchParams.has("discriminator") && url.searchParams.has("id")){
        setCookie("username", url.searchParams.get("username"), 3)
        setCookie("discriminator", url.searchParams.get("discriminator"), 3)
        setCookie("avatar", url.searchParams.get("avatar"), 3)
        setCookie("id", url.searchParams.get("id"), 3)
        window.history.pushState({}, document.title, "/");
       }
     if(getCookie("username") !== undefined && getCookie("username") !== null){
       
        document.getElementById("profile").className = "nav-item dropdown"
        if(getCookie("avatar") !== undefined && getCookie("avatar") !== null){
        document.getElementById("profile").innerHTML = '<a class="nav-link" href="/users/' + getCookie("id") + '"><img height="25px" src=' + getCookie("avatar") + ' style="border-radius: 50%; margin: 0px 5px;">' + getCookie("username") + "#" + getCookie("discriminator") + "</a>"
        }
        document.getElementById("profiledata").innerHTML += '<li class="nav-item" id="profile"><a onclick="logout()" href="#" class="nav-link"><span class="glyphicon glyphicon-log-in"></span>Logout</a></li>'
        
     }else{
        window.location.href = "/login"
      }
  }
</script>
`
