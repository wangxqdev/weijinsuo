$(function() {

    function resize() {
        var screenWidth = $(window).width();
        var isSmallScreen = screenWidth < 768;
        $('.main_ad>.carousel-inner>.item').each(function(index, ele) {
            var $item = $(ele);
            var srcUrl = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            isSmallScreen ? 
            	$item.removeAttr('style').html('<img src="' + srcUrl + '" alt="">') : 
            	$item.empty().css('background-image', 'url("' + srcUrl + '")');
        });

        var $ulContainer =  $('.products .nav-tabs');
        var totalWidth = 50;
        $ulContainer.children('li:not(:last-of-type)').each(function(index, ele) {
            totalWidth += ele.clientWidth;
        });

        totalWidth > screenWidth ? 
            $ulContainer.css('width', totalWidth).parent().css('overflow-x', 'scroll') :
            $ulContainer.removeAttr("style").parent().removeAttr('style');
    }

    $(window).on('resize', resize).triggerHandler('resize');
    $('.products .tab-content .panel-default .panel-heading>.badges>a').tooltip();

    var $newsTitle = $('.news .news-title');
    $('.news .nav-pills a').on('click', function() {
        $newsTitle.text($(this).data('title'));
    });

    var $carousel = $('.carousel');
    var startX = 0, endX = 0;
    var threshold = 50;
    $carousel.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    $carousel.on('touchmove', function(e) {
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousel.on('touchend', function() {
        if (Math.abs(startX - endX) > threshold) {
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    });
});