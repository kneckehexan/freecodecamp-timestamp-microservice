// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res, next) => {
  if(req.params.date){
    var re = /^\d{13}/g;
    var reDate = re.test(req.params.date) ? Number.parseInt(req.params.date) : req.params.date;
  } else {
    var reDate = new Date();
  }
  req.time = new Date(reDate);
  next();
}, (req, res) => {
  if (Object.prototype.toString.call(req.time) === "[object Date]") {
      // it is a date
    if (isNaN(req.time.getTime())) {
      // d.valueOf() could also work
      return res.json({ error: "Invalid Date" });
    } else {
      // date is valid
      return res.json({
        unix: req.time.getTime(),
        utc: req.time.toUTCString()
      });
    }
  } else {
    // not a date
    return res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
