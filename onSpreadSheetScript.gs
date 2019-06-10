var sheet   = SpreadsheetApp.getActiveSheet();
var backtrack = new BacktrackSequence()

function test() {
        var mes = new SlackMessage()
        mes.message = "てすとめっせーじじゃよ～"
        mes.post()
}

function doPost(e) {
  Logger.log(e);
  if (e.parameter.token == /*SlackOutgoingWebHookToken*/) {
    //if (e.parameter.user_name != "slackbot") {
      post(e);
      countPost();
      if (backtrack.decCount() == 0) {
        var mes = new SlackMessage(JSON.stringify(e.parameter))
        mes.post()
      }
    //}
    
  }
}

function Hakase() {
//  return new SlackMessage('博士', ':hakase:', '')
}

function SlackMessage() {
  return new SlackMessage('')
}
function SlackMessage(text) {
  this.postUrl  = /*SlackIncomingWebHookUrl*/;
  this.username = '博士';
  this.icon     = ':hakase:';
  this.text     = text;
}
SlackMessage.prototype.toResponce = function() {
  var jsonData = 
      {
        "username" : this.username,
        "icon_emoji": this.icon,
        "text" : this.text
      };
  return {
           "method" : "post",
           "contentType" : "application/json",
           "payload" : JSON.stringify(jsonData)
         };
}
SlackMessage.prototype.post = function() {
  UrlFetchApp.fetch(this.postUrl, this.toResponce());
}

function post(e) {
  var text = e.parameter.text;
  var post = true
  var message = new SlackMessage()
  
  if (false) {
  } else if (e.parameter.bot_name == "ブロンド女性") {
    if (text == "ころすぞ") {
      message.text = "こわい"
    } else if (/.*(\?|？)$/.test(text)) {
      message.text = "そうじゃないよ"
    }
  } else if (text == "コナンくん") {
    message.text = 'わしじゃよ';
  } else if (/.*？$/.test(text)) {
    message.text = 'そうじゃよ～';
  } else if (/.*\?$/.test(text)) {
    message.text = 'soujayo~';
  } else if (text.indexOf(':hakase:') == 0) {
    var splitText = text.split(" ")
    message.text = '博士じゃよ～';
    if (splitText[1] == '-v') {
      message.text = 'HAKASE=prototype on GAS ver.1.1';
    }else if (splitText[1] == '-a') {
      backtrack.setCount(splitText[2])
    }
  } else { post = false }
  
  if (post == true)
    message.post()
}


function countPost(){
  var apology = new ApologyCount();
  var count = apology.incCount();
  var min = 10;
  var max = 20;
  var random = Math.floor( Math.random() * (max + 1 - min) ) + min ;
  if (random < (count)|| random == 10.0) {
    apology.setCount(1);
    var message = new SlackMessage("ごめんなさい")
    message.post()
  }
}




function ApologyCount() {
  this.sheet  = sheet;
  this.row    = 1;
  this.column = 1;
}
ApologyCount.prototype.getCount = function() 
  { return this.sheet.getRange(this.row, this.column).getValue(); }
ApologyCount.prototype.incCount = function()
  { return this.setCount(this.getCount() + 1); }
ApologyCount.prototype.setCount = function(num) {
  this.sheet.getRange(this.row, this.column).setValue(num);
  return num
}

function BacktrackSequence() {
  this.sheet  = sheet;
  this.row    = 1;
  this.column = 2;
}
BacktrackSequence.prototype.getCount = function()
 { return this.sheet.getRange(this.row, this.column).getValue(); }
BacktrackSequence.prototype.decCount = function() {
  var count = this.getCount()
  if (count < 0) { return -1; }
  return this.setCount(count - 1);
}
BacktrackSequence.prototype.setCount = function(num) {
  this.sheet.getRange(this.row, this.column).setValue(num);
  return num;
}
