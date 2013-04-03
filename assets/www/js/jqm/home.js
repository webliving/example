var app ={
//    activePage:$('#conFind')
//    ,toolBarIndex:$('#toolBarIndex')
//    ,conGroup:$('.con')

        // 集团 id
         groupId:3
        // 门店 id
        ,branchId:4
        // 门店名称
        ,branchName:localStorage.getItem('branchName')
        // 会员 id
//        ,memberId:localStorage.getItem('memberId')
        ,memberId:1

        ,book:{
            branchId:localStorage.getItem('branchId')
//            ,memberId:localStorage.getItem('memberId')
            ,memberId:1
         }

        ,isFromSide:0
        // 当前界面
        ,pageActive:$('#home')

        ,init:function(){

        // 允许跨域
        $.support.cors=true;
        this.topAdv();
        // 添加 tap 效果
//        this.addTap();
        // 允许输入框获取焦点
//        this.allowFormsInIscroll();
        // 加载本地门店信息页面
        this.getBranchInfo();
        this.resizeEle();
        }
    // 转场切换后,等待加载功能
    ,waitPage:function(sWrapperId,jQData){
        var jQwaitPage=$('<div class="waitPage" id="waitPage"><div><i class="icon-coffee"></i><p>客官请稍等, 正在加载中...</p></div></div>');

        $('#'+sWrapperId,jQData).append(jQwaitPage);

    }
    // 转场切换后,功能加载完成,显示页面
    ,showPage:function(sWrapperId){
        $('#'+sWrapperId+' .waitPage').hide();
        $('#'+sWrapperId+' .content').show();

    }
    ,showLoad:function(sMsg,sIcoClass){
        var jQinfo=$('#info');

        if(sIcoClass=='load'){

            $('#infoIcon',jQinfo).addClass('icon-spinner icon-spin');
        }
        // 修改提示文字
        $('#infoText',jQinfo).text(sMsg);
        jQinfo.css('display','table').fadeIn();
    }
    ,modifyLoad:function(sMsg,sIcoClass,callback){
        var jQinfo=$('#info'),
            jQinfoIcon=$('#infoIcon',jQinfo);

        if(sIcoClass=='info'){

         jQinfoIcon .removeClass('icon-spinner icon-spin').addClass('icon-info-sign');
        }

        $('#infoText',jQinfo).text(sMsg);
        setTimeout(function(){
            app.hideLoad();

            // 如果有回调, 执行回调
            if(callback){

                callback();
            }
        },1200);

    }
    ,hideLoad:function(){
        $('#info').css('display','table').fadeOut();
    }
    ,resizeEle:function(){
        // 屏幕宽度
        var hWindowWidth=$(window).width();
        // 屏幕高度
        var hWindowHeight=$(window).height();
        // 计算广告高度百分比
        var nAdvHeightPercent=((hWindowWidth*(180/320))/hWindowHeight)*100/0.89;

//        var wWidth=window.screen.availWidth;
        var wHeight=window.screen.availHeight;
        console.log(hWindowHeight);
        console.log(nAdvHeightPercent);
//        console.log(window.devicePixelRatio);

        $('#wrapperTop').css('height',nAdvHeightPercent+'%');
        /*$('#scrollerTop').width(wWidth*4);
        $('#scrollerTop li').width(wWidth);
        $('#scrollerTop li').height(wWidth*(180/320));
        $('#wrapperTop').height(wWidth*(180/320));*/



        /*var dDate=new Date();
        var dDay=dDate.getDay();
        var dDat=dDate.getDate();
        var jQtbody=$('#calTable');



        $('#calYear').text(dDate.getFullYear());
        $('#calMonth').text(dDate.getMonth());



        function abc(){
            for(var i=0;i<2;i++){

                var tr=$('<tr/>');
                for(var k=0;k<7;k++){
                    $('<td/>',{
                        'text':(++dDat)
                    }).appendTo(tr);
                }

                tr.appendTo(jQtbody);

            }
        }*/
    }


    // 加载本地门店信息页面
    ,getBranchInfo:function(){

        // 加载本地门店信息页面
        app.branchId=localStorage.getItem('branchId');
        $('#resName').text(localStorage.getItem('branchName'));

    }
    // 允许 iscroll 键盘滚动
    ,allowFormsInIscroll:function(sFormId){
//        [].slice.call(document.querySelectorAll('input, select, button')).forEach(function(el){
        [].slice.call(document.querySelectorAll('#'+sFormId+' input')).forEach(function(el){
            el.addEventListener(('ontouchstart' in window)?'touchstart':'mousedown', function(e){
                e.stopPropagation();

            })
        })
    }
    // 仿 tap 效果
    /*,addTap:function(){
        $('.hover').on('touchstart',function(e){
            e.stopPropagation();
            $(this).addClass('tap');
        }).on('touchend',function(){
                $(this).removeClass('tap');

            })
    }*/
    // 首页广告滚动
    ,topAdv:function(){

        if(!myScrollTop){
            var myScrollTop;

            function loaded2() {
                myScrollTop = new iScroll('wrapperTop', {
                    snap: true,
                    momentum: false,
                    hScrollbar: false,
                    onScrollEnd: function () {
                        document.querySelector('#indicator2 > li.active').className = '';
                        document.querySelector('#indicator2 > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                    }
                });
            }

            setTimeout(loaded2, 0);


        }
    }
    /*,changePage:function(curTool,conPage,toolGroup){
        this.pageActive=$('#'+conPage);
        this.conGroup.removeClass('conActive');
        $('#'+conPage).addClass('conActive');

        $('a',toolGroup).removeClass('btnActive');
        $('#'+curTool,toolGroup).addClass('btnActive');

    }*/
};

app.init();

$.fn.animationComplete = function( callback ){

    return $(this).one('webkitAnimationEnd', callback);

    /*if($.support.cssTransitions){
        console.log(200);

    }
    else{
        // defer execution for consistency between webkit/non webkit
        setTimeout(callback, 0);
    }*/
};

function css3TransitionHandler2( name, reverse, $to, $from,callback) {
    
    var deferred = new $.Deferred(),
        reverseClass = reverse ? " reverse" : "",
        viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
        doneFunc = function() {

            // 页面切换后加载功能
            if(callback){

                callback();
            }

            $to.add( $from ).removeClass( "out in reverse " + name );

            if ( $from && $from[ 0 ] !== $to[ 0 ] ) {

                if($from[0].id!=$to[0].id){
//                    console.log($from[0]);
                    $from.removeClass('ui-page-active');
                }
            }

//            $to.parent().removeClass( viewportClass );

//            console.log($to[0].id);
//            console.log($from[0].id);
            if(reverse){
//                console.log($to[0].id);
//                console.log('from',$from[0].id);
                // todo Cannot read property '0' of undefined
                var s_id=$from[0].id;
                if(s_id!='home'){
                    $from.remove();
                    $('#js'+s_id).remove();
                }
//                $from[0].id!='home' ? $from.remove():null;

            }else{

                var s_id=$from[0].id;
                if(s_id!='home'){
                    $from.remove();
                    $('#js'+s_id).remove();
                }

//                $from[0].id!='home' ? $from.remove():null;

            }
//                $.mobile.initializePage();
            deferred.resolve( name, reverse, $to, $from );
        };




    $to.animationComplete( doneFunc );

//    $to.parent().addClass( viewportClass );

    if ( $from ) {
//        $from.addClass(name + " out" + reverseClass+' ui-page-hidden');
//        $from.removeClass('ui-page-active').addClass('ui-page-hidden');
    }


//    if($to[0].id=='home'){
    if($from){
        $from.css('z-index',0);
    }

//    }

        if($to[0].id=='home'){
            $to.css('z-index',1);
        }
    $to.addClass("ui-page-active " + name + " in" + reverseClass);

    // 设置程序当前页
    app.pageActive=$to;

    return deferred.promise();
}

var Workspace = Backbone.Router.extend({

    routes:{
        "findPage":"findPage",    // http://localhost:3001/backbone/#help
        // 个人中心
        "profile":"profile",
        // 注册
        "reg":"reg",
        // 更换餐厅
        "resList":"resList",

        // 预订
        "addbook":"addbook",
        // 获取空闲桌台
        "idleTableList":"idleTableList",
        // 预订确认
        "bookSure":"bookSure",
        // 预订列表
        "myBook":"myBook",

        // 点餐
        'orderfood':'orderfood'
        // 登录
        ,'login':'login'
        // 侧边导航
        ,'sideBarCategory':'sideBarCategory'
        // 首页
        ,'': 'findPage'


        ,"search":"search",
        "/:id": "getCertificate",
        "search/:query":"search"  // http://localhost:3001/backbone/#search/p7
//        ,'*filter': 'setFilter'

    }
    ,findPage:function(a,b){

        /*if(!myScroll){

            var myScroll;
            function loaded() {

                myScroll = new iScroll('wrapperIndex',{
                    hideScrollbar:true
                    ,bounce:false
//                    fadeScrollbar:true
                });
            }

            setTimeout(loaded, 0);
        }else{
            myScroll.refresh();
        }*/

        if(location.hash==''){

            css3TransitionHandler2('slide',true,$('#home'),app.pageActive);

        }


    }
    // 预订
    ,addbook:function(){

        $.ajax({
            type:'get'
            ,url:'addbook.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){
                var jQdata=$(data);

                app.waitPage('wrapperAddbook',jQdata);
                $('body').append(jQdata);

                // 获取数据
//                app.getResList();

                css3TransitionHandler2('slide',false,$('#addbook'),app.pageActive,getBusinessHours);

            }
            ,error:function(err){
                console.log('预订加载出错');
            }
        });


    }
    // 获取空闲桌台
    ,idleTableList:function(){
        $.ajax({
            type:'get'
            ,url:'idleTableList.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){

                var jQdata=$(data);
                app.waitPage('wrapperIdleTableList',jQdata);
                $('body').append(jQdata);

                // 获取数据
//                app.getResList();

                css3TransitionHandler2('slide',false,$('#idleTableList'),app.pageActive,getIdleTableCategory);

            }
            ,error:function(err){
                console.log('客位加载出错');
            }
        });

    }
    // 预订确认
    ,bookSure:function(){
        $.ajax({
            type:'get'
            ,url:'bookSure.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){

                var jQdata=$(data);
//                app.waitPage('wrapperIdleTableList',jQdata);
                $('body').append(jQdata);

                // 获取数据
//                app.getResList();

                css3TransitionHandler2('slide',false,$('#bookSure'),app.pageActive);

            }
            ,error:function(err){
                console.log('预订确认加载出错');
            }
        });

    }
     // 预订列表
    ,myBook:function(){
        $.ajax({
            type:'get'
            ,url:'myBook.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){

                var jQdata=$(data);
//                app.waitPage('wrapperIdleTableList',jQdata);
                $('body').append(jQdata);

                // 获取数据
//                app.getResList();

                css3TransitionHandler2('slide',false,$('#myBook'),app.pageActive);

            }
            ,error:function(err){
                console.log('预订列表加载出错');
            }
        });

    }

    // 点餐
    ,orderfood:function(){


        var isSide=app.sideCategory,
            isFromSide=app.isFromSide;

        if(isSide&&isFromSide){

            toggleSideCategory(false);
            app.isFromSide=0;
            return false;
        }else if(isSide==0&&isFromSide){
            app.isFromSide=0;
            return false;
        }

        $.ajax({
            type:'get'
            ,url:'orderfood.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){

                $('body').append(data);

            }
            ,error:function(err){
                console.log('点餐菜品加载出错');
            }
        });
    }

    // 注册
    ,reg:function(){

        $.ajax({
            type:'get'
            ,url:'reg.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){

                $('body').append(data);
                // 获取数据
//                app.getResList();

                css3TransitionHandler2('slide',false,$('#reg'),app.pageActive);

            }
            ,error:function(err){
                console.log('登录加载出错');
            }
        });


    }
    // 登录
    ,login:function(){

        $.ajax({
            type:'get'
            ,url:'login.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){

                $('body').append(data);
                // 获取数据
//                app.getResList();




                var s_id=$('.ui-page-active')[0].id,
                    reverse= !!(s_id == 'reg');

                css3TransitionHandler2('slide',reverse,$('#login'),$('#'+s_id));

            }
            ,error:function(err){
                console.log('登录加载出错');
            }
        });



    }
    ,
    // 个人中心
    profile:function(){

        $.ajax({
            type:'get'
            ,url:'profile.html'
            ,dataType:'html'
            ,crossDomain: true
//        ,jsonp:callbackFunction
//        ,jsonpCallback: 'callbackFunction'
//            ,data:sRegData
            ,success:function(data){

                $('body').append(data);
                // 获取数据
//                app.getResList();

                /*if(!myScroll){

                    var myScroll;
                    function loaded() {

                        myScroll = new iScroll('wrapperProfile',{
                            hideScrollbar:true
//                    ,bounceLock:true
//                    ,useTransition:true
//                    fadeScrollbar:true
                        });
                    }

                    setTimeout(loaded, 0);
                }else{
                    myScroll.refresh();
                }*/


                css3TransitionHandler2('slide',false,$('#profile'),app.pageActive,addEventProfile);

            }
            ,error:function(err){
                console.log('拉取个人中心失败');
            }
        });

    }

    // 餐厅列表
    ,resList:function(){

        $.ajax({
            type:'get'
            ,url:'resList.html'
            ,dataType:'html'
            ,crossDomain: true
            ,success:function(data){

                $('body').append(data);

                css3TransitionHandler2('slide',false,$('#resList'),app.pageActive);

            }
            ,error:function(err){
                console.log('拉取餐厅列表失败');
            }
        });

    }

});

app.TodoRouter = new Workspace();
Backbone.history.start();



$(function(){
//    app.resizeEle();
//    console.log($(window).height());

   /* $($('#getDatass')[0].contentDocument).ready(function(){
    });

    $('#getDatass').load(function(){
        console.log($(this).contents());
    });*/
});

// 注册页面
/**
 * 获取验证码
 */
function vercodeCount(){
    var jVercodeCount=$('#vercodeCount'),
        nCount=45;
    var time=setInterval(function(){
        jVercodeCount.text(nCount--);
        if(nCount==-1){
            clearInterval(time);
        }
    },1000);

}
/**
 * 产生一个随机数
 * @param n
 * @returns {string}
 */
function rndNum(n){

    var rnd="";

    for(var i=0;i<n;i++)

        rnd+=Math.floor(Math.random()*10);

    return rnd;

}



