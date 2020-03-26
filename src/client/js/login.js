// 弹窗登录弹窗
$('#signin_btn').click(function() {
    $('#user_login').show();
})

// 弹出注册弹窗
$('#signup_btn').click(function() {
    $('.register').show();
})

// 退出登录、注册弹窗
$('.hd>a').click(function() {
    if ($(this).parents('.register').length) {
        $(this).parents('.wraper').parent().hide();
    } else {
        $(this).parents('.wraper').parent().parent().hide();
    }
})

// 登录注册切换
$('.target>a').click(function() {
    $('#user_login').toggle();
    $('.register').toggle();
})

// 商家登录
$('#boss_log_btn').click(function() {
    $('#boss_login').show();
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
// 商家登录不跳转注册
$('#boss_login').find('.target>a').unbind('click');

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

// 登录
var ws = new WebSocket('ws://localhost:1711');
// ws.onopen = function() {}

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

if (0) {
    var obj = {
        type: 'userLogin',
        log: { acc: acc.val(), pass: pass.val() }
    }
    ws.send('123')
}