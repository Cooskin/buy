// ws引入
var ws = require('ws'); //导入ws文件夹
var myWs = ws.Server; //启动服务器
var wss = new myWs({ port: 1711 }); //开启服务端口

console.log('服务已开启~');

// 数据库引入
var sqlite3 = require('sqlite3');
var Database = sqlite3.Database;
// console.log('lao');
var db = new Database('database.db', function(e) {
    if (e == null) {
        console.log('库来了。。。');
    }
});


wss.on('connection', function(socket) {
    // 获取信息
    socket.on('message', function(msg) {
        var oMsg = JSON.parse(msg);

        switch (oMsg.type) {
            case 'userLogin':
                var acc = oMsg.log.acc;
                var pass = oMsg.log.pass;

                var sql = 'select * from tbluser where uAcc=? and uPass=?';
                login(sql, [acc, pass], 'userLogin');

                break;
            case 'bossLogin':
                var acc = oMsg.log.acc;
                var pass = oMsg.log.pass;

                var sql = 'select * from tblshop where sAcc=? and sPass=?';
                login(sql, [acc, pass], 'bossLogin')

                break;
            case 'log':
                var sql = 'select * from tbluser where uId=?';
                db.get(sql, [oMsg.log], function(e, data) {
                    if (e == null) {

                        var obj = {
                            type: 'log',
                            name: data.uName
                        }

                        socket.send(JSON.stringify(obj))
                    }
                })
                break;
            case 'userInfo':
                var sql = 'select * from tbluser where uId=?';
                db.get(sql, [oMsg.log], function(e, data) {
                    if (e == null) {
                        var obj = {
                            type: 'userInfo',
                            userInfo: {
                                name: data.uName,
                                pone: data.uPone,
                                pass: data.uPass.length,
                                gold: data.uGold,
                                address: data.uAddress,
                                hd: data.uHd
                            }
                        }
                        socket.send(JSON.stringify(obj))
                    }
                })
                break;
        }
    })

    function login(str, arr, type) {
        db.get(str, arr, function(e, data) {
            if (e == null) {
                if (data == undefined) {
                    var obj = {
                        type: type,
                        result: '0'
                    }
                } else {
                    if (type == 'userLogin') {
                        var name = data.uName;
                        var id = data.uId;
                    } else {
                        var name = data.sName;
                        var id = data.sId;
                    }
                    var obj = {
                        type: type,
                        result: '1',
                        info: {
                            id: id,
                            name: name,
                        }
                    }
                }
                socket.send(JSON.stringify(obj))
            }
        })
    }
})