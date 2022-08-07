// define libraries
const express = require("express")
const Discord = require("discord.js")
const fetch = require("node-fetch")
const client = new Discord.Client({ fetchAllMembers: true })
const path = require("path")
const bodyParser = require('body-parser');
const showdown = require("showdown")
 const converter = new showdown.Converter()
const app = express()
const fs = require("fs")
let bottoken = "MTAwNTYyOTYyOTI3MDMyNzMwNg.GXIS3g.xtyztLynYqC39_D33EDh3GGEMexsVBsKnsTHyE"
const admin = require('firebase-admin');
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
app.set('trust proxy', 1);

let adminids = ["887500290172006480"]
const { createCanvas, loadImage, registerFont } = require('canvas')

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


const editlimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  keyGenerator: function (req /*, res*/) {
    return req.header("access_token");
  },
  handler: function (req, res, /*next*/) {
    res.status(200).json({ error: true, message: "You are editing this bot too fast! Please slow down." });
  }
});

const apilimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
  keyGenerator: function (req /*, res*/) {
    return req.header("Authorization");
  },
  handler: function (req, res, /*next*/) {
    res.status(429).json({ error: true, message: "Ratelimit Exceeded | You can only post your bot's server count once per 30 minutes." });
  }
});

app.use(cookieParser());

let votes = {
	
}


const serviceAccount = require('./aero-bot-list-firebase-adminsdk-xt9mg-2f1952c0f1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


function addData(collection, filename, data){
	db.collection(collection).doc(filename).set(data);
	return true;
}

async function getCollection(co) {
  const markers = [];
  await db.collection(co).get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      markers.push(doc.data());
    });
  });
  return markers;
}

async function getUnApprovedBotCollection() {
  const markers = [];
  await db.collection("bots").get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
	      if(doc.data().approved == false){
      		markers.push(doc.data());
	      }
	      });
  });
	markers.sort(function(a, b) {
  		return a.additiontimestamp - b.additiontimestamp;
	});
  return markers;
}

async function getApprovedBotCollection() {
  const markers = [];
  await db.collection("bots").get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
	      if(doc.data().approved == true){
      		markers.push(doc.data());
	      }
	      });
  });
  return markers;
}

async function getResubmitBotCollection() {
  const markers = [];
  await db.collection("resubmits").get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      		markers.push(doc.data());
	      });
  });
  return markers;
}

client.on("guildMemberRemove", async(member) => {
	let bots = await getCollection("bots")
	for(var i in bots){
		if(bots[i].ownerid == member.id){
			
			db.collection('bots').doc(bots[i].botid).delete();
			let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(bots[i].botid) == true){
	
		guildmember.get(bots[i].botid).kick()
		
	}
			
			client.channels.cache.get("772339179517902858").send(`❌ \`${bots[i].bottag}\` by \`${member.user.tag}\` was automatically deleted because the bot owner left the server.`)
		}
	}
})


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

app.get("/panel", async (req, res) => {
	if(req.cookies.access_token == undefined)return res.redirect("https://aerobotlist.com/login")
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.cookies.access_token, "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(adminids.includes(userdata.id) == false)return res.redirect("https://aerobotlist.com")
	
	let bots = await getUnApprovedBotCollection()
	let bot = "";
	let cbot = ""
	for(var i in bots){
			bot += `
			<div class="col-sm-4">
				<div class="card text-center">
				<div class="card-body">
					<img src="${bots[i].botavatar}" style="border-radius:50%;" height="125px">
					<br>
					<h5 class="card-title">
						${bots[i].bottag}
					</h5>
					<p class="card-text" style="height: 20px; overflow: hidden;">
						${bots[i].shortdescription}
					</p>
					<a class="btn btn-primary" href="https://aerobotlist.com/bots/${bots[i].botid}">
						View Bot Page
					</a>
					<a class="btn btn-success" target="_blank" href="https://discord.com/oauth2/authorize?client_id=${bots[i].botid}&permissions=0&guild_id=772263461044486175&scope=bot&disable_guild_select=true">
						Invite For Testing
					</a>
				</div>
			</div>
		</div>
`
	}
	res.send(require("./admin.js").replace(/{{bots}}/g, bot))
})

// use the express-static middleware
// app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var api = express.Router();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(apilimiter)

api.post("/poststats", async(req, res) => {
	if(req.header("Authorization") == undefined)return res.status(401).json({ error: true, message: "Required Header: Authorization is not provided with the request.", code: 401 })
	if(req.header("botid") == undefined)return res.status(400).json({ error: true, message: "A Bad Request was sent without a valid bot id.", code: 400 })
	if(typeof req.header("botid") !== "string")res.status(400).json({ error: true, message: "Your bot id must be a Discord id within a string.", code: 400 })
	if(req.body.server == undefined)return res.status(400).json({ error: true, message: "A Bad Request was sent without a valid server count.", code: 400 })
	let shards = 0
	if(req.body.shard == undefined){
		shards = "N/A"
	}else{
		shards = req.body.shard
	}
	if(shards == 0)return res.status(400).json({ error: true, message: "A Bad Request was sent without a valid shardcount (shardcount cannot be zero).", code: 400 })
	const cityRef = db.collection('bots').doc(req.header("botid"));
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.status(404).json({ error: true, message: "Bot Not Found", code: 404 })
	
	let datadata = doc.data()
	
	if(datadata.apitoken !== req.header("Authorization"))return res.status(403).json({ error: true, message: "Invalid Auth Token", code: 403 })
	let poststats = {
		guildcount: req.body.server,
		shardcount: shards
	}
	
	cityRef.update(poststats)
	
	res.status(200).json({ error: false, message: "Stats successfully posted!", code: 200 })
	
})

api.get("/bots", async(req, res) => {
	if(req.header("Authorization") == undefined)return res.status(401).json({ error: true, message: "Required Header: Authorization is not provided with the request.", code: 401 })
	if(req.body.botid == undefined)return res.status(400).json({ error: true, message: "A Bad Request was sent without a valid bot id.", code: 400 })
	if(typeof req.body.botid !== "string")res.status(400).json({ error: true, message: "Your bot id must be a discord id within a string.", code: 400 })
	const cityRef = db.collection('bots').doc(req.body.botid);
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.status(404).json({ error: true, message: "Bot Not Found", code: 404 })
	
	let datadata = doc.data()
	if(datadata.apitoken !== req.header("Authorization"))return res.status(403).json({ error: true, message: "Invalid Auth Token", code: 403 })
	
	datadata["apitoken"] = "--Redacted--"
	
	res.status(200).json({ error: false, data: datadata, code: 200 })
	
})


app.use('/api', api);



app.get("/faq", async(req, res) => {
	res.send(require("./faq.js"))	
})
app.get("/update", async(req, res) => {
	res.send(require("./update.js"))	
})

app.get("/bots/:id/widget", async(req, res) => {
	let vanitycheck = await getCollection("bots")
for(var i in vanitycheck){
	if(vanitycheck[i].vanity !== "" && vanitycheck[i].vanity !== undefined && vanitycheck[i].vanity == req.params.id && vanitycheck[i].featured == true){
		req.params.id = vanitycheck[i].botid
	}
}
	router.get('/contact', function(req, res){
  res.render('faq', {
    title: 'faq'
  });
});

	
const cityRef = db.collection('bots').doc(req.params.id);
	const doc = await cityRef.get();
	
	
	if(doc.exists == false)return res.json({ error: true, message: "Cannot find the bot in our database!" })
	let datadata = doc.data()
const canvas = createCanvas(400, 300)
const ctx = canvas.getContext('2d')
const context = ctx
loadImage('https://i.imgur.com/FTNUcPz.jpeg').then((image) => {
  ctx.drawImage(image, 0, 0, 400, 300)


  ctx.font = '30px Regular'
  ctx.textAlign = 'center'
  ctx.fillText(datadata.bottag, 200, 75)

  ctx.font = '25px Regular'
  ctx.textAlign = 'center'
  ctx.fillText('Stats', 200, 100)
  
  ctx.font = '15px Regular'
  ctx.textAlign = 'center'
  ctx.fillText('Votes: ' + datadata.totalvotes.toLocaleString(), 200, 150)
  
  ctx.font = '15px Regular'
  ctx.textAlign = 'center'
  ctx.fillText('Servers: ' + datadata.guildcount.toLocaleString(), 200, 175)
  
  ctx.font = '15px Regular'
  ctx.textAlign = 'center'
  ctx.fillText('Shard: ' + datadata.shardcount.toLocaleString(), 200, 200)
 
  res.end(canvas.toBuffer())

})
})




app.post("/bump", async(req, res) => {
	if(req.header("botid") == undefined)return res.json({ error: true, message: "A Bad Request was sent without a valid bot id.", code: 400 })
	if(typeof req.header("botid") !== "string")res.json({ error: true, message: "Your bot id must be a Discord id within a string.", code: 400 })
	const cityRef = db.collection('bots').doc(req.header("botid"));
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.json({ error: true, message: "Bot Not Found", code: 404 })
	
	let datadata = doc.data()
	
	if(new Date().getTime() - datadata.lastbumped < 3600000 && datadata.lastbumped !== undefined)return res.json({ error: true, message: "Bot Already Bumped During the last hour!", code: 400 })
	
	let poststats = {
		lastbumped: new Date().getTime()
	}
	
	cityRef.update(poststats)
	
	res.status(200).json({ error: false, message: "Bot successfully Bumped!", code: 200 })
	
})



app.post("/approvebot", async (req, res) => {
	console.log(req.header("access_token"))
	let body = req.body
	if(req.cookies.access_token == undefined)return res.redirect("https://aerobotlist.com/login")
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.message !== undefined)return res.json({ error: true, message: userdata.message })
	
	if(adminids.includes(userdata.id) == false)return res.json({ error: true, message: "You must be an admin to do this!" })
	
	const cityRef = db.collection('bots').doc(body.botid);
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.json({ error: true, message: "Cannot find the bot in our database!" })
	let datadata = doc.data()
	
	let approveddata = {
		approved: true,
		additiontimestamp: new Date().getTime()
	}
	
	let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(datadata.ownerid) == false)return res.json({ error: true, message: "Bot Owner not in server." })
	
	guildmember.get(datadata.ownerid).roles.add("772279638239477821")
	
	if(guildmember.has(datadata.botid) == false)return res.json({ error: true, message: "Bot not in server." })
	
	guildmember.get(datadata.botid).roles.add("772279545851412500")
	
	guildmember.get(datadata.botid).roles.remove("772279571642056725")
	
	cityRef.update(approveddata)
	
	client.channels.cache.get("772339179517902858").send(`✅ <@${datadata.botid}>(\`${datadata.bottag}\`) by <@${datadata.ownerid}>(\`${datadata.ownertag}\`) has been approved by \`${userdata.username}#${userdata.discriminator}\`. Note: \`${body.reason}\``)
	
	res.json({ error: false, message: "Approved " + datadata.bottag + "!" })
	
	
})

app.post("/denybot", async (req, res) => {
	let body = req.body
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.message !== undefined)return res.json({ error: true, message: userdata.message })
	
	if(adminids.includes(userdata.id) == false)return res.json({ error: true, message: "You are not an admin!" })
	
	const cityRef = db.collection('bots').doc(body.botid);
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.json({ error: true, message: "Cannot find the bot in our database!" })
	let datadata = doc.data()
	let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(datadata.botid) == true){
	
		guildmember.get(datadata.botid).kick()
		
	}
	
	db.collection('resubmits').doc(body.botid).set(datadata)
	
	cityRef.delete();
	client.channels.cache.get("772339179517902858").send(`❌ <@${datadata.botid}>(\`${datadata.bottag}\`) by <@${datadata.ownerid}>(\`${datadata.ownertag}\`) has been denied by \`${userdata.username}#${userdata.discriminator}\`. Reason: \`${body.reason}\``)
	
	
	res.json({ error: false, message: "Denied " + datadata.bottag + "!" })
	
	
	
})

app.post("/resubmitbot", async (req, res) => {
	let body = req.body
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.message !== undefined)return res.json({ error: true, message: userdata.message })
	
	const cityRef = db.collection('resubmits').doc(body.botid);
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.json({ error: true, message: "Cannot find the bot in our database!" })
	
	if(userdata.id !== doc.data().ownerid)return res.json({ error: true, message: "You are not the owner of the bot!" })
	
	let datadata = doc.data()
	
	let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(userdata.id) == false)return res.json({ error: true, message: "You are not in our server!" })
	db.collection('bots').doc(body.botid).set(doc.data())
	cityRef.delete();
	client.channels.cache.get("772339179517902858").send(`♻️ <@${datadata.botid}>(\`${datadata.bottag}\`) by <@${datadata.ownerid}>(\`${datadata.ownertag}\`) has been resubmitted by its owner.(<@&772266614597877791>)`)
	
	res.json({ error: false, message: "Successfully Resubmitted!" })
	
})

app.post("/certifybot", async (req, res) => {
	let body = req.body
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(adminids.includes(userdata.id) == false)return res.json({ error: true, message: "You are not an admin!" })
	
	const cityRef = db.collection('bots').doc(body.botid);
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.json({ error: true, message: "Cannot find the bot in our database!" })
	let datadata = doc.data()
	
	let approveddata = {
		featured: true
	}
	
	cityRef.update(approveddata)
	
	client.channels.cache.get("772339179517902858").send(`♾️ <@${datadata.botid}>(\`${datadata.bottag}\`) by <@${datadata.ownerid}>(\`${datadata.ownertag}\`) is now featured on the front page!`)
	
	res.json({ error: false, message: "Certified " + datadata.bottag + "!" })
	
	
})

app.post("/uncertifybot", async (req, res) => {
	console.log(req.header("access_token"))
	let body = req.body
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(adminids.includes(userdata.id) == false)return res.json({ error: true, message: "You are not an admin!" })
	
	const cityRef = db.collection('bots').doc(body.botid);
	const doc = await cityRef.get();
	
	if(doc.exists == false)return res.json({ error: true, message: "Cannot find the bot in our database!" })
	let datadata = doc.data()
	
	let approveddata = {
		featured: false
	}
	
	cityRef.update(approveddata)
	
	client.channels.cache.get("772339179517902858").send(`❌ <@${datadata.botid}>(\`${datadata.bottag}\`) by <@${datadata.ownerid}>(\`${datadata.ownertag}\`) is no longer featured on the font page!`)
	
	res.json({ error: false, message: "Uncertified " + datadata.bottag + "!" })
	
	
})

app.get("/search", async (req, res) => {
	let searchquery = req.query.q;
	
	if(!searchquery)return res.send("Error: Required Query String 'q' missing.")
	
	let bots = await getCollection("bots")
	
	bots.sort(function(a, b) {
  		return a.totalvotes - b.totalvotes;
	});
	
	let result = ""
	
	for(var i in bots){
		let current = bots[i];
		
		if(current.approved == true){
			if(current.botusername.toLowerCase().includes(searchquery.toLowerCase())){
							result = `
			<div class="col-sm-4">
				<div class="card text-center" onclick="javascript: window.location.href = '/bots/${bots[i].botid}'">
				<div class="card-body">
					<img src="${bots[i].botavatar}" style="border-radius:50%;" height="125px">
					<br>
					<h5 class="card-title">
						${bots[i].bottag}
					</h5>
					<p class="card-text" style="height: 20px; overflow: hidden;">
						${bots[i].shortdescription}
					</p>
					<a class="btn btn-primary">
						${bots[i].guildcount.toLocaleString()} servers
					</a>
					<a class="btn btn-info">
						${bots[i].shardcount.toLocaleString()} shards
					</a>
					<br>
					<br>
					<a class="btn btn-success">
						${bots[i].totalvotes.toLocaleString()} votes
					</a>
				</div>
			</div>
		</div>
` + result
			}
		}
	}
if(result == ""){
	result = "<h2> Cannot find a bot associated with <strong>" + searchquery + "</strong> </h2>"
}
	
res.send(require("./search.js").replace(/{{searchparams}}/g, searchquery).replace(/{{result}}/g, result))
})
function getAllDiv(dom){
  var div = dom// getElementById, etc 
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


function formatDate(dateObj,format){
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var curr_date = dateObj.getDate()
    var curr_month = dateObj.getMonth();
    curr_month = curr_month + 1;
    var curr_year = dateObj.getFullYear();
    var curr_min = dateObj.getMinutes();
    var curr_hr= dateObj.getHours();
    var curr_sc= dateObj.getSeconds();
    if(curr_month.toString().length == 1)
    curr_month = '0' + curr_month;      
    if(curr_date.toString().length == 1)
    curr_date = '0' + curr_date;
    if(curr_hr.toString().length == 1)
    curr_hr = '0' + curr_hr;
    if(curr_min.toString().length == 1)
    curr_min = '0' + curr_min;

    if(format ==1)//dd-mm-yyyy
    {
        return curr_date + "-"+curr_month+ "-"+curr_year;       
    }
    else if(format ==2)//yyyy-mm-dd
    {
        return curr_year + "-"+curr_month+ "-"+curr_date;       
    }
    else if(format ==3)//dd/mm/yyyy
    {
        return curr_date + "/"+curr_month+ "/"+curr_year;       
    }
    else if(format ==4)// MM/dd/yyyy HH:mm:ss
    {
        return curr_month+"/"+curr_date +"/"+curr_year+ " "+curr_hr+":"+curr_min+":"+curr_sc;       
    }
}

function getAverage(array){
if(array.length == 0)return 5;
let popularitySum = 0;
let itemsFound = 0;
const len = array.length;
let item = null;
for (let i = 0; i < len; i++) {
    item = array[i];
        popularitySum = parseInt(item) + popularitySum;
        itemsFound = itemsFound + 1;
}
const averagePopularity = popularitySum / itemsFound;
	
return averagePopularity;
}

app.get("/bots/:id", async function (req, res) {
let vanitycheck = await getCollection("bots")
for(var i in vanitycheck){
	if(vanitycheck[i].vanity !== "" && vanitycheck[i].vanity !== undefined && vanitycheck[i].vanity == req.params.id && vanitycheck[i].featured == true){
		req.params.id = vanitycheck[i].botid
	}
}
	
const { parse } = require('node-html-parser')
	
const cityRef = db.collection('bots').doc(req.params.id);
const doc = await cityRef.get();
if (!doc.exists) {
  res.status(404).send(require("./404.js"));
} else {
	let owner = ""
	
	if(req.cookies.access_token !== undefined){
		let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.cookies.access_token, "Content-Type": "application/json" }  })
	
		let userdata = await udata.json()
		
		if(userdata.id == doc.data().ownerid){
			let apitoken;
			if(doc.data().apitoken !== undefined){
				apitoken = doc.data().apitoken
			}else{
				apitoken = makeid(40)
				cityRef.update({ apitoken: apitoken })
			}
			owner = `
<div class="featured text-center" id="owner" style="background-color: orange;">
  <br />
  <br />
  <h1>Owner Actions</h1>
  <br />

<div class="row justify-content-center mx-auto" id="topvotedbots" style="width: 75%;">

       <a class="btn btn-danger" href="#" onclick="deletebot()" role="button" style="margin-right: 5px;">Delete Bot</a>
       <a class="btn btn-danger" href="https://aerobotlist.com/bots/${doc.data().botid}/edit" role="button" style="margin-right: 5px;">Manage Bot</a>
       <a class="btn btn-primary" href="#" onclick="showapitoken('${apitoken}')" role="button" style="margin-right: 5px;">Show API Token</a>

</div>

<br>
<br>
</div>
</div>
`
		}
	}
	let category = ""
	let categories = doc.data().category
	for(var i in categories){
		category += `
		
        <div style="height: 30px; color: white; display: inline-block;  border-style: solid; border-color: white;">
          &nbsp;${categories[i]}&nbsp;
        </div>&nbsp;
`
	}
	
	let approve = ""
	
	if(doc.data().approved == true){
		approve = ""
	}else if(doc.data().approved == false){
		approve = `
<div class="text-center" style="width: 100%; background-color: red; height: 25px; color: white; {{notapproved}}">
  This Bot is not approved. Please be careful inviting it.
</div>
<br />
`
	}
	let filter = 0;
	if(doc.data().category.includes("NSFW")){
		filter = 15
	}
	
	var dom = parse(`<div id="longdesc">${converter.makeHtml(doc.data().longdescription)}</div>`);
	let botlongdes = getAllDiv(dom.querySelector('#longdesc'));
	
	for(var i in botlongdes){
		if(botlongdes[i].rawTagName.toLowerCase() == "script"){
			botlongdes[i].remove();
		}
	}
	
	let reviews = ""
	let avrating
	let avaragerating
	if(doc.data().reviews !== undefined){
		let review = doc.data().reviews
		
		let ratings = []
		
		review.sort(function(a, b){
		return b.timestamp - a.timestamp
		})
		for(var i in review){
			ratings.push(review[i].rating)
			reviews += `
<hr />
				<div class="row">
						<div class="col-sm-3">
							<img src="${review[i].authorpfp}" width="75px" height="75px" class="img-rounded">
							<div class="review-block-name">${review[i].authorusername}</div>
							<div class="review-block-date">${formatDate(new Date(review[i].timestamp), 3)}</div>
						</div>
						<div class="col-sm-9">
							<div class="review-block-rate">
								${review[i].rating}/5
							</div>
							<div class="review-block-title">Review Content</div>
							<div class="review-block-description">${review[i].review}</div>
						</div>
					</div>
`
		}
				
		console.log(getAverage(ratings))
		avaragerating = Math.ceil(getAverage(ratings) * 10) / 10

		
	}

if(reviews == ""){
	reviews = "<h2>No Reviews Available</h2>"
}
let html = require("./bots.js").replace(/{{ownerid}}/g, doc.data().ownerid).replace(/{{owneravatar}}/g, doc.data().owneravatar).replace(/{{ownertag}}/g, doc.data().ownertag).replace(/{{arating}}/g, avaragerating).replace(/{{reviews}}/g, reviews).replace(/{{NSFW}}/g, filter).replace(/{{vanity}}/g, req.params.id).replace(/{{prefix}}/g, doc.data().prefix).replace(/{{notapproved}}/g, approve).replace(/{{categories}}/g, category).replace(/{{library}}/g, doc.data().library).replace(/{{owner}}/g, owner).replace(/{{shardcount}}/g, doc.data().shardcount).replace(/{{servercount}}/g, doc.data().guildcount).replace(/{{votes}}/g, doc.data().totalvotes.toLocaleString()).replace(/{{website}}/g, doc.data().website).replace(/{{supportserver}}/g, doc.data().supportserver).replace(/{{invite}}/g, doc.data().invite).replace(/{{botid}}/g, doc.data().botid).replace(/{{avatar}}/g, doc.data().botavatar).replace(/{{bottag}}/g, doc.data().bottag).replace(/{{shortdescription}}/g, doc.data().shortdescription).replace(/{{longdescription}}/g, dom.querySelector('#longdesc').innerHTML)
	
  res.send(html)
	}

})

app.post("/bots/:id/review", async function (req, res) {
	if(!req.header("access_token"))return res.json({ error: true, message: "Please provide access_token as authentication." })
	if(!req.header("review"))return res.json({ error: true, message: "Please provide a review!" })
	if(!req.header("rating"))return res.json({ error: true, message: "Please provide a rating!" })
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.message !== undefined)return res.json({ error: true, message: userdata.message })
	
	
	const cityRef = db.collection('bots').doc(req.params.id);
	const doc = await cityRef.get();
	if (doc.exists) {
	let userdatadata = await client.users.fetch(userdata.id)
		
		let botdata = doc.data()
		
		
		
		let reviews;
		
		if(botdata.reviews == undefined){
			reviews = []
		}else{
			reviews = botdata.reviews
		}
		
		for(i in reviews){
			if(reviews[i].authorid == userdatadata.id)return res.json({ error: true, message: "You had already reviewed this bot!" })
		}
		
		reviews.push({ authorid: userdatadata.id, authorusername: userdatadata.username, authorpfp: userdatadata.displayAvatarURL(), timestamp: new Date().getTime(), review: req.header("review"), rating: req.header("rating") })
	
	let data = {
		reviews: reviews
	}
	cityRef.update(data)
		
	res.json({ error: false, message: "Your Review was successfully posted!" })
	}else{
		res.json({ error: true, message: "Bot not found!" })
	}
	
	
	
})

app.post("/panel/bots/:id/delete", async function (req, res) {
	if(!req.header("access_token"))return res.json({ error: true, message: "Please provide access_token as authentication." })
	if(!req.header("reason"))return res.json({ error: true, message: "Please provide a reason to delete bot bot." })
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.message !== undefined)return res.json({ error: true, message: userdata.message })
	
	
const cityRef = db.collection('bots').doc(req.params.id);
const doc = await cityRef.get();
	if(doc.exists == false)return res.json({ error: true, message: "cannot find the bot in our database" })
	if(adminids.includes(userdata.id) == false)return res.json({ error: true, message: "Unauthorized" })
	
	let datadata = doc.data()
	let botsc = await getApprovedBotCollection()
	let deleterole = true;
	for(var i in botsc){
		if(botsc[i].ownerid == datadata.ownerid && botsc[i].botid !== datadata.botid){
			deleterole = false;
		}
	}
	
	console.log(deleterole)
	
	
	if(deleterole == true){
		let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(doc.data().ownerid) == true){
	
		guildmember.get(doc.data().ownerid).roles.remove("772279638239477821")
		
	}
	}
	
	let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(datadata.botid) == true){
	
		guildmember.get(datadata.botid).kick()
		
	}
	let botdatadata = doc.data()
	
	botdatadata["approved"] = false
	
	db.collection('resubmits').doc(datadata.botid).set(botdatadata);
	cityRef.delete()
	
	client.channels.cache.get("772339179517902858").send("🗑️ <@" + userdata.id + "> has deleted <@" + doc.data().botid + ">! (Reason: `" + req.header("reason") + "`)")
	res.json({ error: false, message: "Success! " + botdatadata.bottag + " is now deleted!" })
	
})

app.post("/bots/:id/delete", async function (req, res) {
	if(!req.header("access_token"))return res.json({ error: true, message: "Please provide access_token as authentication." })
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.message !== undefined)return res.json({ error: true, message: userdata.message })
	
	
const cityRef = db.collection('bots').doc(req.params.id);
const doc = await cityRef.get();
	if(doc.exists == false)return res.json({ error: true, message: "cannot find the bot in our database" })
	if(doc.ownerid !== userdata.id)return res.json({ error: true, message: "Unauthorized" })
	
	let datadata = doc.data()
	let botsc = await getApprovedBotCollection()
	let deleterole = true;
	for(var i in botsc){
		if(botsc[i].ownerid == datadata.ownerid && botsc[i].botid !== datadata.botid){
			deleterole = false;
		}
	}
	
	console.log(deleterole)
	
	
	if(deleterole == true){
		let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(doc.data().ownerid) == true){
	
		guildmember.get(doc.data().ownerid).roles.remove("772279638239477821")
		
	}
	}
	
	let guildmember = client.guilds.cache.get("772263461044486175").members.cache;
	
	if(guildmember.has(datadata.botid) == true){
	
		guildmember.get(datadata.botid).kick()
		
	}
	let botdatadata = doc.data()
	
	botdatadata["approved"] = false
	
	db.collection('resubmits').doc(datadata.botid).set(botdatadata);
	cityRef.delete()
	
	client.channels.cache.get("772339179517902858").send("🗑️ <@" + userdata.id + "> has deleted <@" + doc.data().botid + ">!")
	res.json({ error: false, message: "Success! Your bot is now deleted!" })
	
})


app.post("/bots/:id/vote", async function (req, res) {
	
	if(votes[req.params.id] == undefined){
		votes[req.params.id] = []
	}
const cityRef = db.collection('bots').doc(req.params.id);
const doc = await cityRef.get();
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.header("access_token"), "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.message !== undefined)return res.json({ error: true, message: "Invalid User Auth." })
if (!doc.exists) {
  res.send("Cannot Find the bot!");
} else {
  if(votes[req.params.id].includes(userdata.id) == true)return res.json({ error: true, message: "Please vote again after the 12 hours cooldown is over." })
	votes[req.params.id].push(userdata.id)
	console.log(votes)
	let totalvotesss = doc.data().totalvotes + 1;
	
	console.log(totalvotesss)
	
	let update = {
		totalvotes: totalvotesss
	}
	
	
	
	
	
  
  await db.collection("bots").doc(req.params.id).update(update)
  client.channels.cache.get("772946678058975242").send("👍 `" + userdata.username + "#" + userdata.discriminator + "` has voted for <@" + doc.data().botid + ">!")
  res.json({ error: true, message: "You have voted! Thank you for your support!" })
}
	
	setTimeout(async function(){
	let dataa = votes[req.params.id]
	
	dataa.splice(dataa.indexOf(userdata.id))
		console.log(dataa)
	}, 43200000)
})

function sortArray(array) {
  var temp = 0;
  for (var i = 0; i < array.length; i++) {
    for (var j = i; j < array.length; j++) {
      if (array[j].totalvotes < array[i].totalvotes) {
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
    }
  }
  return array;
}

// define the first route
app.get("/", async function (req, res) {
	let bot = "";
	let cbot = ""
	let bots = await getCollection("bots")
	bots.sort(function(a, b){
		return b.totalvotes-a.totalvotes
	})
	
	let votedbots = []
	
	votedbots.push()
	
	console.log(bots)
	for(var i in bots){
		if(bots[i].approved == true && i < 6){
			let vanity = bots[i].botid
			if(bots[i].vanity !== undefined && bots[i].vanity !== ""){
				vanity = bots[i].vanity
			}
			let filter = 0
			if(bots[i].category.includes("NSFW")){
				filter = 15
			}
			bot += `
			<div class="col-sm-4">
				<div class="card text-center" onclick="javascript: window.location.href = '/bots/${vanity}'">
				<div class="card-body">
					<img src="${bots[i].botavatar}" style="border-radius:50%; filter: blur(${filter}px);" height="125px">
					<br>
					<h5 class="card-title">
						${bots[i].bottag}
					</h5>
					<p class="card-text" style="height: 20px; overflow: hidden;">
						${bots[i].shortdescription}
					</p>
					<a class="btn btn-primary">
						${bots[i].guildcount.toLocaleString()} servers
					</a>
					<a class="btn btn-info">
						${bots[i].shardcount.toLocaleString()} shards
					</a>
					<br>
					<br>
					<a class="btn btn-success">
						${bots[i].totalvotes.toLocaleString()} votes
					</a>
				</div>
			</div>
		</div>
`
		}
	}
	let cbots = bots
	for(var i in cbots){
		if(cbots[i].featured == true && cbots[i].approved == true && i < 6){
			let vanity = cbots[i].botid
			if(cbots[i].vanity !== undefined && cbots[i].vanity !== ""){
				vanity = cbots[i].vanity
			}
			
			let filter = 0
			if(cbots[i].category.includes("NSFW")){
				filter = 15
			}
			cbot += `
			<div class="col-sm-4">
				<div class="card text-center" onclick="javascript: window.location.href = '/bots/${vanity}'">
				<div class="card-body">
					<img src="${cbots[i].botavatar}" style="border-radius:50%; filter: blur(${filter}px);" height="125px">
					<br>
					<h5 class="card-title">
						${cbots[i].bottag}
					</h5>
					<p class="card-text" style="height: 20px; overflow: hidden;">
						${cbots[i].shortdescription}
					</p>
					<a class="btn btn-primary">
						${cbots[i].guildcount.toLocaleString()} servers
					</a>
					<a class="btn btn-info">
						${cbots[i].shardcount.toLocaleString()} shards
					</a>
					<br>
					<br>
					<a class="btn btn-success">
						${cbots[i].totalvotes.toLocaleString()} votes
					</a>
				</div>
			</div>
			</div>
`
		}
	}
	
	cbots.sort(function(a, b) {
		if(a.approved == true && b.approved == true){
  			return b.additiontimestamp - a.additiontimestamp;
		}
	});
	
	let newly = ""
	
	for(var i in cbots){
		if(cbots[i].approved == true && i < 6){
			let vanity = cbots[i].botid
			if(cbots[i].vanity !== undefined && cbots[i].vanity !== ""){
				vanity = cbots[i].vanity
			}
			
			let filter = 0
			if(cbots[i].category.includes("NSFW")){
				filter = 15
			}
			newly += `
			<div class="col-sm-4">
				<div class="card text-center" onclick="javascript: window.location.href = '/bots/${vanity}'">
				<div class="card-body">
					<img src="${cbots[i].botavatar}" style="border-radius:50%; filter: blur(${filter}px);" height="125px">
					<br>
					<h5 class="card-title">
						${cbots[i].bottag}
					</h5>
					<p class="card-text" style="height: 20px; overflow: hidden;">
						${cbots[i].shortdescription}
					</p>
					<a class="btn btn-primary">
						${cbots[i].guildcount.toLocaleString()} servers
					</a>
					<a class="btn btn-info">
						${cbots[i].shardcount.toLocaleString()} shards
					</a>
					<br>
					<br>
					<a class="btn btn-success">
						${cbots[i].totalvotes.toLocaleString()} votes
					</a>
				</div>
			</div>
			</div>
`
		}
	}
	
	cbots.sort(function(a, b) {
		if(a.approved == true && b.approved == true){
			let lastbumpa = 0;
			let lastbumpb = 0;
			if(a.lastbumped != undefined)lastbumpa = a.lastbumped
			if(b.lastbumped != undefined)lastbumpb = b.lastbumped
  			return lastbumpb - lastbumpa;
		}
	});
	
	let bumped = ""
	
	for(var i in cbots){
		if(cbots[i].approved == true && i < 6){
			let vanity = cbots[i].botid
			if(cbots[i].vanity !== undefined && cbots[i].vanity !== ""){
				vanity = cbots[i].vanity
			}
			
			let filter = 0
			if(cbots[i].category.includes("NSFW")){
				filter = 15
			}
			bumped += `
			<div class="col-sm-4">
				<div class="card text-center" onclick="javascript: window.location.href = '/bots/${vanity}'">
				<div class="card-body">
					<img src="${cbots[i].botavatar}" style="border-radius:50%; filter: blur(${filter}px);" height="125px">
					<br>
					<h5 class="card-title">
						${cbots[i].bottag}
					</h5>
					<p class="card-text" style="height: 20px; overflow: hidden;">
						${cbots[i].shortdescription}
					</p>
					<a class="btn btn-primary">
						${cbots[i].guildcount.toLocaleString()} servers
					</a>
					<a class="btn btn-info">
						${cbots[i].shardcount.toLocaleString()} shards
					</a>
					<br>
					<br>
					<a class="btn btn-success">
						${cbots[i].totalvotes.toLocaleString()} votes
					</a>
				</div>
			</div>
			</div>
`
		}
	}
	
	
	res.send(require("./main.js").replace(/{{bumpedbots}}/g, bumped).replace(/{{bots}}/g, bot).replace(/{{featuredbots}}/g, cbot).replace(/{{newbots}}/g, newly))
})

app.get("/addbot", function (req, res) {
	res.send(require("./submit.js"))
})

app.get("/bots/:id/edit", async function (req, res) {
let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.cookies.access_token, "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	
	if(userdata.error == true)return res.redirect("https://aerobotlist.com")
	
const cityRef = db.collection('bots').doc(req.params.id);
const doc = await cityRef.get();
if (!doc.exists) {
	res.json({ error: true, message: "Cannot find the bot to edit." })
}else{
	let botdata = doc.data()
	if(botdata.ownerid !== userdata.id)return res.redirect("https://aerobotlist.com")
	let vanicode = ""
	if(botdata.vanity !== undefined){
		vanicode = botdata.vanity;
	}
	let vanity = `
<label style="display: none;" for="vanity">Vanity URL(Optional)</label>
    <br style="display: none;">
    <input type="text" name="vanity" value="${vanicode}" style="display: none;" placeholder="aero" id="vanity">
    <br style="display: none;">
`
	if(botdata.featured == true){
		vanity = `
<label for="vanity">Vanity URL(Optional)</label>
    <br>
    <input type="text" name="vanity" value="${vanicode}" placeholder="aero" id="vanity">
    <br>
`
	}
	res.send(require("./edit.js").replace(/{{vanity}}/g, vanity).replace(/{{bottag}}/g, botdata.bottag).replace(/{{invite}}/g, botdata.invite).replace(/{{website}}/g, botdata.website).replace(/{{supportserver}}/g, botdata.supportserver).replace(/{{longdescription}}/g, botdata.longdescription).replace(/{{shortdescription}}/g, botdata.shortdescription).replace(/{{category}}/g, JSON.stringify(botdata.category)).replace(/{{prefix}}/g, botdata.prefix).replace(/{{library}}/g, botdata.library).replace(/{{botid}}/g, botdata.botid))
}
})


app.get("/login", function (req, res) {
	res.redirect("https://discord.com/oauth2/authorize?client_id=772298155168628777&redirect_uri=https%3A%2F%2Faerobotlist.com%2Flogin%2Fcallback&response_type=code&scope=guilds.join%20identify")
})

app.post("/botsubmission", async function (req, res) {
	console.log(req.body)
	console.log("yesss")
	if(!req.header("ownerid"))return res.json({ error: true, message: "OwnerID must be provided!" })
	if(!req.header("botid"))return res.json({ error: true, message: "BotID must be provided!" })
	let user = await client.users.fetch(req.header("ownerid"))

if (!client.guilds.cache.get('772263461044486175').members.cache.has(req.header("ownerid")))return res.json({ error: true, message: "You must be in our server to submit a bot! Here is the server invite: https://discord.gg/2Tfhn6eNPF" })
	let bot = await client.users.fetch(req.header("botid"))
	if(bot == undefined)return res.json({ error: true, message: "Cannot Find the bot on discord!" })
	if(bot.bot == false)return res.json({ error: true, message: "That is not a bot!" })
	const rRef = db.collection('bots').doc(bot.id);
	const rdoc = await rRef.get();
	if(rdoc.exists)rRef.delete()
	
	const cityRef = db.collection('bots').doc(bot.id);
	const doc = await cityRef.get();
	if(doc.exists)return res.json({ error: true, message: "Bot Already Exists." });
	
const data = {
  botusername: bot.username,
  bottag: bot.tag,
  botdiscriminator: bot.discriminator,
  botid: bot.id,
  botavatar: bot.displayAvatarURL(),
  ownerid: user.id,
  ownerusername: user.username,
  ownerdiscriminator: user.discriminator,
  ownertag: user.tag,
  owneravatar: user.displayAvatarURL(),
  category: req.body.category,
  library: req.body.library,
  prefix: req.header("prefix"),
  supportserver: req.header("supportserver"),
  website: req.header("website"),
  invite: req.header("invite"),
  shortdescription: req.header("shortdescription"),
  longdescription: req.body.longdescription,
  approved: false,
  guildcount: 0,
  shardcount: 0,
  featured: false,
  votes: [],
  totalvotes: 0,
  apitoken: makeid(40),
  additiontimestamp: new Date().getTime(),
  vanity: "",
  reviews: []
};

// Add a new document in collection "cities" with ID 'LA'
db.collection('bots').doc(bot.id).set(data);
client.channels.cache.get("772339179517902858").send(`📭 <@${user.id}>(\`${user.tag}\`) added <@${bot.id}>(\`${bot.tag}\`) to the approval queue.(<@&772266614597877791>)`)
res.json({ error: false, message: "Success! Your bot is now submitted!" })
})

app.post("/botedit", editlimiter, async function (req, res) {
	console.log(req.body)
	console.log("yesss")
	if(!req.header("ownerid"))return res.json({ error: true, message: "OwnerID must be provided!" })
	if(!req.header("botid"))return res.json({ error: true, message: "BotID must be provided!" })
	let user = await client.users.fetch(req.header("ownerid"))

if (!client.guilds.cache.get('772263461044486175').members.cache.has(req.header("ownerid")))return res.json({ error: true, message: "You must be in our server to have a bot! Here is the server invite: https://discord.gg/2Tfhn6eNPF" })
	let bot = await client.users.fetch(req.header("botid"))
	if(bot == undefined)return res.json({ error: true, message: "Cannot Find the bot on discord!" })
	if(bot.bot == false)return res.json({ error: true, message: "That is not a bot!" })
	const cityRef = db.collection('bots').doc(bot.id);
	const doc = await cityRef.get();
	if(!doc.exists)return res.json({ error: true, message: "Bot Do Not Exist." });
	let coll = await getCollection("bots")
	let vavai = true
	for(var i in coll){
		if(coll[i].vanity == req.header("vanity") && req.header("vanity") !== "" && coll[i].botid !== req.header("botid")){
			vavai = false;
		}
	}
	if(vavai == false)return res.json({ error: true, message: "The vanity url code provided is already taken!" })
	
const data = {
  botusername: bot.username,
  bottag: bot.tag,
  botdiscriminator: bot.discriminator,
  botid: bot.id,
  botavatar: bot.displayAvatarURL(),
  ownerid: user.id,
  ownerusername: user.username,
  ownerdiscriminator: user.discriminator,
  ownertag: user.tag,
  owneravatar: user.displayAvatarURL(),
  category: req.body.category,
  library: req.body.library,
  prefix: req.header("prefix"),
  supportserver: req.header("supportserver"),
  website: req.header("website"),
  invite: req.header("invite"),
  shortdescription: req.header("shortdescription"),
  longdescription: req.body.longdescription,
  vanity: req.header("vanity")
};

// Add a new document in collection "cities" with ID 'LA'
db.collection('bots').doc(bot.id).update(data);
client.channels.cache.get("772339179517902858").send(`🔄 <@${user.id}>(\`${user.tag}\`) edited <@${bot.id}>(\`${bot.tag}\`)`)
res.json({ error: false, message: "Success! Your bot has been successfully edited!" })
})



app.get("/login/callback", async function (req, res) {
	let token = req.query.code;
	const data = {
	client_id: '772298155168628777',
	client_secret: 'PV1Qq4ZD2MjLWa0Pkd3D9KC-mPFVL9oF',
	grant_type: 'authorization_code',
	redirect_uri: 'https://aerobotlist.com/login/callback',
	code: token
	};

	let auth = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
	let authtoken = await auth.json()
	
	let udata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + authtoken.access_token, "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	let avatar
	
	const joindata = {
		access_token: authtoken.access_token
	};

	let jdata = await fetch('https://discord.com/api/guilds/772263461044486175/members/' + userdata.id, {
		method: 'PUT',
		body: JSON.stringify(joindata),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': "Bot " + bottoken
		},
	})
	
	if(userdata.avatar !== null){
		avatar = "https://cdn.discordapp.com/avatars/" + userdata.id + "/" + userdata.avatar + ".png"
	}else{
		avatar = `https://cdn.discordapp.com/embed/avatars/${userdata.discriminator % 5}.png`
	}
	res.redirect(`https://aerobotlist.com?id=${userdata.id}&username=${userdata.username}&avatar=${avatar}&discriminator=${userdata.discriminator}&access_token=${authtoken.access_token}`)
})

app.get("/users/:id", async function (req, res) {
	
	let udata = await fetch('https://discord.com/api/users/' + req.params.id, { headers: { "Authorization": "Bot " + bottoken, "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	let avatar
	
	if(userdata.avatar !== null){
		avatar = "https://cdn.discordapp.com/avatars/" + userdata.id + "/" + userdata.avatar + ".png"
	}else{
		avatar = `https://cdn.discordapp.com/embed/avatars/${userdata.discriminator % 5}.png`
	}
	
	let useravatar = avatar;
	let userusername = userdata.username;
	let userdiscriminator = userdata.discriminator;

	
	let bot = "";
	let bots = await getCollection("bots")
	for(var i in bots){
		if(bots[i].ownerid == req.params.id){
			let vanity = bots[i].botid
			if(bots[i].vanity !== undefined && bots[i].vanity !== ""){
				vanity = bots[i].vanity
			}
			
			
	let filter = 0;
	if(bots[i].category.includes("NSFW")){
		filter = 15
	}
			
			bot += `
			<div class="col-sm-4">
				<div class="card text-center" onclick="javascript: window.location.href = '/bots/${vanity}'">
				<div class="card-body">
					<img src="${bots[i].botavatar}" style="border-radius:50%; filter: blur(${filter}px);" height="125px">
					<br>
					<h5 class="card-title">
						${bots[i].bottag}
					</h5>
					<p class="card-text" style="height: 20px; overflow: hidden;">
						${bots[i].shortdescription}
					</p>
					<a class="btn btn-primary">
						${bots[i].guildcount.toLocaleString()} servers
					</a>
					<a class="btn btn-info">
						${bots[i].shardcount.toLocaleString()} shards
					</a>
					<br>
					<br>
					<a class="btn btn-success">
						${bots[i].totalvotes.toLocaleString()} votes
					</a>
				</div>
			</div>
			</div>
`
		}
	}
	
	let resubdropdown = ""
	let resubmitdata = ""
	
	if(req.cookies.access_token !== undefined){
	let rdata = await fetch('https://discord.com/api/users/@me', { headers: { "Authorization": "Bearer " + req.cookies.access_token, "Content-Type": "application/json" }  })
	
	let resubdata = await rdata.json()
	
	console.log(resubdata, req.cookies.access_token)
	
	if(req.params.id == resubdata.id){
		
	
	
	let resubmit = await getResubmitBotCollection()
	
		for(var i in resubmit){
			if(resubmit[i].ownerid == resubdata.id){
				resubdropdown += `<option value="${resubmit[i].botid}">${resubmit[i].bottag}</option>`
			}
		}
		
		resubmitdata = `
	<div class="featured text-center justify-content-center" id="userbots" >
  <br />
  <br />
  <h1>Resubmit Denied Bots</h1>
  <br />
<label for="resubmitdropdow">Choose a bot:</label>

<select id="resubmitdropdown" style="width: 75%; position: relative; left: 12.5%;" class="form-control">
	${resubdropdown}
</select>
<br>
<a class="btn btn-primary" onclick="resubmit()">Resubmit</a>

<br>
<br>
<br>
</div>
`
		
	}
		
	}
	
	
	res.send(require("./users.js").replace(/{{resubmit}}/g, resubmitdata).replace(/{{bots}}/g, bot).replace(/{{userusername}}/g, userdata.username).replace(/{{userdiscriminator}}/g, userdata.discriminator).replace(/{{useravatar}}/g, avatar))
})

app.get("/getuser/:id", async (req, res) => {
	let udata = await fetch('https://discord.com/api/users/' + req.params.id, { headers: { "Authorization": "Bot " + bottoken, "Content-Type": "application/json" }  })
	
	let userdata = await udata.json()
	let avatar
	
	if(userdata.avatar !== null){
		avatar = "https://cdn.discordapp.com/avatars/" + userdata.id + "/" + userdata.avatar + ".png"
	}else{
		avatar = `https://cdn.discordapp.com/embed/avatars/${userdata.discriminator % 5}.png`
	}
	
	userdata["avatar"] = avatar
	
	res.json(userdata)
})

const ssloptions = {
  key: fs.readFileSync("./selfsigned.key"),
  cert: fs.readFileSync("./selfsigned.crt")
};

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

const https = require("https")
const http = require("http")

https.createServer(ssloptions, app).listen(443);

http.createServer(ssloptions, app).listen(80);
client.on("ready", () => {
	

	
	console.log("online!")

})






client.on("message", async(msg) => {
	if(msg.author.bot)return;
	if(msg.channel.type !== "text")return;
	let args = msg.content.split(" ")
	if(msg.content.startsWith("a!botinfo")){
		let member = msg.mentions.users.first()
		
		if(!member)return msg.channel.send("Please mention a bot.")
		if(member.bot == false)return msg.channel.send("Thats not a bot! Mention a bot instead.")
		
const cityRef = db.collection('bots').doc(member.id);
const doc = await cityRef.get();
if (!doc.exists) {
  msg.channel.send("Cannot find the bot on the list! Please mention a bot that is on the list");
} else {
  let ddata = doc.data();
   let botss = await client.users.fetch(ddata.botid)
   let userss = await client.users.fetch(ddata.ownerid)
   let embed = new Discord.MessageEmbed()
   	.setTitle(botss.tag)
   	.setDescription(ddata.shortdescription)
   	.addField("Server Size", ddata.guildcount, true)
   	.addField("Shard Size", ddata.shardcount, true)
   	.addField("Votes", ddata.totalvotes, true)
   	.addField("Website", ddata.website, true)
   	.addField("Invite", `[Invite](${ddata.invite})`, true)
   	.addField("Bot Page", `[Take Off](https://aerobotlist.com/bots/${botss.id})`)
   	.setColor("BLURPLE")
   	.setThumbnail(botss.displayAvatarURL())
   	.setAuthor(userss.tag, userss.displayAvatarURL());
	
	msg.channel.send(embed)
}
	}
})

client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith("a!" + "eval")) {
    if(["539195184357965833", 539195184357965833, 381710555096023061, "381710555096023061"].includes(message.author.id) == false)return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

app.use(function(req, res, next){
    res.status(404).send(require("./404.js"))
});


client.login(bottoken)
