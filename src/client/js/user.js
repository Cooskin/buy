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