var home='home';

$('#content').on('swiperight',function(){
    console.log(this);
//        $(this).removeClass('foword').addClass('back');
    $(this).animate({
        opacity: 0.7,
//            left: '50px',
        'right':'-90%',
        color: '#abcdef'
//            rotateZ: '45deg',
//            translate3d: '0,10px,0',
//            translate:'230px'
    }, 500);
});

$('#content').on('swipeleft',function(){
//        $(this).removeClass('back').addClass('foword');
    $(this).animate({
        opacity: 1,
        'right':'0%',
        color: '#eee'
//            rotateZ: '45deg',
//            translate3d: '0,10px,0',
//            translate:'0px'
    }, 500);
})