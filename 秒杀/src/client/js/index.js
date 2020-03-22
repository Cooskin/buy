/**
 *   banner
 */
$("#carousel_1").FtCarousel();

/**
 *   time
 */
var nav = $('.nav_wraper');
var num = parseInt(nav.css('margin-left'));
if (!(num % 60)) {
    $('.next').click(function() {
        navWraper(-80);
    })

    $('.prev').click(function() {
        navWraper(80);
    })
}


function navWraper(i) {
    // var num = parseInt(nav.css('margin-left'));
    // console.log(!(num < -380))
    // if (!(num <= -380) && !(num > 20)) {
    var leng = $('.nav_wraper').find('a').length
    console.log(leng)
    num = num + i;
    nav.css('margin-left', num + 'px')
        // } else {
        //     alert('1')
        // }
}

$('.meun>li').click(function() {
    location.href = 'shop.html'
})

$(window).scroll(function() {
    var top = $(window).scrollTop();
    // console.log($(window).scrollTop())

    if (top >= 630) {
        $('.list_wrap').css({ 'position': 'fixed', 'top': '0' });
    } else {
        $('.list_wrap').css('position', 'relative');
    }
})