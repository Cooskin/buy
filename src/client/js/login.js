// 用户登录弹窗
$('#signin_btn').click(function() {
    $('.login').show();
    $('.login').find('.logbtn').attr('logtype', 'user');
})

// 弹出注册弹窗
$('#signup_btn').click(function() {
    $('.register').show();
})

// 退出登录、注册弹窗
$('.hd>a').click(function() {
    if ($(this).parents('.register').length) {
        $(this).parents('.register').hide();
    } else {
        $(this).parents('.login').hide();
        $('.login').find('.logbtn').attr('logtype', '');
    }
})

// 登录注册切换
$('.target>a').click(function() {
    $('.login').toggle();
    $('.register').toggle();
})

// 商家登录
$('#boss_log_btn').click(function() {
    $('.login').show();
    $('.login').find('.logbtn').attr('logtype', 'boss');
    // 商家登录不跳转注册
    $('.login').find('.target>a').unbind('click');
})



// unbind('mouseout')

var bus = $('#business');
var list = $('.boss_log')
over(bus);
over(list);
out(bus);
out(list);

function over(obj) {
    obj.mouseover(function() {
        $('.boss_log').slideDown(0);
    })
}

function out(obj) {
    obj.mouseout(function() {
        $('.boss_log').slideUp(0);
    })
}

// 手机号账号密码正则
var poneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
var passReg = /^(?=.*[A-Za-z])(?=.*\d)[^]{6,16}$/;

$('[type="text"]').keyup(function() {

})
var acc = $('[type="text"]');
var pass = $('[type="password"]');
active(acc)
active(pass)

function active(obj) {
    obj.blur(function() {
        $(this).css('border-color', 'transparent');
    })
    obj.focus(function() {
        $(this).css('border-color', '#ff9900');
    })
}

// // 登录
var ws = new WebSocket('ws://localhost:1711');
ws.onopen = function() {
    if (sessionStorage.getItem('hx191110_userLog') != null) {
        var log = JSON.parse(sessionStorage.getItem('hx191110_userLog'));
        var logId = log.id;

        if ($('#user_info').length) {
            var obj = {
                type: 'userInfo',
                log: logId
            }
            ws.send(JSON.stringify(obj));
        } else {
            var obj = {
                type: 'log',
                log: logId
            }
            ws.send(JSON.stringify(obj));
        }
        console.log(obj)
    }

}
ws.onmessage = function(msg) {
    var oMsg = JSON.parse(msg.data);
    console.log(oMsg);
    console.log(1);

    switch (oMsg.type) {
        //  console.log(2)
        case 'log':
            console.log(2)

            $('.login_no').hide();
            $('.login_off').toggle().find('span>em').html(oMsg.name);
            $('.out').toggle();
            $('#business').toggle();
            break;
        case 'userLogin':
    }


}

// 验证码
var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDASZXCVBNM1234567890';
var code;
var codeBtn = $('.code>button');
codeBtn.click(function() {
    code = '';
    for (var i = 1; i <= 4; i++) {
        code += str[parseInt(Math.random() * str.length)];
    }
    codeBtn.html('换一个？');
    alert('验证码：' + code);
})



$('.logbtn').click(function() {
    var acc = $('#acc').val();
    var pass = $('#pass').val();
    var codeInp = $('.code>input').val();

    if (acc == '' || pass == '') {
        $(this).siblings('.tips').html('请输入正确的账号秘密');
    } else {
        if (acc.match(poneReg) == null || pass.match(passReg) == null) {
            $(this).siblings('.tips').html('账号或秘密错误');
        } else {
            if (codeInp == '') {
                $(this).siblings('.tips').html('请输入验证码');
                return;
            }
            if (codeInp != code) {
                $(this).siblings('.tips').html('验证码错误，重新获取试试');
            } else {
                $(this).siblings('.tips').html('');
                switch ($(this).attr('logtype')) {
                    case 'user':
                        var obj = {
                            type: 'userLogin',
                            log: { acc: acc, pass: pass }
                        }
                        break;
                    case 'boss':
                        var obj = {
                            type: 'bossLogin',
                            log: { acc: acc, pass: pass }
                        }
                        break;
                }

                console.log(obj)
                ws.send(JSON.stringify(obj))

                ws.onmessage = function(msg) {
                    var oMsg = JSON.parse(msg.data);
                    console.log(oMsg);
                    if (oMsg.type == 'userLogin') {
                        if (parseInt(oMsg.result)) {
                            var info = oMsg.info;

                            $('.login_no').hide();
                            $('.login').toggle();
                            $('.login_off').toggle().find('span>em').html(info.name);

                            var log = {
                                name: info.name,
                                id: info.id
                            }

                            $('.out').toggle();
                            $('#business').toggle();
                            sessionStorage.setItem('hx191110_userLog', JSON.stringify(log))
                        } else {

                            $('.tips').html('账号或密码不正确')
                        }
                    }
                }
            }
        }
    }
})

$('.out').click(function() {
    if (sessionStorage.getItem('hx191110_userLog') != null) {
        sessionStorage.removeItem('hx191110_userLog');
        $('.out').toggle();
        $('#business').toggle();
        $('.login_no').toggle();
        $('.login_off').toggle().find('span>em').html('');

    } else {
        sessionStorage.removeItem('hx191110_bossLog');
    }

})

// if (0) {
//     var obj = {
//         type: 'userLogin',
//         log: { acc: acc.val(), pass: pass.val() }
//     }
//     ws.send('123')
// }