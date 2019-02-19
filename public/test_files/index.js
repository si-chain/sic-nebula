$(function () {
    Carousel.init($(".swiper-container"));

    var mySwiper2 = new Swiper('.swiper-container2', {
        pagination: '.pagination',
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        loop: true,
        autoplay: 5000,
        speed: 400
    });
    $('.swiper-btn-hl.prev').on('click', function (e) {
        e.preventDefault();
        mySwiper2.swipePrev()
    });
    $('.swiper-btn-hl.next').on('click', function (e) {
        e.preventDefault();
        mySwiper2.swipeNext()
    });
    $('.swiper-btn-hl').on('click', function (e) {
        e.preventDefault()
    });
    $('.js_details01').hover(function () {
        $('.js_details01-con').stop().animate({opacity: "1", bottom: "60"});
        $('.js_details01-con').addClass('visible');
    });
    $('.js_details01-con').hover(function () {
        $(this).stop().animate({opacity: "1", bottom: "60"});
        $(this).addClass('visible');
    }, function () {
        $(this).stop().animate({opacity: "0", bottom: "40"});
        $(this).removeClass('visible');
    });

    $('.js_details02').hover(function () {
        $('.js_details02-con').stop().animate({opacity: "1", bottom: "-50"});
        $('.js_details02-con').addClass('visible');
    });
    $('.js_details02-con').hover(function () {
        $(this).stop().animate({opacity: "1", bottom: "-50"});
        $(this).addClass('visible');
    }, function () {
        $(this).stop().animate({opacity: "0", bottom: "-70"});
        $(this).removeClass('visible');
    });


    /*楼梯效果*/
    var offon = true;
    $(window).scroll(function () {
        if (offon) {
            var _top = $(window).scrollTop();
            var ht = $(window).height();
            if (_top > ht) {
                $('.float-box').fadeIn();
            } else {
                $('.float-box').fadeOut();
            }
            $('.louti').each(function (i) {
                var _index = $(this).index();
                var _height = $(this).offset().top + ht/2;
                if (_height > _top) {
                    $('.float-l-lists li').eq(_index).addClass('active').siblings().removeClass('active');
                    return false;
                }
            });
        }
    });
    $('.float-l-lists li').click(function () {
        offon = false;
        var _index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        var _height = $('.louti').eq(_index).offset().top;
        $('body,html').animate({scrollTop: _height}, 500, function () {
            offon = true;
        });
    });
    $(".goTo-top").click(function () {
        $("body,html").animate({
            "scrollTop": 0
        }, 1000);
        $(".float-l-lists li").removeClass("active");
    });

    var nums = ["?", "10", "25", "50"];
    var i = 0;
    var timer1 = setInterval(function () {
        i++;
        if (i == 4) {
            i = 0
        }
        $(".js_price").text(nums[i]);
    }, 300);

    $('.js_close-btn').click(function () {
        $('.layer-bg').addClass('hide');
        $('.layer-c').addClass('hide');
		$('.layer-f').addClass('hide');
    });

    Ecaptcha.init({appId: "d1f6af4b100e4c4193faca2df7644f74", type: "1"});
    initPageEvent();

    function initPageEvent() {
        $.ajax({
            async: false,
            url: "/newecenter/newYearActivity/initActivityPage.do?time=" + Math.random(),
            success: function (data) {
                if (data == "unlogin") {
                    try {
                        changeLogin();
                        bindEvent();
                    } catch (e) {
                    }
                } else if (data == "able") {
                    bindEvent();
                } else if (data == "notStart") {
                    $('.js_get-card').addClass('noUse').html('敬请期待');
                } else if (data == "end") {
                    $('.js_get-card').addClass('noUse').html('活动结束');
                } else if (data == "received") {
					clearInterval(timer1);
                    $(".js_price").text(nums[2]);
                    $('.js_get-card').addClass('noUse').html('已领取');
                } else {
                    $('.js_get-card').addClass('noUse').html('敬请期待');
                }
            }
        });
    }


    function bindEvent() {
        $(".js_get-card").off().on("click", function () {
            if (checkIsLogin() && !isReceivedClick) {
                Ecaptcha.pop({
                    success: function (id) {
                        toReceive(id);
                    }
                });
            }
        });
    }

    var isReceivedClick = false;
    function toReceive(captchaId) {
        if (!isReceivedClick) {
            isReceivedClick = true;
            $.ajax({
                async: false,
                url: "/newecenter/newYearActivity/receiveGifts.do?captchaId=" + captchaId + "&time=" + Math.random(),
                success: function (data) {
                    if (data == "unlogin") {
						isReceivedClick = false;
                        try {
                            changeLogin();
                        } catch (e) {
                        }
                    } else if (data == "success") {
                        clearInterval(timer1);
                        $(".js_price").text(nums[2]);
                        $('.layer-bg').removeClass('hide');
                        $('.layer-c').removeClass('hide');
                        $('.js_get-card').addClass('noUse').html('已领取');
                    } else if (data == "ecaptcha") {
						isReceivedClick = false;
                        Ecaptcha.pop({
                            success: function (id) {
                                toReceive(id);
                            }
                        });
                    } else if (data == "received") {
                        clearInterval(timer1);
                        $(".js_price").text(nums[2]);
                        $('.js_get-card').addClass('noUse').html('已领取');
                    } else if (data == "noGift") {
                        isReceivedClick = false;
						$('#errorMsg').html('奖励已发放完，下次要快一些哦！');
						$('.layer-bg').removeClass('hide');
						$('.layer-f').removeClass('hide');
                        $('.js_get-card').html('立即领取');
                    } else {
						isReceivedClick = false;
						$('#errorMsg').html('领取失败请重新领取！');
						$('.layer-bg').removeClass('hide');
						$('.layer-f').removeClass('hide');
                        $('.js_get-card').html('立即领取');
                    }
                }
            });
        }
    }

    function checkIsLogin() {
        var flag = false;
        $.ajax({
            async: false,
            url: "/newecenter/init/checkLogin.do?time=" + Math.random(),
            success: function (data) {
                if (data != "") {
                    flag = true;
                } else {
                    try {
                        changeLogin();
                    } catch (e) {
                    }
                }
            }
        });
        return flag;
    }
});


function doLoginSuccess(data) {
    window.location.reload();
}
