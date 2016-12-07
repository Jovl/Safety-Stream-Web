//Definition of video variables 
var video_out = document.getElementById("vid-box");
var chat_box = document.getElementById("chat-box");
var chat_msg = document.getElementById("chat-msg");
var pub_key = "pub-c-9d0d75a5-38db-404f-ac2a-884e18b041d8";
var sub_key = "sub-c-4e25fb64-37c7-11e5-a477-0619f8945a4f";
var standby_suffix = "-stdby";
var userId = "Dispatch";

//Begin Call Listener 
function BeginSession()
{
    var userIdStdBy = userId + standby_suffix;
    //Define PubNub connection
    var pubnub = window.pubnub = PUBNUB
    ({
        publish_key: pub_key,
        subscribe_key: sub_key,
        uuid: userId
    });

    //Subscribe using PubNub connection definitions 
    pubnub.subscribe({
        channel: userIdStdBy,
        message: incomingCall,
        connect: function (e)
        {
            pubnub.state
            ({
                channel: userIdStdBy,
                uuid: userId,
                state: { "status": "Available" },
                callback: function (m)
                {
                    //Success call back 
                    console.log(JSON.stringify(m))
                }
            });
            console.log("Subscribed and ready!");
        }
    });
    return false;
}
//Define phone
function phoneStart()
{
    var phone = window.phone = PHONE
    ({
        number: userId,
        publish_key: pub_key,
        subscribe_key: sub_key,
    });
    //Success callback phone is ready to recieve call
    phone.ready(function ()
    {
        console.log("Phone ON!");
    });
    phone.receive(function (session)
    {
        session.message(message);
        session.connected(function (session)
        {
            //Append video to div container
            video_out.innerHTML = "";
            video_out.appendChild(session.video);
        });
        session.ended(function (session) { video_out.innerHTML = ''; });
    });
}
function incomingCall(m)
{
    video_out.innerHTML = "Connecting...";
    setTimeout(function ()
    {
        if (!window.phone) phoneStart();
        phone.dial(m["call_user"]);
    }, 2000);
}

//End session 
function EndSession()
{
    if (window.phone) window.phone.hangup();
}

//Send chat message
function message(session, message)
{
    add_chat(session.number, message);
}

function add_chat(number, message)
{
    //Append message and chat number to div container
    console.log(number + ": " + message);
    chat_box.innerHTML = "<p>" + number + " (" + formatTime(message["msg_timestamp"]) + "): " + message["msg_message"] + "</p>" + chat_box.innerHTML;
}

//Publish message via PubNub
function SendMessage()
{
    var msg = chat_msg.value;
    if (msg === '' || !window.phone) return alert("Not in a call.");
    var chatMsg = { 'msg_uuid': userId, 'msg_message': msg, 'msg_timestamp': new Date().getTime() };
    phone.send(chatMsg);
    console.log(msg);
    add_chat(userId, chatMsg);
}

//Corrext data and time formating 
function formatTime(time)
{
    var d = new Date(time);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var a = (Math.floor(h / 12) === 0) ? "am" : "pm";
    return (h % 12) + ":" + m + "." + s + " " + a;
}