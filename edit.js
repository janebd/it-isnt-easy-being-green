module.exports = `
<head>
  <title>Edit Bot | {{bottag}} | Aero Bot List</title>
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



.collapse.in{
    display:block !important;
    float: top;
    width: 100%;
}

.card{
    margin-bottom: 15px;
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
<iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" style="display: none;"></iframe>  
  <section class="hero">

    <div class="hero-content">
        <img src="https://mcfacts.xyz/Images/aerobotlistlogo.png" style="border-radius:50%;" height="125px">
        <br />
       <h1 class="hero-title">
  
            Edit {{bottag}}
       </h1>
         
       <h2 class="hero-subtitle">
          {{shortdescription}}
       </h2>
         
       <a class="btn btn-primary" href="#submission" role="button">Start</a>
    
    </div>
  </section>
    

  

<div class="featured text-center" id="submission" >
<br>
<br>
<div class="card mx-auto" style="width: 75%;">
  <div class="card-header">
    Edit Bot
  </div>
<br>
<br>
<form autocomplete="off" style="width: 75%;" class="mx-auto" target="dummyframe">
    <label for="clientid">Client ID(Read Only)</label>
    <br>
    <input type="number" name="clientid" id="clientid" placeholder="772298155168628777" value="{{botid}}" readonly>
    <br>
    <label for="library">Library(Required)</label>
    <br>
  <select name="library" id="library" value="{{library}}">
    <option id="none" value="none">Select One</option>
    <option id="discordcr" value="discordcr">discordcr</option>
    <option id="Nyxx" value="Nyxx">Nyxx</option>
    <option id="Discord.Net" value="Discord.Net">Discord.Net</option>
    <option id="DSharpPlus" value="DSharpPlus">DSharpPlus</option>
    <option id="DiscordGo" value="DiscordGo">DiscordGo</option>
    <option id="Discord4J" value="Discord4J">Discord4J</option>
    <option id="JavaCord" value="JavaCord">JavaCord</option>
    <option id="JDA" value="JDA">JDA</option>
    <option id="discord.js" value="discord.js">discord.js</option>
    <option id="Eris" value="Eris">Eris</option>
    <option id="Discordia" value="Discordia">Discordia</option>
    <option id="RestCord" value="RestCord">RestCord</option>
    <option id="Yasmin" value="Yasmin">Yasmin</option>
    <option id="disco" value="disco">disco</option>
    <option id="discord.py" value="discord.py">discord.py</option>
    <option id="discordrb" value="discordrb">discordrb</option>
    <option id="serenity" value="serenity">serenity</option>
    <option id="SwiftDiscord" value="SwiftDiscord">SwiftDiscord</option>
    <option id="Sword" value="Sword">Sword</option>
    <option id="Discord Raw API" value="Discord Raw API">Discord Raw API</option>
    <option id="Other" value="Other">Other</option>
  </select>
    <br>
    <label for="prefix">Prefix(Required)</label>
    <br>
    <input type="text" name="prefix" id="prefix" placeholder="a!" value="{{prefix}}" required>
    <br>
    <label for="category">Category(5 max, required)</label>
    <br>
    <select multiple class="form-control" id="category" name="category[]" required>
<option id="Music" value="Music">Music</option>
<option id="Economy" value="Economy">Economy</option>
<option id="Leveling" value="Leveling">Leveling</option>
<option id="Game" value="Game">Game</option>
<option id="Among Us" value="Among Us">Among Us</option>
<option id="Minecraft" value="Minecraft">Minecraft</option>
<option id="Valorant" value="Valorant">Valorant</option>
<option id="Fortnite" value="Fortnite">Fortnite</option>
<option id="Soundboard" value="Soundboard">Soundboard</option>
<option id="Web Dashboard" value="Web Dashboard">Web Dashboard</option>
<option id="Roleplay" value="Roleplay">Roleplay</option>
<option id="Logging" value="Logging">Logging</option>
<option value="Multipurpose ">Multipurpose</option>
<option id="Turkish" value="Turkish">Turkish</option>
<option id="Moderation" value="Moderation">Moderation</option>
<option id="Role Management" value="Role Management">Role Management</option>
<option id="Customizable Behavior" value="Customizable Behavior">Customizable Behavior</option>
<option id="NSFW" value="NSFW">NSFW</option>
</select>
    <br>
    <label for="shortdescription">Short Description(Required)</label>
    <br>
    <input type="text" name="shortdescription" id="shortdescription" maxlength="128" placeholder="This bot is..." value="{{shortdescription}}" required>
    <br>

 
    <label for="longdescription">Long Description(Required)</label>
    <br>
    <textarea type="text" name="longdescription" id="longdescription" maxlength="2048" minlength="300" style="width: 75%;" rows="5" placeholder="Basic Markdown and HTML Supported." required>{{longdescription}}</textarea>
    <br>

    {{vanity}}

    <label for="supportserver">Support Server(Required)</label>
    <br>
    <input type="url" name="supportserver" value="{{supportserver}}" id="supportserver" placeholder="https://discord.gg/2Tfhn6eNPF" required>
    <br>


    <label for="website">Website(Optional)</label>
    <br>
    <input type="url" name="website" value="{{website}}" placeholder="https://aerobotlist.com" id="website">
    <br>


    <label for="invite">Invite Link(Required)</label>
    <br>
    <input type="url" name="invite" value="{{invite}}" id="invite" placeholder="https://discord.com/api/oauth2/authorize?client_id=772298155168628777&permissions=2147483639&redirect_uri=https%3A%2F%2Faerobotlist.com%2Flogin%2Fcallback&scope=bot" required>
    <br>
    <br>

    <button type="submit" name="submit" class="btn btn-primary" onclick="submitforreview()">Submit</button>

</form>
<br>
<br>
</div>
</div>

<footer class="page-footer font-small blue">

  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">&copy; 2020
  </div>
  <!-- Copyright -->

</footer>


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

function submitforreview(){
var converter = new showdown.Converter()
if(document.getElementById("clientid").value == "")return alert("Client ID Must not be missing!")
if(document.getElementById("prefix").value == "")return alert("Prefix Must not be missing!")
if(document.getElementById("library").value == "")return alert("Library Must not be missing!")
if(document.getElementById("library").value == "none")return alert("Please Select a Library!")
if(getSelectedOptions(document.getElementById("category")).length == 0)return alert("Category Must not be missing!")
if(getSelectedOptions(document.getElementById("category")).length > 5)return alert("You can only select up to 5 categories!")
if(document.getElementById("shortdescription").value == "")return alert("Short Description Must not be missing!")
if(document.getElementById("longdescription").value == "")return alert("Long Description Must not be missing!")
if(document.getElementById("supportserver").value == "")return alert("Support Server Invite Must not be missing!")
if(document.getElementById("invite").value == "")return alert("Invite URL Must not be missing!")
if(document.getElementById("shortdescription").value.length > 128)return alert("Short Description is too much! It must be under 128 characters!")
if(document.getElementById("longdescription").value.length > 2048)return alert("Long Description is too much! It must be under 2048 characters!")
if(document.getElementById("longdescription").value.length < 300)return alert("Short Description is too short! It must be over 300 characters!")
if(document.getElementById("vanity").value !== "" && document.getElementById("vanity").value.length > 10)return alert("Vanity URL can have at most 10 characters!")
$.ajax({
    url: '/getuser/' + document.getElementById("clientid").value,
    type: 'get',
    dataType: 'json',
    success: function (userdata) {
$.ajax({
    url: 'https://aerobotlist.com/botedit',
    type: 'post',
    data: JSON.stringify({
      "longdescription": document.getElementById("longdescription").value,
      "category": getSelectedOptions(document.getElementById("category")),
      "library": document.getElementById("library").value
    }),
beforeSend: function (request) {
 request.setRequestHeader('botname', userdata.username + "#" + userdata.discriminator);
 request.setRequestHeader('botid', userdata.id);
 request.setRequestHeader('ownerid', getCookie("id"));
 request.setRequestHeader('supportserver', document.getElementById("supportserver").value);
 request.setRequestHeader('website', document.getElementById("website").value);
 request.setRequestHeader('invite', document.getElementById("invite").value);
 request.setRequestHeader('shortdescription', document.getElementById("shortdescription").value);
 request.setRequestHeader('prefix', document.getElementById("prefix").value);
 request.setRequestHeader('Content-Type', "application/json");
 request.setRequestHeader('access_token', getCookie("access_token"));
 request.setRequestHeader('vanity', document.getElementById("vanity").value);
 
},
    dataType: 'json',
    success: function (data) {
console.log(userdata, data)
            alert(data.message)
        if(data.error == false){
            window.location.href="https://aerobotlist.com/bots/{{botid}}"
          }
    },
    error: function(data){
    console.log(data)
  }
});
}});
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
