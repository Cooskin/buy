// 弹窗登录弹窗
$('#signin_btn').click(function() {
    $('.login').show();
})

// 弹出注册弹窗
$('#signup_btn').click(function() {
    $('.register').show();
})

// 退出登录、注册弹窗
$('.hd>a').click(function() {
    $(this).parents('.wraper').parent().hide();
})

// 登录注册切换
$('.target>a').click(function() {
    $('.login').toggle();
    $('.register').toggle();
})