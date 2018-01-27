const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: '463514',
  key: '0e660fbb1049d403653d',
  secret: 'd25e0fcbc791d89aeaff',
  cluster: 'us2',
  encrypted: true
});

// testing server
app.get('/', function(req, res){ 
  res.send('all is well...');
});

// authenticating users
app.get("/pusher/auth", function(req, res) {
	var query = req.query;
	var socketId = query.socket_id;
	var channel = query.channel_name;
	var callback = query.callback;

	var auth = JSON.stringify(pusher.authenticate(socketId, channel));
	var cb = callback.replace(/\"/g,"") + "(" + auth + ");";

	res.set({
	"Content-Type": "application/javascript"
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
 	app.use(express.static("client/build"));
	} else {
 	app.use(express.static(__dirname + "/client/public"));
}

res.send(cb);
});

app.post('/pusher/auth', function(req, res) {
      var socketId = req.body.socket_id;
      var channel = req.body.channel_name;
      var auth = pusher.authenticate(socketId, channel);
      res.send(auth);
    });

app.set('PORT', process.env.PORT || 5000);

app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('chat', 'message', payload);
  res.send(payload)
});

app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))