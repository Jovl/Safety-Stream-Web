//Define HTML DOM elements, PubNub API keys, and current dispatcher properties 
var video_out = $("#vid-box");
var chat_box = $("#chat-box");
var pub_key = "pub-c-9d0d75a5-38db-404f-ac2a-884e18b041d8";
var sub_key = "sub-c-4e25fb64-37c7-11e5-a477-0619f8945a4f";
var standby_suffix = "-stdby";
var userId;

//Initalize PubNub WebRTC video 
function connectVideo() {
    userId = "Dispatch";
    var userIdStdBy = userId + standby_suffix;
    var pubnub = window.pubnub = PUBNUB({
        publish_key: pub_key,
        subscribe_key: sub_key,
        uuid: userId
    });

    //PubNub subscribe properties and await call 

    pubnub.subscribe({
        channel: userIdStdBy,
        message: incomingCall,
        connect: function (e) {
            pubnub.state({
                channel: userIdStdBy,
                uuid: userId,
                state: {
                    "status": "Available"
                },
                callback: function (m) {
                    console.log(JSON.stringify(m));
                }
            });
            console.log("Subscribed and ready!");
        }
    });
    return false;
}

//Definition of a PubNub phone
function phoneStart() {
    var phone = window.phone = PHONE({
        number: userId,
        publish_key: pub_key,
        subscribe_key: sub_key
    });
    phone.ready(function () {
        console.log("Phone ON!");
    });
    phone.receive(function (session) {
        session.message(message);
        session.connected(function (session) {
            video_out.innerHTML = "";
            video_out.appendChild(session.video);
        });
        session.ended(function (session) {
            video_out.innerHTML = '';
        });
    });
}
//Notification for incoming call 
function incomingCall(m) {
    video_out.innerHTML = "Connecting...";

    //If call times out and is never connected call client back 
    setTimeout(function () {
        if (!window.phone) phoneStart();
        phone.dial(m["call_user"]);
    }, 2000);
}

//End call with client
function end() {
    if (window.phone) window.phone.hangup();
}
//Add message to chat log
function message(session, message) {
    add_chat(session.number, message);
}
//Chat Log
function add_chat(number, message) {
    console.log(number + ": " + message);
    chat_box.innerHTML = "<p>" + number + " (" + formatTime(message["msg_timestamp"]) + "): " + message["msg_message"] + "</p>" + chat_box.innerHTML;
}
//Send PubNub chat message 
function sendMessage() {
    var msg = $("chat_msg").val();
    console.log(msg);
    if (msg === '' || !window.phone) return alert("Not in a call.");
    var chatMsg = {
        'msg_uuid': safetxt(userId),
        'msg_message': safetxt(msg),
        'msg_timestamp': new Date().getTime()
    };
    phone.send(chatMsg);
    console.log(msg);
    add_chat("Me: ", chatMsg);
}

//Format message time stamp 12-hour h:mm.s time format
function formatTime(millis) {
    var d = new Date(millis);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var a = Math.floor(h / 12) === 0 ? "am" : "pm";
    return h % 12 + ":" + m + "." + s + " " + a;
}