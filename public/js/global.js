/**
 * Created by borga on 2016.
 */
function foamDistance(index){
    return $(".white-block:eq("+(index+1)+")").offset().top -
        $(".white-block:eq("+(index)+")").offset().top -
        $(".white-block:eq("+(index)+")").height()
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
    return coverHeight;
}

$(function() {
    if (!("ontouchstart" in document.documentElement)) {
        $('.menu_nav_container').addClass("no-touch");
        $('.upIcon').addClass("no-touch");
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

                var delta = $(window).scrollTop()-$(".white-block:eq("+i+")").offset().top;

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