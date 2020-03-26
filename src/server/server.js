// 数据库引入
var sqlite3 = require('sqlite3');
var Database = sqlite3.Database;
// console.log('lao');
var db = new Database('database.db', function(e) {
    if (e == null) {
        console.log('库来了。。。');
    }
});

// ws引入
var ws = require('ws'); //导入ws文件夹
var myWs = ws.Server; //启动服务器
var wss = new myWs({ port: 1711 }); //开启服务端口

console.log('服务已开启~');

wss.on('connection', function(socket) {
    // 获取信息
    socket.on('message', function(msg) {
        var oMsg = JSON.parse(msg);

        switch (oMsg.type) {
            case 'userLogin':

                break;
        }
    })
})