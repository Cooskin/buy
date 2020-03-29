// 列表显示隐藏
$('.meun a').click(function() {
    $(this).next().toggle();
})

// 列表添加小点
var bull = '&bull;';
$('.item_list>li').prepend(bull);

// 订单高亮切换
$('.order_list>a').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
})

// var ws = new WebSocket('ws://localhost:1711');

// $(function() {
//     if (sessionStorage.getItem('hx191110_userLog') != null) {
//         var log = JSON.parse(sessionStorage.getItem('hx191110_userLog'));
//         var logId = log.id;
//         var obj = {
//             type: 'userInfo',
//             log: logId
//         }
//         console.log(obj)

//         ws.send(JSON.stringify(obj));
//     }

// })
ws.onmessage = function(msg) {
    var oMsg = JSON.parse(msg.data);
    console.log(1);

    if (sessionStorage.getItem('hx191110_userLog') != null) {
        if (oMsg.type == 'userInfo') {
            var info = oMsg.userInfo;
            $('.login_no').hide();
            $('.login_off').toggle().find('span>em').html(info.name);
            $('.out').toggle();
            $('#business').toggle();
            console.log(1)
            $('#user_name').html(info.name);
            var pass = '';
            for (let i = 0; i < info.pass; i++) {
                pass += bull;
            }
            $('#user_pass').html(pass);
            $('#user_pone').html(info.pone);
            $('#user_address').html(info.address);
            console.log(info.address)
        }
    }
}