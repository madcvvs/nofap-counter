const http = require('http');
const express = require('express');
const path = __dirname + '/html/';
const app = express();
const router = express.Router();

var requestify = require('requestify');
var moment = require('moment');
var linereader = require('line-reader');
var colors = require('colors');
var server = app.listen(80)
var io = require('socket.io').listen(server);

var dayzero = moment("20180112", "YYYYMMDD");
var current = moment().format("YYYYMMDD");

// 01-12-2018 12:35:40
// 20180112

function stage() {
    if (dayzero.diff(current, 'days') >= -1) {
        return "Relapse (0-1 days)";
    } else if (dayzero.diff(current, 'days') <= -1 && (dayzero.diff(current, 'days')) >= -15) {
        return "Dilettantism (appr. 1-15 days)";
    } else if (dayzero.diff(current, 'days') <= -15 && (dayzero.diff(current, 'days')) >= -25) {
        return "The Void (appr. 15-25 days)";
    } else if (dayzero.diff(current, 'days') <= -25 && (dayzero.diff(current, 'days')) >= -60) {
        return "Pubery (appr. 25-60 days)";
    } else if (dayzero.diff(current, 'days') <= -60 && (dayzero.diff(current, 'days')) >= -90) {
        return "Welcome To The Machine (appr. 60-90 days)";
    } else if (dayzero.diff(current, 'days') <= -90 && (dayzero.diff(current, 'days')) >= -365) {
        return "The Great Salt Desert (appr. 90-365 days)";
    } else {
      return "Transcended (appr. 365+ days)";
    }
};

function achivement() {
    achivements = [];

    if (dayzero.diff(current, 'days') <= 0) {
        achivements.push("🤔");
    } else {
        achivements.push("<div class=\"locked\">🤔</div>");
    }
    if ((dayzero.diff(current, 'days')-1) <= -7) {
        achivements.push("😋");
    } else {
        achivements.push("<div class=\"locked\">😋</div> " + dayzero.diff(current, 'days'));
    }
    if ((dayzero.diff(current, 'days')-1) <= -10) {
        achivements.push("🔥");
    } else {
        achivements.push("<div class=\"locked\">🔥</div>");
    }
    if ((dayzero.diff(current, 'days')-1) <= -30) {
        achivements.push("💪");
    } else {
        achivements.push("<div class=\"locked\">💪</div>");
    }
    if ((dayzero.diff(current, 'days')-1) <= -91) {
        achivements.push("🙏");
    } else {
        achivements.push("<div class=\"locked\">🙏")
    }
    if ((dayzero.diff(current, 'days')-1) <= -100) {
        achivements.push("💯");
    } else {
        achivements.push("<div class=\"locked\">💯</div>");
    }
    if ((dayzero.diff(current, 'days')-1) <= -182) {
        achivements.push("🙌");
    } else {
        achivements.push("<div class=\"locked\">🙌")
    }
    if ((dayzero.diff(current, 'days')-1) <= -365) {
        achivements.push("💥");
    } else {
        achivements.push("<div class=\"locked\">💥")
    }
    return achivements;
}

console.log("You started nofap " + dayzero.fromNow().underline.green + ". Keep it up!")
console.log("You are currently on stage: " + stage().red);
console.log(achivement());
// requestify.post("https://api.pushover.net/1/messages.json", {
//     token: 'acg33kh8uxm7tzcbpxhsg1mtkt7i3x',
//     user: 'uf66n8c3uspr7p39kcs415c6ei8ium',
//     message: 'You\'ve been on nofap for ' + (dayzero.diff(current, 'days')-1)*-1 + ' days. Keep it up!',
//     title: 'New nofap record'
// }).then(function(response) {
//     response.getBody();
//     response.body();
//     console.log("Sent");
// });

// router.use(function (req,res,next) {
//   console.log("/" + req.method);
//   next();
// });

moment.fn.fromNowOrNow = function (a) {
    if (Math.abs(moment().diff(this)) < 1000) { // 1000 milliseconds
        return 'Just now';
    }
    return this.fromNow(a);
}

io.on('connection', function(socket){
  socket.emit('days', { description: dayzero.fromNow()});
  socket.emit('stage', { description: stage()});
  socket.emit('achivement', { description: achivement()});
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/",router);
app.use("/js/:name", function(req, res){
        res.sendFile(path + "js/" + req.params.name)
});
app.use("/js/:name", function(req, res){
    res.sendFile(path + "js/" + req.params.name)
});
app.use("/img/:name", function(req, res){
    res.sendFile(path + "img/" + req.params.name)
});
app.use("/css/:name", function(req, res){
    res.sendFile(path + "css/" + req.params.name)
});
app.use("*/:name",function(req,res){
  res.sendFile(path + "/" + req.params.name)
});
