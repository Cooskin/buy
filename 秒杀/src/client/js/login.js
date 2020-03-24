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