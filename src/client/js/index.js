/**
 *   banner
 */
$("#carousel_1").FtCarousel();

/**
 *   time
 */
var nav = $('.nav_wraper');
var num = parseInt(nav.css('margin-left'));

$('.next').click(function() {

    navWraper(-80);
    // alert('后面没有了')
})

$('.prev').click(function() {

    navWraper(80);
    // alert('前面没有了')

})



function navWraper(i) {
    var num = parseInt(nav.css('margin-left'));
    if (num < -380) {
        num = -380;
    }
    if (num > 20) {
        num = 20;
    }
    num += i;
    if (num <= 20 && num >= -380) {
        nav.css('margin-left', num + 'px');
        return;
    }
    alert('没有了')
}

$('.meun>li').click(function() {
    location.href = 'shop.html'
})

$(window).scroll(function() {
    var top = $(window).scrollTop();
    if (top >= 630) {
        $('.list_wrap').css({ 'position': 'fixed', 'top': '0' });
    } else {
        $('.list_wrap').css('position', 'static');
    }
})