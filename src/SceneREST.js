

class SceneREST extends Phaser.Scene {

    constructor() {

        super("SceneREST");
    }

    create() {
        
    }
    
}

function RestCreateMsg (scene, username) {

    var content = scene.writeTextChat.getChildByName('Chat').value;
    scene.writeTextChat.getChildByName('Chat').value = "";

    var msg = {
        userName: username,
        content: content,
        serverInfo: false,
    }

        //No enviar mensajes vacíos
    if(content != "")
        createMsg(scene, msg);
}
//Create user in server
function createMsg(scene, msg) {
    $.ajax({
        method: "POST",
        url: urlServer+'/messages',
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (msg) {
        ////console.log("Message created: " + JSON.stringify(msg));
        loadMsgs(scene);
    })
}
//Load users from server
function loadMsgs(scene) {

    $.ajax({
        url: urlServer+'/messages',

    }).done(function (msgs) {
        ////console.log('Messages loaded: ' + JSON.stringify(msgs));

        if (msgs.length != scene.chatContent.length) {

            lineasChat = 0;
            for (var i=0; i < msgs.length; i++) {

                if (msgs[i].serverInfo) {

                    scene.chatContent[i] = msgs[i].userName + " " + msgs[i].content;
                }
                else {

                    scene.chatContent[i] = msgs[i].userName + ": " + msgs[i].content;
                }
                
                
                lineasChat += Math.ceil(scene.chatContent[i].length/35);
            }
            ////console.log("lineasChat: " + lineasChat);
            
            scene.chatText.setText(scene.chatContent);
            if (lineasChat < 21) {
                scene.chatText.y = (game.config.height/5+10);
            }
            else {
                scene.chatText.y = (game.config.height/5+10)-(25*(lineasChat-1)-(20*25));
            }
        }

    })
}
//Show item in page
function showMsg(msg) {

    //console.log("Mensajes: " + msg.content);
}


function RestCreateUser (scene, name_, pass_, img) {

    var name = name_;
    var pass = sha256(pass_);

    var user = {
        name: name,
        password: pass,
        online: false,
        userImg: img
    }

    CheckUsernameDB(scene, user);

    
    //isServerOnline(scene);
}
//Create user in server
function createUser(scene, user) {

    $.ajax({
        method: "POST",
        url: urlServer+'/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        ////console.log("User created: " + JSON.stringify(user));

        scene.regLogin.getChildByName("user").value = "";
        scene.regLogin.getChildByName("email").value = "";
        scene.regLogin.getChildByName("pass").value = "";
        scene.regLogin.getChildByName("passConfirm").value = "";

        scene.MovinBoxes(scene,3);

        scene.accountText.setColor("green");
        scene.accountText.setText('User created!');
    })
}
//Load users from server
function loadUsers() {
    $.ajax({
        url: urlServer+'/users'
    }).done(function (users) {
        //console.log('Users loaded: ' + JSON.stringify(users));
    })
}

function loadLobby(scene) {
    $.ajax({
        url: urlServer+'/users/online'
    }).done(function (users) {

        scene.lobbyContent = ['Connected users:'];

        for (var i=0; i < users.length; i++) {

            scene.lobbyContent[i+1] = users[i].name;
        }

        if (users.length == 0) {

            scene.lobbyContent[1] = "";
        }

        scene.lobbyText.setText(scene.lobbyContent);
    })
}

function CheckUsernameDB (scene, user) {

    $.ajax({
        method: "POST",
        url: urlServer+'/users/check',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
    }).done(function (b) {

        if (b) {

            scene.accountText.setColor("red");
            scene.accountText.setText('Username already exists');
        }
        else {
            createUser(scene, user);
            //this.MovinBoxes(this,3)
        }
            
    })
}
//
function CheckUserPasswordCorrect(scene, name_, pass_) {

    var name = name_;
    var pass = sha256(pass_);

    var user = {
        name: name,
        password: pass,
        online: false
    }

    $.ajax({
        method: "POST",
        url: urlServer+'/users/checkPassword',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
    }).done(function (b) {

        LoginVisibility(scene, name, b);
    })
}

function setUserOnline(scene, username, online_) {

    RestCreateLoginOutMsg(scene, username, online_);

    var user = {

        name:username,
        password:"",
        online: online_
    }
    $.ajax({
        method: 'PUT',
        url: urlServer+'/users/'+username,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        if (online_) {

            GetUserImg(scene, username);
        }
        else {

            scene.userImage.setFrame(0);
            scene.accountText.setText('You have logged out');
            userName = "Anon";
            scene.MovinBoxes(scene, 2);
        }
            
    })
}

function RestCreateLoginOutMsg (scene, username, logIn) {

    var content_;
    if (logIn) {

        content_ = "HAS LOGGED IN ---";
    }
    else {

        content_ = "HAS LOGGED OUT ---";
    }


    var msg = {
        userName: "--- "+username,
        content: content_,
        serverInfo: true,
    }


    createMsg(scene, msg);
}

function GetUserImg(scene, username){

    $.ajax({
        url: urlServer+'/users/'+username,
        data: username,
    }).done(function (numImg) {
        //console.log("Imagen: " + numImg);
        scene.userImage.setFrame(numImg);
    })

}

function LoginVisibility(scene, username, userExists){

    if (userExists) {

        //Update online to true
        setUserOnline(scene, username, true);

        //Valores por defecto
        scene.accountLogin.getChildByName('user').value = "";
        scene.accountLogin.getChildByName('password').value = "";

        //Imagen de perfil visible
        scene.userImage.setFrame();

        //  Turn off the click events
        scene.accountLogin.removeListener('click');

        //  Hide the login element
        scene.accountLogin.setVisible(false);

        //  Populate the text with whatever they typed in
        userName = username;
        scene.accountText.setColor("white");
        scene.accountText.setText('Welcome, ' + userName + " !");//*/

        scene.CheckLoggedIn(scene);
    }
    else {

        scene.accountText.setColor("red");
        scene.accountText.setText("User or password incorrect, try again");//*/
    }
}

function isServerOnline(scene) {
    $.ajax({
        url: urlServer+'/messages',
        success: function(){
            setOnline(scene, true);
        },
        error: function(){
            setOnline(scene, false);
        },

    }).done(function (msgs) {
        //console.log('Messages loaded: ' + JSON.stringify(msgs));

        //console.log('Historial mensajes: ');
        for (var i=0; i < msgs.length; i++) {

            //console.log(msgs[i].userName + ": " + msgs[i].content);
        }
        
    })
}
function setOnline(scene, b) {

    if (b) {

        scene.serverOnlineTxt.setText("SERVER ONLINE");
    }
    else {

        scene.serverOnlineTxt.setText("SERVER OFFLINE");
    }
}

function updateUsers(scene) {

    $.ajax({
        url: urlServer+'/users/count'
    }).done(function (n) {

        setUsers(scene, n)
    })
}

function setUsers(scene, n) {

    scene.numPlayers = n;
    scene.numPlayersTxt.setText("REGISTERED USERS: " + n);
}


$(document).ready(function() {

    var connection = new WebSocket('ws://127.0.0.1:8080/chat');
    connection.onopen = function(e) {
		console.log("WS abierto");
	}
	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var message = JSON.parse(msg.data)
		$('#chat').val($('#chat').val() + "\n" + message.name + ": " + message.message);
	}
	connection.onclose = function() {
		console.log("Closing socket");
	}


	$('#send-btn').click(function() {
		var msg = {
			name : $('#name').val(),
			message : $('#message').val()
		}
	    $('#chat').val($('#chat').val() + "\n" + msg.name + ": " + msg.message);
		connection.send(JSON.stringify(msg));
	});

})