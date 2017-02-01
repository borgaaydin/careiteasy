/**
 * Created by borga on 2016.
 */
function foamDistance(index){
    return $(".parallax-block:eq("+(index+1)+")").offset().top -
        $(".parallax-block:eq("+(index)+")").offset().top -
        $(".parallax-block:eq("+(index)+")").height()
}

function getBackgroundSize(index) {
    var movingSection = $('.moving');
    var backgroundImage = new Image();
    backgroundImage.src = $('.moving:eq('+index+')').attr("src");

    var width = backgroundImage.width;
    var height = backgroundImage.height;

    var imageRatio = width/height;
    var coverRatio = movingSection.outerWidth()/movingSection.outerHeight();

    if (imageRatio >= coverRatio) {
        var coverHeight = movingSection.outerHeight();
        var scale = (coverHeight / height);
        var coverWidth = width * scale;
    } else {
        var coverWidth = movingSection.outerWidth();
        var scale = (coverWidth / width);
        var coverHeight = height * scale;
    }
    console.log(coverHeight);

    return coverHeight;
}

function is_touch_device() {
    return 'ontouchstart' in window        // works on most browsers
        || navigator.maxTouchPoints;       // works on IE10/11 and Surface
}

$(function() {
    if (!(is_touch_device())) {
        $('.menu_nav_container').addClass("noTouch");
        $('.upIcon').addClass("noTouch");
        $('.hemenAlRoundIcon').addClass("noTouch");
    }

    if($(window).width()<769) {
        var drop = $(".myAccount");
        drop.off("hover");

        drop.click(function() {
            $(".dropdown").slideToggle("slow");
        });
    }

    $('.howToSlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:false,
        cssEase: 'linear',
        fade: true,
        autoplay: true,
        speed: 1000,
        centerMode: true,
        arrows: true
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $(window).scroll(function() {
        var movingSection = $('.moving');

        if($(window).scrollTop()>$(this).height()) {
            $(".hemenAlRoundIcon").removeClass("hidden").removeClass("hinge").addClass("fadeInRightBig");
        } else {
            $(".hemenAlRoundIcon").addClass("hinge");
        }

        if($(this).width()>1200) {
            movingSection.each(function(i){
                var backHeight = getBackgroundSize(i);

                var delta = $(window).scrollTop()-$(".parallax-block:eq("+i+")").offset().top;

                var x = 0;

                if(delta<0){
                    $(this).css('top', parseInt(-x) );
                }
                else if (delta > (Math.abs(foamDistance(i)-backHeight)) ){
                    x = (Math.abs(foamDistance(i)-backHeight));
                    $(this).css('top', parseInt(-x));
                }
                else {
                    x = delta;
                    $(this).css('top', parseInt(-x));
                }
            });
        }
    });
});