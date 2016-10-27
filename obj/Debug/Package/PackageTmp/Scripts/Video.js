var video_out = $("#vid-box");
var chat_box = $("#chat-box");
var pub_key = "pub-c-9d0d75a5-38db-404f-ac2a-884e18b041d8";
var sub_key = "sub-c-4e25fb64-37c7-11e5-a477-0619f8945a4f";
var standby_suffix = "-stdby";
var userId;

function connectVideo() {
    userId = "Dispatch"
    var userIdStdBy = userId + standby_suffix;
    var pubnub = window.pubnub = PUBNUB({
        publish_key: pub_key,
        subscribe_key: sub_key,
        uuid: userId
    });

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
                    console.log(JSON.stringify(m))
                }
            });
            console.log("Subscribed and ready!");
        }
    });
    return false;
}

function phoneStart() {
    var phone = window.phone = PHONE({
        number: userId || "Anonymous", // listen on username line else Anonymous
        publish_key: pub_key, // Your Pub Key
        subscribe_key: sub_key, // Your Sub Key
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

// {'call_user':'user','call_time':987654321}
function incomingCall(m) {
    video_out.innerHTML = "Connecting...";
    setTimeout(function () {
        if (!window.phone) phoneStart();
        phone.dial(m["call_user"]);
    }, 2000);
}

function end() {
    if (window.phone) window.phone.hangup();
}

function message(session, message) {
    add_chat(session.number, message);
}

function add_chat(number, message) {
    console.log(number + ": " + message);
    chat_box.innerHTML = "<p>" + number + " (" + formatTime(message["msg_timestamp"]) + "): " + message["msg_message"] + "</p>" + chat_box.innerHTML;
}

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

// Will format in 12-hour h:mm.s a time format
function formatTime(millis) {
    var d = new Date(millis);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var a = (Math.floor(h / 12) === 0) ? "am" : "pm";
    return (h % 12) + ":" + m + "." + s + " " + a;
}