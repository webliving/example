
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    onOffline:function(){
        navigator.notification.confirm('设备离线', null , '提示', '确定');
    },
    onOnline:function(){
        navigator.notification.confirm('设备连接网络', null , '提示', '确定');
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        /*$.extend($.mobile ,{
            defaultPageTransition: 'none'
            ,loadingMessageTextVisible:true
//                ,showPageLoadingMsg:true
//                ,hidePageLoadingMsg:true
            ,loadingMessage:'载入中...'
        });

        $.mobile.ajaxEnabled = false;
        $.mobile.allowCrossDomainPages=true;*/

        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);

        var that=this;

        deviceInfo();
        // 检测网络连接
        checkConnection();
        // 检测网络类型
        check_network();

        toggleCompass();
        // 返回键
//        document.addEventListener("backbutton", eventBackButton, false);
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// 检测网络连接
 function checkConnection() {
    var networkState = navigator.network.connection.type;
    if( networkState == Connection.NONE ) {
        navigator.notification.confirm('请确认网络连接已经开启', showAlert , '提示', '确定,取消');
    }
}

function showAlert(button) {
    // 点击确定
    if( button==1 ) {
        // 退出 app
        navigator.app.exitApp();
    }
    return false;
}
// 检测网络连接 end

// 检测回退按钮
function eventBackButton(){
    navigator.notification.confirm('确认退出？', showConfirm, '退出软件', '确定,取消');
}
function showConfirm(button) {
    if( button==1 ) {
        document.removeEventListener("backbutton", eventBackButton, false); //注销返回键
        navigator.app.exitApp();
    }
}
// 检测回退按钮 end



var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
            updateAcceleration, function(ex) {
                alert("accel fail (" + ex.name + ": " + ex.message + ")");
            }, options);
    }
};



// 相机功能
function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = data;
}

function fail(msg) {
    alert(msg);
}
// 相机功能
function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

// 获取联系人
function contacts_success(contacts) {
//    alert(contacts[2].name.formatted);
    for(var i= 0,k=contacts.length;i<k;i++){
        $('<p/>',{
//            text:contacts[i].name.formatted
            text:contacts[i].displayName
        }).appendTo($('body'));
    }
    /*alert(contacts.length
        + ' contacts returned.'
        + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
        : ''));*/
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
        [ "displayName", "name" ], contacts_success,
        fail, obj);
}

// 获取联系人 end

// 检测网络类型
function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

//    confirm('Connection type:\n ' + states[networkState],'网络类型');
}

// 罗盘
var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else {
        // 毫秒为单位的时间间隔
        var options = { frequency: 1000 };
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}
// 罗盘 end

var preventBehavior = function(e) {
    e.preventDefault();
};
/*
function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}*/


// 应用初始化
app.initialize();