$(document).bind('mobileinit', function () {

    $.extend($.mobile ,{
        defaultPageTransition: 'none'
        ,loadingMessageTextVisible:true
        ,loadingMessage:'载入中...'
        ,pageLoadErrorMessage:'载入失败'
    });
//            $.mobile.changePge('#contact', {transition: 'pop', reverse: false});
});