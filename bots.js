module.exports = `
<head>
  <title>Bot | {{bottag}} | Aero Bot List</title>
  <link rel="icon" type="image/png" href="https://mcfacts.xyz/Images/aerobotlistlogo.png" />
  <meta name="og:image" content="{{avatar}}">
  <meta name="description" content="{{shortdescription}}">
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
  
<!-- styling -->
  
<style>
  body {
    background-color: #87ceeb;
  }

.card{
    margin-bottom: 15px;
}



.collapse.in{
    display:block !important;
    float: top;
    width: 100%;
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
#ownerdiv {
	cursor: pointer
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
    
     word-break: break-word;
     white-space: normal;
  }

.btn-grey{
    background-color:#D8D8D8;
	color:#FFF;
}
.rating-block{
	background-color:#FAFAFA;
	border:1px solid #EFEFEF;
	padding:15px 15px 20px 15px;
	border-radius:3px;
}
.bold{
	font-weight:700;
}
.padding-bottom-7{
	padding-bottom:7px;
}

.review-block{
	background-color:#FAFAFA;
	border:1px solid #EFEFEF;
	padding:15px;
	width: 75%;
	border-radius:3px;
	margin-bottom:15px;
}
.review-block-name{
	font-size:12px;
	margin:10px 0;
}
.review-block-date{
	font-size:12px;
}
.review-block-rate{
	font-size:13px;
	margin-bottom:15px;
}
.review-block-title{
	font-size:15px;
	font-weight:700;
	margin-bottom:10px;
}
.review-block-description{
	font-size:13px;
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
  
  <section class="hero text-center">

    <div class="hero-content">
        <img src="{{avatar}}" style="border-radius:50%; filter: blur({{NSFW}}px);" height="125px">
        <br />
        {{notapproved}}
       <h1 class="hero-title">
  
{{bottag}}
       </h1>
         
       <h2 class="hero-subtitle">
{{shortdescription}}
       </h2>
        <div style="height: 30px; display: inline-block; border-style: solid; border-color: white;">
    &nbsp;{{votes}} votes&nbsp;
        </div>

      <div style="height: 30px; display: inline-block;  border-style: solid; border-color: white;">
          &nbsp;{{servercount}} servers&nbsp;
        </div>

        <div style="height: 30px; display: inline-block;  border-style: solid; border-color: white;">
          &nbsp;{{shardcount}} shards&nbsp;
        </div>

        <div style="height: 30px; display: inline-block;  border-style: solid; border-color: white;">
          &nbsp;{{library}}&nbsp;
        </div>

        <div style="height: 30px; display: inline-block;  border-style: solid; border-color: white;">
          &nbsp; Prefix: {{prefix}}&nbsp;
        </div>

	<div style="height: 30px; display: inline-block;  border-style: solid; border-color: white;">
          &nbsp; Average Ratings: {{arating}}&nbsp;
        </div>
        <br>
        <br>
    </div>
  </section>



<div class="featured text-center" id="actions" style="background-color: orange;">
  <br />
  <br />
  <h1>Categories</h1>
  <br />
<div class="row justify-content-center mx-auto" style="width: 75%; margin: 0.625rem;">
    {{categories}}
</div>

<br>
<br>
</div>
</div>

<div class="featured text-center" id="owners" style="background-color: orange;">
  <br />
  <br />
  <h1>Owner</h1>
  <br />
<div id="ownerdiv" class="row justify-content-center mx-auto" style="width: 75%;" onclick="javascript: window.location.href='https://aerobotlist.com/users/{{ownerid}}'">
	<img src="{{owneravatar}}" width="25px;" style="border-radius: 50%;">
       <a style="margin-right: 5px;">&nbsp;{{ownertag}}</a>
</div>

<br>
<br>
</div>
</div>

<div class="featured text-center" id="actions" style="background-color: orange;">
  <br />
  <br />
  <h1>Bot Actions</h1>
  <br />
<div class="row justify-content-center mx-auto" style="width: 75%;">

       <a class="btn btn-primary" href="#" onclick="vote()" role="button" style="margin-right: 5px;">Vote</a>
       <a class="btn btn-primary" href="#" onclick="bump()" role="button" style="margin-right: 5px;">Bump</a>
        <a class="btn btn-primary" target="_blank" href="{{invite}}" role="button" style="margin-right: 5px;">Invite This Bot</a>
        <a class="btn btn-primary" target="_blank" href="{{supportserver}}" role="button" style="margin-right: 5px;">Join Support Server</a>
        <a class="btn btn-primary" target="_blank" href="{{website}}" role="button" style="margin-right: 5px;">Website</a>
        <a class="btn btn-primary" target="_blank" href="https://aerobotlist.com/bots/{{vanity}}/widget" role="button" style="margin-right: 5px;">Widget</a>
</div>

<br>
<br>
</div>
</div>


{{owner}}
    

  

<div class="featured text-center" id="longdesc" >
  <br />
  <br />
  <h1>Long Description</h1>
  <br />

<div class="row justify-content-center mx-auto" style="width: 75%;" id="longdescription">
{{longdescription}}
</div>


</div>
</div>

<div class="featured text-center" id="reviews" >
  <br />
  <br />
  <h1>Reviews</h1>
  <br />

<div class="row justify-content-center mx-auto" style="width: 75%;" id="review">
<div class="review-block">
					<div class="row">
					<input type="text" name="reviewinput" id="reviewinput" class="form-control" style="width: 58%; position: relative; left: 2%;">
					<select name="rating" id="rating" style="width: 23%; position: relative; left: 2%">
						<option value="Your Rating">Your Rating</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<a class="btn btn-primary" style="width: 15%; position: relative; left: 2%;" onclick="review()">Post</a> 
					</div>
					<hr/>
{{reviews}}


</div>
</div>
</div>



<footer class="page-footer font-small blue">

  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">&copy; 2020
  </div>
  <!-- Copyright -->

</footer>


<script>

function review(){
  if(document.getElementById("rating").value == "Your Rating")return alert("Please select a rating!")
  if(document.getElementById("reviewinput").value == "")return alert("Please select a review!")
  if(document.getElementById("reviewinput").value.replace(/ /g, "").length > 108)return alert("Review Have a maximum character limit of 128 characters(not including space)!")
  if(getCookie("access_token") == undefined)return window.location.href = "/login"
  $.ajax({
    url: '/bots/{{botid}}/review',
    type: 'post',
    headers: {
        "access_token": getCookie("access_token"),
	"rating": document.getElementById("rating").value,
	"review": document.getElementById("reviewinput").value
    },
    dataType: 'json',
    success: function (data){
        alert(data.message);
	if(data.error == false){
        	window.location.reload();
	}	
    }

    });

}

function vote(){
  if(getCookie("access_token") == undefined)return window.location.href = "/login"
  $.ajax({
    url: '/bots/{{botid}}/vote',
    type: 'post',
    headers: {
        "access_token": getCookie("access_token")
    },
    dataType: 'json',
    success: function (data){
        alert(data.message);
        window.location.reload()
    }

    });
}

function bump(){
  if(getCookie("access_token") == undefined)return window.location.href = "/login"
  $.ajax({
    url: '/bump',
    type: 'post',
    headers: {
	"botid": "{{botid}}"
    },
    dataType: 'json',
    success: function (data){
        alert(data.message);
        window.location.reload()
    }

    });
}

function deletebot(){
var r = confirm("Are you sure you want to delete {{bottag}}?");
if (r == false)return alert("Deletion Request Cancelled!")
  if(getCookie("access_token") == undefined)return window.location.href = "/login"
  $.ajax({
    url: '/bots/{{botid}}/delete',
    type: 'post',
    headers: {
        "access_token": getCookie("access_token")
    },
    dataType: 'json',
    success: function (data){
        alert(data.message);
        if(data.error == false){
        window.location.href = "https://aerobotlist.com"
}
}

    });
}

function showapitoken(token){
  alert("Your API token is: " + token)
}

function getAllDiv(){
  var div = document.getElementById("longdescription")// getElementById, etc 
var children = div.childNodes; 
var elements = []; 
for (var i=0; i<div.childNodes.length; i++) { 
  var child = div.childNodes[i]; 
  if (child.nodeType == 1) { 
    elements.push(child)       
  } 
} 

 return elements
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
