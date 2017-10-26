/**
 * Created by xiao on 2017/2/15.
 */
var min_width = 60;
var max_width = 280;
var CHANGEBGCOLOR = null;
var CHANGEWZ = null;
var WZ = null;
window.onload = function(){
    //阻止微信下拉
    function preventTouch() {
        event.preventDefault();
    }
    document.addEventListener('touchmove', preventTouch);

    var oTitle = document.getElementById("title");
    var oLogo = document.getElementById("logo");
    // 拖拽层级
    zIndex = 1;

    /*编辑框的出现*/
    $('.drag_pos').bind('touchstart',function(){
        $('.edit_box').hide();
        $('.rotate_el').hide();
        $(this).find('.edit_box').show();
        $(this).find('.rotate_el').show();
    });

    $('#title').bind('click',function(){
        $('#title').css("zIndex",120);
        $('.modify-options').css("zIndex",zIndex++);
        $('.modify-options').animate({
            bottom:'0'
        },800);
        txt_edit($('#title'));
        $('.modify-options li').find('button').bind('touchstart');
    });

    /*旋转*/
    var d = 0;
    var rotate_el = document.getElementById('rotate_el');
    var oElement_img = document.getElementById("element_img");
    scaleORrotate(oElement_img,rotate_el);

    /*缩放*/
    var d1 = 0;
    var d2 = 1;
    var scaling_el = document.getElementById("scaling_el");
    var scaling_el1 = document.getElementById("scaling_ele");
    scaleORrotate(scaling_el,scaling_el1);

    //文字块修改背景和边框
    $('#element_img').on("click",function(){
        // changeWZ('.WZ_CHOOSE', '#element_img');
        $('.WZ_CHOOSE>ul>li').eq(0).hide();

        CHANGEWZ = null;
        WZ = $('#element_img');
        var obj = $('.WZ_CHOOSE');

        $(obj).find(".default_bg_div").off("click");
        $(obj).find(".upload_img_box").off("click");
        $(".WZ_border button").off("click");
        $('.WZ_color p input').off("change");

        setTimeout(function(){
            CHANGEWZ = function (obj,WZ){
                $(obj).fadeIn();
                $(obj).css("zIndex","999");
                var INITBG = $(WZ).css("backgroundColor");



                $(obj).find(".upload_img_box .checked").removeClass("on");
                $(obj).find(".default_bg_div").removeClass("on");



                if(!!!$(WZ).attr("data-src")){
                    //色彩选择
                    var INITBG = $(WZ).css("backgroundColor");

                    $(obj).find(".default_bg_div").each(function(){
                        if(rgbToHex($(this).css("backgroundColor")) == rgbToHex(INITBG)){
                            $(this).addClass("on");
                            return false;
                        }
                    });
                }else{
                    //图片选择
                    var INITBG = $(WZ).attr("data-src");
                    $(obj).find(".upload_img_box img").each(function(){
                        if( $(this).attr("src") == INITBG){
                            $(this).parent().find(".checked").addClass("on");
                            return false;
                        }
                    });
                }
                if($(WZ).attr("id") == 'element_img'){
                    var INITBG = $(WZ).find("img").attr("src") ;
                   
                }
                //色彩选择
                $(obj).find(".default_bg_div").on("click",divClick);

                //图片选择
                $(obj).find(".upload_img_box").on("click",clickBox);



                var BORDER_W = $(WZ).css("borderWidth");
                var BORDER_C = rgbToHex($(WZ).css("borderColor"));
                console.log(BORDER_C+"----"+BORDER_W);
                $(".WZ_border span i").text(parseInt(BORDER_W));
                $(".WZ_color p input").val(BORDER_C);
                $(".WZ_border button").on("click",bClick);

                $('.WZ_color p input').on("change",changeFn);

                function clickBox(){
                    if($(this).find(".checked").hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        //图片选择
                        $(WZ).css("background","none");
                        $(WZ).css("background","url("+ INITBG+") no-repeat");
                        $(WZ).attr("data-src",INITBG);
                        $(WZ).css("backgroundSize","100% 100%");
                        if($(WZ).attr("id") == 'element_img'){
                           $(WZ).find("img").attr("src",INITBG) ;
                        }
                    }else{
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).find(".checked").addClass("on");
                        //图片选择
                        $(WZ).css("background","none");
                        $(WZ).css("background","url("+ $(this).find("img").attr("src")+") no-repeat");
                        $(WZ).attr("data-src",$(this).find("img").attr("src"));
                        $(WZ).css("backgroundSize","100% 100%");
                        if($(WZ).attr("id") == 'element_img'){
                           $(WZ).find("img").attr("src",$(this).find("img").attr("src")) ;
                        }
                    }
                }

                function divClick(){
                    if($(this).hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(WZ).css("background","none");
                        $(WZ).css("background",INITBG);
                        $(WZ).removeAttr("data-src");
                    }else{
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).addClass("on");
                        $(WZ).css("background","none");
                        $(WZ).css("background",$(this).css("background"));
                        $(WZ).removeAttr("data-src");
                    }
                }

                function bClick(){
                    var BW = parseInt($(".WZ_border span i").html());
                    console.log("--->",BW)
                    var TYPE = $(this).val();
                    if(TYPE === "-"){
                        if(BW <= 0){
                            BW = 0;
                        }else{
                            BW -= 1;
                        }
                    }else if(TYPE ==="+"){
                        BW = parseInt(BW) + 1;
                    }
                    $(".WZ_border span i").html(BW);
                    $(WZ).css("border",BW + "px solid " + $('.WZ_color p input').val());
                    choiceSize(WZ);
                }

                function changeFn(){
                    $(WZ).css("border", parseInt($(".WZ_border span i").html())+ "px solid " +$(this).val());
                    choiceSize(WZ);
                }
                

                $(obj).find(".close").on("click",function(){
                    console.log(BORDER_W,"----",BORDER_C);
                    $(WZ).css("border",parseInt(BORDER_W) + "px solid " + BORDER_C);
                    $(WZ).css("background",INITBG);
                    choiceSize(WZ);

                    $(obj).fadeOut();

                    if(!!!$(WZ).attr("data-src")){
                        //色彩选择
                        $(WZ).css("background","none");
                        $(WZ).css("background",INITBG);
                        $(WZ).removeAttr("data-src");
                    }else{
                        //图片选择
                        $(WZ).css("background","none");
                        $(WZ).css("background","url("+ INITBG+") no-repeat");
                        $(WZ).attr("data-src",INITBG);
                        $(WZ).css("backgroundSize","100% 100%");
                        if($(WZ).attr("id") == 'element_img'){
                           $(WZ).find("img").attr("src",INITBG) ;
                        }
                    }

                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);
                    $('.WZ_color p input').off("change",changeFn);

                });

                $(obj).find("button.sure_btn").on("click",function(){
                    $(obj).fadeOut();
                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);

                    $('.WZ_color p input').off("change",changeFn);
                });
            }
            CHANGEWZ(obj,WZ)
        },1);
    });
    $('#scaling_el').on("click",function(){/*
        changeWZ('.WZ_CHOOSE2', '#scaling_el');*/

        CHANGEWZ = null;
        WZ = $('#scaling_el');
        var obj = $('.WZ_CHOOSE2');

        $(obj).find(".default_bg_div").off("click");
        $(obj).find(".upload_img_box").off("click");
        $(".WZ_border button").off("click");
        $('.WZ_color p input').off("change");

        setTimeout(function(){
            CHANGEWZ = function (obj,WZ){
                $(obj).fadeIn();
                $(obj).css("zIndex","999");
                var INITBG = $(WZ).css("backgroundColor");

                $(obj).find(".upload_img_box .checked").removeClass("on");
                $(obj).find(".default_bg_div").removeClass("on");



                if(!!!$(WZ).attr("data-src")){
                    //色彩选择
                    var INITBG = $(WZ).css("backgroundColor");

                    $(obj).find(".default_bg_div").each(function(){
                        if(rgbToHex($(this).css("backgroundColor")) == rgbToHex(INITBG)){
                            $(this).addClass("on");
                            return false;
                        }
                    });
                }else{
                    //图片选择
                    var INITBG = $(WZ).attr("data-src");
                    $(obj).find(".upload_img_box img").each(function(){
                        if( $(this).attr("src") == INITBG){
                            $(this).parent().find(".checked").addClass("on");
                            return false;
                        }
                    });
                }
                //色彩选择
                $(obj).find(".default_bg_div").on("click",divClick);

                //图片选择
                $(obj).find(".upload_img_box").on("click",clickBox);



                var BORDER_W = $(WZ).css("borderWidth");
                var BORDER_C = rgbToHex($(WZ).css("borderColor"));
                console.log(BORDER_C+"----"+BORDER_W);
                $(".WZ_border span i").text(parseInt(BORDER_W));
                $(".WZ_color p input").val(BORDER_C);
                $(".WZ_border button").on("click",bClick);

                $('.WZ_color p input').on("change",changeFn);

                function clickBox(){
                    if($(this).find(".checked").hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        //图片选择
                        $(WZ).css("background","none");
                        $(WZ).css("background","url("+ INITBG+") no-repeat");
                        $(WZ).attr("data-src",INITBG);
                        $(WZ).css("backgroundSize","100% 100%");
                    }else{
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).find(".checked").addClass("on");
                        //图片选择
                        $(WZ).css("background","none");
                        $(WZ).css("background","url("+ $(this).find("img").attr("src")+") no-repeat");
                        $(WZ).attr("data-src",$(this).find("img").attr("src"));
                        $(WZ).css("backgroundSize","100% 100%");
                    }
                }

                function divClick(){
                    if($(this).hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(WZ).css("background","none");
                        $(WZ).css("backgroundColor",INITBG);
                        $(WZ).removeAttr("data-src");
                    }else{
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).addClass("on");
                        $(WZ).css("background","none");
                        $(WZ).css("background",$(this).css("background"));
                        $(WZ).removeAttr("data-src");
                    }
                }

                function bClick(){
                    var BW = parseInt($(".WZ_border span i").html());
                    console.log("--->",BW)
                    var TYPE = $(this).val();
                    if(TYPE === "-"){
                        if(BW <= 0){
                            BW = 0;
                        }else{
                            BW -= 1;
                        }
                    }else if(TYPE ==="+"){
                        BW = parseInt(BW) + 1;
                    }
                    $(".WZ_border span i").html(BW);
                    $(WZ).css("border",BW + "px solid " + $('.WZ_color p input').val());
                    choiceSize(WZ);
                }

                function changeFn(){
                    $(WZ).css("border", parseInt($(".WZ_border span i").html())+ "px solid " +$(this).val());
                    choiceSize(WZ);
                }
                

                $(obj).find(".close").on("click",function(){
                    console.log(BORDER_W,"----",BORDER_C);
                    $(WZ).css("border",parseInt(BORDER_W) + "px solid " + BORDER_C);
                    $(WZ).css("background",INITBG);
                    choiceSize(WZ);

                    $(obj).fadeOut();

                    if(!!!$(WZ).attr("data-src")){
                        //色彩选择
                        $(WZ).css("background","none");
                        $(WZ).css("background",INITBG);
                        $(WZ).removeAttr("data-src");
                    }else{
                        //图片选择
                        $(WZ).css("background","none");
                        $(WZ).css("background","url("+ INITBG+") no-repeat");
                        $(WZ).attr("data-src",INITBG);
                        $(WZ).css("backgroundSize","100% 100%");
                    }

                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);
                    $('.WZ_color p input').off("change",changeFn);

                });

                $(obj).find("button.sure_btn").on("click",function(){
                    $(obj).fadeOut();
                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);

                    $('.WZ_color p input').off("change",changeFn);
                });
            }
            CHANGEWZ(obj,WZ)
        },1);
    });

    /*拖拽*/
    drag(oTitle);
    drag(oLogo);
    drag(oElement_img);
    drag(scaling_el);
    //初始化编辑框
    initEditBox();

    /*添加移除class*/
    $('.fontSize span').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('#title span').css('fontSize',$(this).text());
        $(this).parents('li').find('i').text($(this).text());
    });

    /*底部三个按钮事件*/
    $('.bg_choose_btn').click(function () {
        $('.BG_CHOOSE').fadeIn();
        CHANGEBGCOLOR = null;
        setTimeout(function(){

            CHANGEBGCOLOR = function (obj){
                console.log("body");
                $(obj).css("zIndex","999");

                $(obj).find(".upload_img_box .checked").removeClass("on");
                $(obj).find(".default_bg_div").removeClass("on");

                if(!!!$("body").attr("data-src")){
                    //色彩选择
                    var INITBG = $("body").css("backgroundColor");

                    $(obj).find(".default_bg_div").each(function(){
                        if(rgbToHex($(this).css("backgroundColor")) == rgbToHex(INITBG)){
                            $(this).addClass("on");
                            return false;
                        }
                    });
                }else{
                    //图片选择
                    var INITBG = $("body").attr("data-src");
                    $(obj).find(".upload_img_box img").each(function(){
                        console.log($(this).attr("src") == INITBG)
                        if( $(this).attr("src") == INITBG){
                            $(this).parent().find(".checked").addClass("on");
                            return false;
                        }
                    });
                }

                //色彩选择
                $(obj).find(".default_bg_div").on("click",clickDiv);
                //图片选择
                $(obj).find(".upload_img_box").on("click",clickBox);
                function clickBox(){
                    if($(this).find(".checked").hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        //图片选择
                        $("body").css("background","none");
                        $("body").css("background","url("+ INITBG+") no-repeat");
                        $("body").attr("data-src",INITBG);
                        $("body").css("backgroundSize","100% 100%");

                    }else{
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).find(".checked").addClass("on");
                        //图片选择
                        $("body").css("background","none");
                        $("body").css("background","url("+ $(this).find("img").attr("src")+") no-repeat");
                        $("body").attr("data-src",$(this).find("img").attr("src"));
                        $("body").css("backgroundSize","100% 100%");
                    }
                }

                function clickDiv(){
                    if($(this).hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $("body").css("background","none");
                        $("body").css("background",INITBG);
                        $("body").removeAttr("data-src");
                    }else{
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).addClass("on");
                        $("body").css("background","none");
                        $("body").css("background",$(this).css("background"));
                        $("body").removeAttr("data-src");
                    }
                }

                $(obj).find(".close").on("click",function(){
                    $(obj).fadeOut();

                    if(!!!$(obj).attr("data-src")){
                        //色彩选择
                        $("body").css("background","none");
                        $("body").css("background",INITBG);
                        $("body").removeAttr("data-src");
                    }else{
                        //图片选择
                        $("body").css("background","none");
                        $("body").css("background","url("+ INITBG+") no-repeat");
                        $("body").attr("data-src",INITBG);
                        $("body").css("backgroundSize","100% 100%");
                    }

                    $(obj).find(".default_bg_div").off("click",clickDiv);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    CHANGEBGCOLOR = null;

                });
                $(obj).find("button.sure_btn").on("click",function(){
                    $(obj).fadeOut();
                    $(obj).find(".default_bg_div").off("click",clickDiv);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    CHANGEBGCOLOR = null;
                });
            }

             CHANGEBGCOLOR('.BG_CHOOSE');



        },1);
    });
    $(".randomBg_btn").click(function() {

        $.get(
            "test1.json",
            function(data){
                var logo = $("#logo");
                var title = $("title");
                var el_img = $("#element_img");
                var el_text = $("#scaling_el");
                /*title*/
                title.css({
                    top:data.title.axis_x+'px',
                    width:data.title.width+'px',
                    left:data.title.axis_x+'px',
                    height:data.title.height+'px',
                    color:'#'+data.title.font_color,
                    lineHeight:data.title.height+'px',
                    fontSize:data.title.font_size+'px'
                });
                title.find('.title_txt').text(data.title.content);

                /*logo*/
                logo.css({
                    top:data.logo.axis_x+'px',
                    width:data.logo.width+'px',
                    left:data.logo.axis_x+'px',
                    height:data.logo.height+'px'
                });

                /*图片元素*/
                el_img.css({
                    top:data.element2.axis_x+'px',
                    width:data.element2.width+'px',
                    left:data.element2.axis_x+'px',
                    height:data.element2.height+'px',
                    borderWidth:data.element2.border_width+'px',
                    borderColor:'#'+data.element2.border_color
                });
                el_img.find('img').prop('src',data.element2.pic);
                el_img.attr("data-src",data.element2.pic);

                /*文字元素*/
                el_text.css({
                    top:data.element1.axis_x+'px',
                    width:data.element1.width+'px',
                    left:data.element1.axis_x+'px',
                    height:data.element1.height+'px',
                    color:'#'+data.element1.font_color,
                    lineHeight:data.element1.height+'px',
                    fontSize:data.element1.font_size+'px'
                });
                el_text.find('.txt').text(data.element1.content);


                $("body").css("background","none");
                $("body").css("background","url("+data.base.background+") no-repeat");
                $("body").attr("data-src",data.base.background);
                $("body").css("backgroundSize","100% 100%");

               

                //初始化编辑框样式
                var arr = [
                    {w:data.title.width,h:data.title.height},
                    {w:data.logo.width,h:data.logo.height},
                    {w:data.element2.width,h:data.element2.height},
                    {w:data.element1.width,h:data.element1.height}
                ]

                $(".edit_box").each(function(index){
                    $(this).parent().css({
                        '-webkit-box-sizing': "border-box",
                        '-moz-box-sizing': "border-box",
                        boxSizing: "border-box",
                        transform:"none"
                    });
                    console.log(arr[index].w,"-----",arr[index].h,"---",index,"---",arr)
                    $(this).css({
                        width:arr[index].w + "px",
                        height:arr[index].h + "px"
                    })
                    $(this).css({
                        top: - 2 + "px",
                        left: - 2 + "px"
                    });
                    
                })
                



            }
        );


//        $("body").css("background",arr[rnd(0,6)]);
    });

    // 设置事件监听器
    window.addEventListener("DOMContentLoaded", function() {
        // 获取元素
        var canvas = document.getElementById("canvas"),
            context = canvas.getContext("2d"),
            video = document.getElementById("video"),
            videoObj = { "video": true },
            errBack = function(error) {
                console.log("Video capture error: ", error.code);
            };

        // 设置video监听器
        if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function(stream) {
                video.src = stream;
                video.play();
            }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function(stream){
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
    }, false);

    var scaling_el_n1 = document.getElementById("rotate_el_n1");
    scaleORrotate(oTitle,scaling_el_n1);
    var scaling_el_n2 = document.getElementById("rotate_el_n2");
    scaleORrotate(oLogo,scaling_el_n2);
};

/*拖拽封装函数*/
function drag(oDiv){
    $(oDiv).on("touchstart",function(ev){
        var disX = ev.targetTouches[0].pageX - oDiv.offsetLeft;
        var disY = ev.targetTouches[0].pageY - oDiv.offsetTop;
        $(oDiv).css("zIndex",zIndex++);
        function fnMove(ev){
            //位置
            var l = ev.targetTouches[0].pageX - disX;
            var t = ev.targetTouches[0].pageY - disY;
            //位置限制
            if(t <= 4 ){
                t = 4;
            }
            if(t >= $(window).height() - $(oDiv).height()){
                t = $(window).height() - $(oDiv).height()
            }
            if(l <= 4){
                l = 4
            }
            if(l >= $(window).width() - $(oDiv).width()){
                l = $(window).width() - $(oDiv).width();
            }
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";
        }
        function fnEnd(){
            //释放资源
            $(oDiv).off("touchmove",fnMove);
            $(oDiv).off("touchend",fnEnd);
        }

        $(oDiv).on("touchmove",fnMove);
        $(oDiv).on("touchend",fnEnd);

        //ev.preventDefault();
    });
}
//点击修改---出现选择框
function chang(obj) {
    obj.on("click",function(){
        console.log("111");
        if(obj.hasClass("border_add")) {
            obj.removeClass("border_add");
        }else{
            obj.addClass("border_add");
        }
    });
}
/*文字编辑封装函数*/
function txt_edit(obj){
    var border = obj.css("borderWidth");
    var fontSize = obj.find('.title_txt').css("fontSize");
    var color = '#000000';
    var content = '';
    //初始化
    var arr = [color,fontSize,border,content];
    $('.modify-options li span i').each(function (index) {
        $(this).html(arr[index]);
    });

    $(".content_inp").bind("input propertychange change", function (event) {
        if (event.type != "propertychange" || event.originalEvent.propertyName == "value") {
            $('.title_txt').text($(this).val());

            var signstr = $('#uid').val() + $(this).val() + '.00';
            // $("#pricesign").val(faultylabs.MD5(signstr));
        }

    });


    //修改字体颜色
    $('.modify-options li').eq(0).find('input').bind("change",function () {
        console.log($(this).val());
        $('.modify-options li span i').eq(0).html($(this).val());
        obj.css("color",$(this).val());
    });
    //修改边框
    $('.modify-options li').eq(2).find('button').bind("touchstart",function (ev) {
        event.stopPropagation();
        var type = $(this).html();
        var num = parseFloat($('.modify-options li span i').eq(2).html());
        if(type == "-"){
            if(num!=0){
                $('.modify-options li span i').eq(2).html(--num + "px");
            }
        }else{
            $('.modify-options li span i').eq(2).html(++num + "px");
        }
        obj.css("border",num+"px #000 solid");
        choiceSize(obj);
    });

    $('.sure_btn').on("touchstart",function () {
        $('.modify-options').animate({
            bottom:'-100%'
        },800);
        $('#title').css("zIndex",1);
        $('.modify-options li').find('button').unbind('touchstart');
    });
}

/*旋转封装函数*/
function a2d(n){
    return n*180/Math.PI;
}
function scaleORrotate(oDiv1,oDiv2){
    var d1 = 0;
    var d2 = 1;
    oDiv2.addEventListener("touchstart",function(ev){
        event.stopPropagation();
        var oldD = d1;
        var oldD2 = d2;
        var isSOR = 0;//判断是选择还是缩放
        var isFirstIn = true; //首次进入
        $('.edit_box').hide();
        $(this).prev().show();
        function getD(ev){
            var x1 = oDiv1.offsetLeft + oDiv1.offsetWidth/2;
            var y1 = oDiv1.offsetTop + oDiv1.offsetHeight/2;

            var x2 = ev.targetTouches[0].pageX;
            var y2 = ev.targetTouches[0].pageY;

            var x = x2 - x1;
            var y = y1 - y2;
            var z = a2d(Math.atan2(y,x));
            return {x:x,y:y,z:z};
        }

        var downD = getD(ev);

        function fnMove(ev){
            var a = downD.x - getD(ev).x;
            var b = downD.y - getD(ev).y;
            var c = Math.abs(Math.abs(a) - Math.abs(b));
            if(Math.abs(a) > 10 || Math.abs(b) > 10 ){
                if(isFirstIn){
                    if(c > 5){
                        isSOR = 1;//旋转
                    }else{
                        isSOR = 2;//缩放
                    }
                }
                isFirstIn = false;
            }


            d1 = (oldD + downD.z - getD(ev).z);

            //console.log(d1.toFixed(1))
            //d2 = oldD2 + (downD.y - getD(ev).y)/40;

             if(d1 <= 0 && d1 > -20){
                d2 = oldD2 - (downD.x - getD(ev).x)/40;
            }
            else if(d1 <= 20 && d1 > 0){
                d2 = oldD2 + (downD.y - getD(ev).y)/40;
            }

            if(d2 <= min_width / parseFloat(oDiv1.offsetWidth)){
                d2 = min_width / parseFloat(oDiv1.offsetWidth);
            }
            if(Math.abs(d2) >= max_width / parseFloat(oDiv1.offsetWidth)){
                d2 = max_width / parseFloat(oDiv1.offsetWidth);
            }
            oDiv1.style.transform = "rotate("+d1+"deg)" +"scale("+d2+")";
            oDiv1.setAttribute('d2_num',Math.round(d2*1000)/1000);
            console.log(oDiv1.getAttribute('d2_num'))
        }

        function fnEnd(){
            oDiv2.removeEventListener("touchmove",fnMove,false);
            oDiv2.removeEventListener("touchend",fnEnd,false);
        }
        oDiv2.addEventListener("touchmove",fnMove,false);
        oDiv2.addEventListener("touchend",fnEnd,false);
        ev.preventDefault();
    },false);
}
//上传添加方法
function fn1(obj1){
        var obj = $(obj1).parents(".Bg_choose");
        console.log(obj.attr("class"));
        if(obj.hasClass("BG_CHOOSE")){
            CHANGEBGCOLOR = null;
            $(obj).find(".default_bg_div").off("click");
            $(obj).find(".upload_img_box").off("click");

            setTimeout(function(){

                CHANGEBGCOLOR = function (obj){
                    console.log("body");
                    $(obj).css("zIndex","999");

                    $(obj).find(".upload_img_box .checked").removeClass("on");
                    $(obj).find(".default_bg_div").removeClass("on");
                    if(!!!$("body").attr("data-src")){
                        //色彩选择
                        var INITBG = $("body").css("backgroundColor");

                        $(obj).find(".default_bg_div").each(function(){
                            console.log(rgbToHex($(this).css("backgroundColor")),"--->",rgbToHex(INITBG))
                            if(rgbToHex($(this).css("backgroundColor")) == rgbToHex(INITBG)){
                                $(this).addClass("on");
                                return false;
                            }
                        });
                    }else{
                        //图片选择
                        var INITBG = $("body").attr("data-src");
                        $(obj).find(".upload_img_box img").each(function(){
                            if( $(this).attr("src") ==INITBG){
                                $(this).parent().find(".checked").addClass("on");
                                return false;
                            }
                        });
                    }

                    //色彩选择
                    $(obj).find(".default_bg_div").on("click",clickDiv);
                    //图片选择
                    $(obj).find(".upload_img_box").on("click",clickBox);
                    function clickBox(){
                        if($(this).find(".checked").hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            //图片选择
                            $("body").css("background","none");
                            $("body").css("background","url("+ INITBG+") no-repeat");
                            $("body").attr("data-src",INITBG);
                            $("body").css("backgroundSize","100% 100%");
                        }else{
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            $(this).find(".checked").addClass("on");
                            //图片选择
                            $("body").css("background","none");
                            $("body").css("background","url("+ $(this).find("img").attr("src")+") no-repeat");
                            $("body").attr("data-src",$(this).find("img").attr("src"));
                            $("body").css("backgroundSize","100% 100%");
                        }
                    }

                    function clickDiv(){
                        if($(this).hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");

                            $("body").css("background","none");
                            $("body").css("background",INITBG);
                            $("body").removeAttr("data-src");
                        }else{
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");

                            $(this).addClass("on");
                            $("body").css("background","none");
                            $("body").css("background",$(this).css("background"));
                            $("body").removeAttr("data-src");
                        }
                    }

                    $(obj).find(".close").on("click",function(){
                        $(obj).fadeOut();

                        if(!!$(obj).attr("data-src")){
                            //色彩选择
                            $("body").css("background","none");
                            $("body").css("background",INITBG);
                            $("body").removeAttr("data-src");
                        }else{
                            //图片选择
                            $("body").css("background","none");
                            $("body").css("background","url("+ INITBG+") no-repeat");
                            $("body").attr("data-src",INITBG);
                            $("body").css("backgroundSize","100% 100%");
                        }

                        $(obj).find(".default_bg_div").off("click",clickDiv);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        CHANGEBGCOLOR = null;

                    });
                    $(obj).find("button.sure_btn").on("click",function(){
                        $(obj).fadeOut();
                        $(obj).find(".default_bg_div").off("click",clickDiv);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        CHANGEBGCOLOR = null;
                    });
                }

                 CHANGEBGCOLOR('.BG_CHOOSE');
            },1);
        }else {
            CHANGEWZ = null;
            
            $(obj).find(".default_bg_div").off("click");
            $(obj).find(".upload_img_box").off("click");
            $(".WZ_border button").off("click");
            $('.WZ_color p input').off("change");

            setTimeout(function(){
                CHANGEWZ = function (obj,WZ){
                    $(obj).fadeIn();
                    $(obj).css("zIndex","999");
                    var INITBG = $(WZ).css("backgroundColor");

                    $(obj).find(".upload_img_box .checked").removeClass("on");
                    $(obj).find(".default_bg_div").removeClass("on");



                    if(!!!$(WZ).attr("data-src")){
                        //色彩选择
                        var INITBG = $(WZ).css("backgroundColor");

                        $(obj).find(".default_bg_div").each(function(){
                            if(rgbToHex($(this).css("backgroundColor")) == rgbToHex(INITBG)){
                                $(this).addClass("on");
                                return false;
                            }
                        });
                    }else{
                        //图片选择
                        var INITBG = $(WZ).attr("data-src");
                        $(obj).find(".upload_img_box img").each(function(){
                            if( $(this).attr("src") == INITBG){
                                $(this).parent().find(".checked").addClass("on");
                                return false;
                            }
                        });
                    }

                    if($(WZ).attr("id") == 'element_img'){
                        var INITBG = $(WZ).find("img").attr("src") ;
                       
                    }
                    //色彩选择
                    $(obj).find(".default_bg_div").on("click",divClick);

                    //图片选择
                    $(obj).find(".upload_img_box").on("click",clickBox);



                    var BORDER_W = $(WZ).css("borderWidth");
                    var BORDER_C = rgbToHex($(WZ).css("borderColor"));
                    console.log(BORDER_C+"----"+BORDER_W);
                    $(".WZ_border span i").text(parseInt(BORDER_W));
                    $(".WZ_color p input").val(BORDER_C);
                    $(".WZ_border button").on("click",bClick);

                    $('.WZ_color p input').on("change",changeFn);

                    function clickBox(){
                        if($(this).find(".checked").hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            //图片选择
                            $(WZ).css("background","none");
                            $(WZ).css("background","url("+ INITBG+") no-repeat");
                            $(WZ).attr("data-src",INITBG);
                            $(WZ).css("backgroundSize","100% 100%");

                            if($(WZ).attr("id") == 'element_img'){
                               $(WZ).find("img").attr("src",INITBG) ;
                            }
                        }else{
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            $(this).find(".checked").addClass("on");
                            //图片选择
                            $(WZ).css("background","none");
                            $(WZ).css("background","url("+ $(this).find("img").attr("src")+") no-repeat");
                            $(WZ).attr("data-src",$(this).find("img").attr("src"));
                            $(WZ).css("backgroundSize","100% 100%");

                            if($(WZ).attr("id") == 'element_img'){
                               $(WZ).find("img").attr("src",$(this).find("img").attr("src")) ;
                            }
                        }
                    }

                    function divClick(){
                        if($(this).hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            $(WZ).css("background","none");
                            $(WZ).css("background",INITBG);
                            $(WZ).removeAttr("data-src");
                        }else{
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            $(this).addClass("on");
                            $(WZ).css("background","none");
                            $(WZ).css("background",$(this).css("background"));
                            $(WZ).removeAttr("data-src");
                        }
                    }

                    function bClick(){
                        var BW = parseInt($(".WZ_border span i").html());
                        console.log("--->",BW)
                        var TYPE = $(this).val();
                        if(TYPE === "-"){
                            if(BW <= 0){
                                BW = 0;
                            }else{
                                BW -= 1;
                            }
                        }else if(TYPE ==="+"){
                            BW = parseInt(BW) + 1;
                        }
                        $(".WZ_border span i").html(BW);
                        $(WZ).css("border",BW + "px solid " + $('.WZ_color p input').val());
                        choiceSize(WZ);
                    }

                    function changeFn(){
                        $(WZ).css("border", parseInt($(".WZ_border span i").html())+ "px solid " +$(this).val());
                        choiceSize(WZ);
                    }
                    

                    $(obj).find(".close").on("click",function(){
                        console.log(BORDER_W,"----",BORDER_C);
                        $(WZ).css("border",parseInt(BORDER_W) + "px solid " + BORDER_C);
                        $(WZ).css("background","none");
                        $(WZ).css("background",INITBG);
                        choiceSize(WZ);

                        $(obj).fadeOut();

                        if(!!!$(WZ).attr("data-src")){
                            //色彩选择
                            $(WZ).css("background","none");
                            $(WZ).css("background",INITBG);
                            $(WZ).removeAttr("data-src");
                        }else{
                            //图片选择
                            $(WZ).css("background","none");
                            $(WZ).css("background","url("+ INITBG+") no-repeat");
                            $(WZ).attr("data-src",INITBG);
                            $(WZ).css("backgroundSize","100% 100%");
                            if($(WZ).attr("id") == 'element_img'){
                               $(WZ).find("img").attr("src",INITBG) ;
                            }
                        }

                        $(obj).find(".default_bg_div").off("click",divClick);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        $(".WZ_border button").off("click",bClick);
                        $('.WZ_color p input').off("change",changeFn);

                    });

                    $(obj).find("button.sure_btn").on("click",function(){
                        $(obj).fadeOut();
                        $(obj).find(".default_bg_div").off("click",divClick);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        $(".WZ_border button").off("click",bClick);

                        $('.WZ_color p input').off("change",changeFn);
                    });
                }
                CHANGEWZ(obj,WZ)
            },1);
        }
}

//切换背景色
function changeBgColor(obj){
    $(obj).css("zIndex","999");

    $(obj).find(".upload_img_box .checked").removeClass("on");
    $(obj).find(".default_bg_div").removeClass("on");

    if(!!$(obj).attr("data-src")){
        //色彩选择
        var INITBG = $("body").css("background");

        $(obj).find(".default_bg_div").each(function(){
            if(rgbToHex($(this).css("background")) == rgbToHex(INITBG)){
                $(this).addClass("on");
                return false;
            }
        });
    }else{
        //图片选择
        var INITBG = $("body").attr("data-src");
        $(obj).find(".upload_img_box img").each(function(){
            if( $(this).attr("src") ==INITBG){
                $(this).parent().find("checked").addClass("on");
                return false;
            }
        });
    }

    //色彩选择
    $(obj).find(".default_bg_div").on("click",clickDiv);
    //图片选择
    $(obj).find(".upload_img_box").on("click",clickBox);
    function clickBox(){
        alert(1)
        if($(this).find(".checked").hasClass("on")){
            $(obj).find(".checked").removeClass("on");
            //图片选择
            $("body").css("background","none");
            $("body").css("background","url("+ INITBG+") no-repeat");
            $("body").attr("data-src",INITBG);
            $("body").css("backgroundSize","100% 100%");
        }else{
            $(obj).find(".checked").removeClass("on");
            $(this).find(".checked").addClass("on");
            //图片选择
            $("body").css("background","none");
            $("body").css("background","url("+ $(this).find("img").attr("src")+") no-repeat");
            $("body").attr("data-src",$(this).find("img").attr("src"));
            $("body").css("backgroundSize","100% 100%");
        }
    }

    function clickDiv(){
        if($(this).hasClass("on")){
            $(obj).find(".default_bg_div").removeClass("on");
            $("body").css("background","none");
            $("body").css("background",INITBG);
            $("body").removeAttr("data-src");
        }else{
            $(obj).find(".default_bg_div").removeClass("on");
            $(this).addClass("on");
            $("body").css("background","none");
            $("body").css("background",$(this).css("background"));
            $("body").removeAttr("data-src");
        }
    }

    $(obj).find(".close").on("click",function(){
        $(obj).fadeOut();

        if(!!$(obj).attr("data-src")){
            //色彩选择
            $("body").css("background","none");
            $("body").css("background",INITBG);
            $("body").removeAttr("data-src");
        }else{
            //图片选择
            $("body").css("background","none");
            $("body").css("background","url("+ INITBG+") no-repeat");
            $("body").attr("data-src",INITBG);
            $("body").css("backgroundSize","100% 100%");
        }

        $(obj).find(".default_bg_div").off("click",clickDiv);
        $(obj).find(".upload_img_box").off("click",clickBox);

    });
    $(obj).find("button.sure_btn").on("click",function(){
        $(obj).fadeOut();
        $(obj).find(".default_bg_div").off("click",clickDiv);
        $(obj).find(".upload_img_box").off("click",clickBox);
    });
}
//随机数
function rnd(min,max){
    return min + Math.floor(Math.random() * (max -min));
}
//文字修改背景和边框
function changeWZ(obj,WZ){
    $(obj).fadeIn();
    $(obj).css("zIndex","999");
    var INITBG = $(WZ).css("background");

    $(obj).find(".upload_img_box .checked").removeClass("on");
    $(obj).find(".default_bg_div").removeClass("on");



    if(!!$(WZ).attr("data-src")){
        //色彩选择
        var INITBG = $(WZ).css("background");

        $(obj).find(".default_bg_div").each(function(){
            if(rgbToHex($(this).css("background")) == rgbToHex(INITBG)){
                $(this).addClass("on");
                return false;
            }
        });
    }else{
        //图片选择
        var INITBG = $(WZ).attr("data-src");
        $(obj).find(".upload_img_box img").each(function(){
            if( $(this).attr("src") ==INITBG){
                $(this).parent().find("checked").addClass("on");
                return false;
            }
        });
    }
    //色彩选择
    $(obj).find(".default_bg_div").on("click",divClick);

    //图片选择
    $(obj).find(".upload_img_box").on("click",clickBox);



    var BORDER_W = $(WZ).css("borderWidth");
    var BORDER_C = rgbToHex($(WZ).css("borderColor"));
    console.log(BORDER_C+"----"+BORDER_W);
    $(".WZ_border span i").text(parseInt(BORDER_W));
    $(".WZ_color p input").val(BORDER_C);
    $(".WZ_border button").on("click",bClick);

    $('.WZ_color p input').on("change",changeFn);

    function clickBox(){
        if($(this).find(".checked").hasClass("on")){
            $(obj).find(".checked").removeClass("on");
            //图片选择
            $(WZ).css("background","none");
            $(WZ).css("background","url("+ INITBG+") no-repeat");
            $(WZ).attr("data-src",INITBG);
            $(WZ).css("backgroundSize","100% 100%");
        }else{
            $(obj).find(".checked").removeClass("on");
            $(this).find(".checked").addClass("on");
            //图片选择
            $(WZ).css("background","none");
            $(WZ).css("background","url("+ $(this).find("img").attr("src")+") no-repeat");
            $(WZ).attr("data-src",$(this).find("img").attr("src"));
            $(WZ).css("backgroundSize","100% 100%");
        }
    }

    function divClick(){
        if($(this).hasClass("on")){
            $(obj).find(".default_bg_div").removeClass("on");
            $(WZ).css("background","none");
            $(WZ).css("background",INITBG);
            $(WZ).removeAttr("data-src");
        }else{
            $(obj).find(".default_bg_div").removeClass("on");
            $(this).addClass("on");
            $(WZ).css("background","none");
            $(WZ).css("background",$(this).css("background"));
            $(WZ).removeAttr("data-src");
        }
    }

    function bClick(){
        var BW = parseInt($(".WZ_border span i").html());
        console.log("--->",BW)
        var TYPE = $(this).val();
        if(TYPE === "-"){
            if(BW <= 0){
                BW = 0;
            }else{
                BW -= 1;
            }
        }else if(TYPE ==="+"){
            BW = parseInt(BW) + 1;
        }
        $(".WZ_border span i").html(BW);
        $(WZ).css("border",BW + "px solid " + $('.WZ_color p input').val());
        choiceSize(WZ);
    }

    function changeFn(){
        $(WZ).css("border", parseInt($(".WZ_border span i").html())+ "px solid " +$(this).val());
        choiceSize(WZ);
    }
    

    $(obj).find(".close").on("click",function(){
        console.log(BORDER_W,"----",BORDER_C);
        $(WZ).css("border",parseInt(BORDER_W) + "px solid " + BORDER_C);
        $(WZ).css("background",INITBG);
        choiceSize(WZ);

        $(obj).fadeOut();

        if(!!$(WZ).attr("data-src")){
            //色彩选择
            $(WZ).css("background","none");
            $(WZ).css("background",INITBG);
            $(WZ).removeAttr("data-src");
        }else{
            //图片选择
            $(WZ).css("background","none");
            $(WZ).css("background","url("+ INITBG+") no-repeat");
            $(WZ).attr("data-src",INITBG);
            $(WZ).css("backgroundSize","100% 100%");
        }

        $(obj).find(".default_bg_div").off("click",divClick);
        $(obj).find(".upload_img_box").off("click",clickBox);
        $(".WZ_border button").off("click",bClick);
        $('.WZ_color p input').off("change",changeFn);

    });

    $(obj).find("button.sure_btn").on("click",function(){
        $(obj).fadeOut();
        $(obj).find(".default_bg_div").off("click",divClick);
        $(obj).find(".upload_img_box").off("click",clickBox);
        $(".WZ_border button").off("click",bClick);

        $('.WZ_color p input').off("change",changeFn);
    });
}


//RGB转化成16进制 #
var rgbToHex = function(rgb) {
    // rgb(x, y, z)
    var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
    var hex = "#";
    for (var i = 0; i < 3; i++) {
        // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
        // 'color[i]' 是数组，要转换成字符串.
        // 如果结果是一位数，就在前面补零。例如： A变成0A
        hex += ("0" + Number(color[i]).toString(16)).slice(-2);
    }
    return hex;
}
//修改选择框的大小
function choiceSize(obj){
    var w = parseInt($(obj).css("width"));
    var h = parseInt($(obj).css("height"));
    var b = parseInt($(obj).css("borderWidth"));
    console.log("--->",w+"H:",h+"B:",b)
    $(obj).find('.edit_box').css({
        top: -b -2 + "px",
        left: -b - 2 + "px"
    });
}


//初始化编辑框样式
function initEditBox(){

    $(".edit_box").each(function(){
        $(this).parent().css({
            '-webkit-box-sizing': "border-box",
            '-moz-box-sizing': "border-box",
            boxSizing: "border-box"
        });
        $(this).css({
            width:$(this).parent().outerWidth() + "px",
            height:$(this).parent().outerHeight() + "px"
        })
    })
}
