var zIndex = 1;
        
var App = {
    init:function(){
        var self = this;

        //页面初始化
        self.upData();

        
        //初始化拖拽位置
        $(".title").css({
            "left":"20px",
            "top":"10px"
        });
        $(".first_img").css({
            "left":"50px",
            "top":"60px"
        });
        $(".last_img").css({
            "left":"80px",
            "top":"130px"
        });

    },
    render:function(data){
        var self = this;
        //初始化手机页面
        self.renderIphone(data);
        //标题编辑
        self.titleEdit(data);
        //拖拽调用
        self.dragEle();
        //choise按钮点击
        self.choiseBtnClick();
        //背景弹窗函数
        self.bgPopup(data);
        //元素一弹窗函数
        self.img1Popup(data);
        //元素二弹窗函数
        self.img2Popup(data);
        //配置选项
        self.optionsFn(data);
        //模板保存
        self.sendData();
    },
    //初始化手机页面
    renderIphone:function(data){
        var self = this;

        var logoData = {
            "axis_x":data.base.logo_axis_x,
            "axis_y":data.base.logo_axis_y,
            "width":data.base.logo_width,
            "height":data.base.logo_height,
            "source_url":data.base.logo_img,
            "origin":data.base.logo_show
        }

        var titleSize = self.constrainFn(data.bg.width,data.bg.height,data.title);
        var logoSize = self.constrainFn(data.bg.width,data.bg.height,logoData);
        var img1Size = self.constrainFn(data.bg.width,data.bg.height,data.elements[0]);
        var img2Size = self.constrainFn(data.bg.width,data.bg.height,data.elements[1]);

        var title = $(".title");
        var logo = $(".logo");
        var img1 = $(".first_img");
        var img2 = $(".last_img");

        //主标题
        $(".title_fix").text(data.base.name);

        //背景图
        $(".ipone_contain").css("backgroundImage","url('"+data.bg.source_url+"')");
        $(".ipone_contain").attr("data-src",data.bg.source_url);

        //title
        title.text(data.title.content);
        title.css({
            "width":titleSize.w + "px",
            "height":titleSize.h + "px",
            "left":titleSize.l + "px",
            "top":titleSize.t + "px",
            "fontSize":data.title.font_size,
            "color":data.title.font_color
        });
        title.attr("data-color",data.title.font_color);
        if(data.title.origin == 1){
            title.removeClass("hidden");
            $(".title_choise").prop("checked",true);
        }else{
            title.addClass("hidden");
            $(".title_choise").prop("checked",false);
        }
        //logo
        logo.find("img").attr("src",logoData.source_url);
        logo.css({
            "width":logoSize.w + "px",
            "height":logoSize.h + "px",
            "left":logoSize.l + "px",
            "top":logoSize.t + "px"
        });
        if(logoData.origin == 1){
            logo.removeClass("hidden");
            $(".logo_choise").prop("checked",true);
        }else{
            logo.addClass("hidden");
            $(".logo_choise").prop("checked",false);
        }
        //元素1
        img1.find("img").attr("src",data.elements[0].source_url);
        img1.css({
            "width":img1Size.w + "px",
            "height":img1Size.h + "px",
            "left":img1Size.l + "px",
            "top":img1Size.t + "px"
        });
        $(".img1_popup .img_size .img_w input").val(parseInt(img1Size.w));
        $(".img1_popup .img_size .img_h input").val(parseInt(img1Size.h));
        
        if(data.elements[0].origin == 1){
            img1.removeClass("hidden");
            $(".img1_choise").prop("checked",true);
        }else{
            img1.addClass("hidden");
            $(".img1_choise").prop("checked",false);
        }

        //元素1
        img2.find("img").attr("src",data.elements[1].source_url);
        img2.css({
            "width":img2Size.w + "px",
            "height":img2Size.h + "px",
            "left":img2Size.l + "px",
            "top":img2Size.t + "px"
        });
        
        $(".img2_popup .img_size .img_w input").val(parseInt(img2Size.w));
        $(".img2_popup .img_size .img_h input").val(parseInt(img2Size.h));

        if(data.elements[1].origin == 1){
            img2.removeClass("hidden");
            $(".img2_choise").prop("checked",true);
        }else{
            img2.addClass("hidden");
            $(".img2_choise").prop("checked",false);
        }


    },
    //配置选项
    optionsFn:function(data){
        var self = this;
        
        

        //logo
        $(".logo_choise").on("click",function(){
            var bl = $(this).prop("checked");
            if(bl){
                $(".logo").removeClass("hidden");
            }else{
                $(".logo").addClass("hidden");
            }
        });

        //保存天数
        $("#preservation").on("click",function(){
            var bl = $(this).prop("checked");

            if(bl){
               $(".preservation_content").prop("disabled",false); 
            }else{
                $(".preservation_content").prop("disabled",true); 
            }
        });
        //初始时间
        var  d = new Date();
        var year = d.getFullYear();
        var month = self.addZero(d.getMonth() + 1);
        var day = self.addZero(d.getDate());

        var d_string = year + "-" + month + "-" + day;

        $(".choise_date input").val(d_string);

        


    },
    //不足10 补0
    addZero:function(n){
        return n < 10 ? "0" + n : "" + n ;
    },
    //模板保存
    sendData:function(){
        var self = this;

        $(".send_data").on("click",function(){
            var data = self.getMes();
            console.log("data",data)
            var url = "";
            $.post(url,data,function(result){
                console.log(result)
              });
        })
    },
    //获取信息上传
    getMes:function(){
        var self = this;

        var title = $(".title");
        var logo = $(".logo");
        var img1 = $(".first_img");
        var img2 = $(".last_img");
        var bg = $(".ipone_contain");


        if($("#plus").prop("checked")){
            var type = "0";
        }else if($("#reduce").prop("checked")){
            var type = "1";
        }

        var options = {
            "logo":$(".logo_choise").prop("checked"),//logo
            "weather":$(".weather_choise").prop("checked"),//天气
            "QR_code":$(".QR_code_choise").prop("checked"),//民生二维码
            "time":$(".time_choise").prop("checked"),//当前时间
            "staff":{//员工信息
                "job_number":$(".job_number_choise").prop("checked"),//工号
                "phone_number":$(".phone_number_choise").prop("checked"),//电话号码
                "head_portrait":$(".head_portrait_choise").prop("checked"),//头像
                "nickname":$(".nickname_choise").prop("checked"),//昵称
                "myname":$(".my_choise").prop("checked"),//名称
                "qr_code":$(".qr_choise").prop("checked"),//二维码
            },
            "count":{//计数
                "type":type,//类型  0 加   1 减
                "excitation":$(".excitation_content").val(),//激励口号
                "date":$(".choise_date input").val(),//时间
                "preservation":{//保存计数
                    "exist":$("#preservation").prop("checked"),
                    "content":$(".preservation_content").val()//保存计数的激励口号
                }
            },
            "title":{
                "left":logo.offset().left,
                "top":logo.offset().top,
                "width":title.css("width"),
                "height":title.css("height"),
                "lineHeight":title.css("lineHeight"),
                "fontSize":title.css("fontSize"),
                "color":title.attr("data-color"),
                "content":title.html(),
                "exist":$(".title_choise").prop("checked")
            },
            "bg":{
                "width":bg.css("width"),
                "height":bg.css("height"),
                "src":bg.attr("data-src")
            },
            "logo":{
                "left":logo.offset().left,
                "top":logo.offset().top,
                "width":logo.css("width"),
                "height":logo.css("height"),
                "src":logo.find("img").attr("src"),
                "exist":$(".logo_choise").prop("checked")
            },
            "img1":{
                "left":logo.offset().left,
                "top":logo.offset().top,
                "width":img1.css("width"),
                "height":img1.css("height"),
                "src":img1.find("img").attr("src"),
                "exist":$(".img1_choise").prop("checked")
            },
            "img2":{
                "left":logo.offset().left,
                "top":logo.offset().top,
                "width":img2.css("width"),
                "height":img2.css("height"),
                "src":img2.find("img").attr("data-src"),
                "exist":$(".img2_choise").prop("checked")
            }
        };
        return options;
    },
    //标题编辑
    titleEdit:function(data){
        var self = this;

        //初始化文字，颜色
        var title = $(".title");
        var content = title.html();
        var color = title.attr("data-color");
        var fontSize = title.css("fontSize");

        $(".title_content").val(content);
        $(".add_plus span i").text(parseInt(fontSize));
        $(".add_plus input").val(parseInt(fontSize));
        $(".color_change ").val(color);
        $(".chang_color span i").text(color);
        //标题选中or不选
        $(".title_choise").on("click",function(){
            var bl = $(this).prop("checked");
            console.log("标题选中or不选",bl);
            if(bl){
                $(".title").removeClass("hidden");
            }else{
                $(".title").addClass("hidden");
            }
            
        });
        //标题内容
        $(".title_content").on("input",function(){
            var txt = $(this).val();
            $(".title").html(txt);
                
            //拖拽调用
            self.dragEle();
        });
        //字体大小
        $('.add_plus input').on("input",function () {
            var num = parseFloat( $(this).val());
            console.log("字体大小",num);
            if(num >= 50 ) num = 50;
            if(num <= 12) num = 12;
            if(isNaN(num)) num = 12;
            $(".title_content").css("fontSize",num+"px");
            $(".title").css({
                "fontSize":num + "px",
                "lineHeight":num + 10 + "px"
            });
            $(".add_plus span i").text(num);
            
            //拖拽调用
            self.dragEle();

    
        });
        //字体颜色
        $(".color_change").on("change",function(){
            var color = $(this).val();
            console.log("字体颜色",color);
            $(".chang_color span i").text(color);
            $(".title").css("color",color);
            $(".title").attr("data-color",color);
        });
    },
    //添加拖拽事件
    dragEle:function(){
        $(".drag").each(function(index,value){
            var _this = this;
            $(_this).myDrag({
                parent:'.ipone_contain',
                randomPosition:false,
                direction:'all',
                dragStart:function(x,y){
                    zIndex++;
                    // console.log("拖动开始===");
                    $(_this).css("zIndex",zIndex);
                    // console.log("x:",x,"==y:",y);
                },
                dragEnd:function(x,y){
                    // console.log("拖动结束===");
                },
                dragMove:function(x,y){
                    // console.log("拖动中===");
                }
            });
        });
    },
    //choise按钮点击
    choiseBtnClick:function(){
        //choise按钮点击效果
        $(".choise").on("mousedown",function(){
            $(this).addClass("on");
        });
        $(document).on("mouseup",function(){
            $(".choise").removeClass("on");
        });
        $(".bg_edit .choise").on("click",function(){
            $(".bg_popup").removeClass("hidden");
        });
        $(".img1_edit .choise").on("click",function(){
            $(".img1_popup").removeClass("hidden");
        });
        $(".img2_edit .choise").on("click",function(){
            $(".img2_popup").removeClass("hidden");
        });
    },
    //背景弹窗函数
    bgPopup:function(){
        var self = this;
        //弹窗关闭
        self.popupClose();
        var bg_url = "";//.checked.on
        var list = $(".bg_popup .list_img");
        var check = $(".bg_popup .checked");
        list.removeClass("on");
        check.removeClass("on");

        // 初始化
        var old_Url = $(".ipone_contain").attr("data-src");

        list.each(function(){
            var url = $(this).find("img").attr("src");
            if(url == old_Url){
                $(this).addClass("on");
            }
        });
        $(".bg_popup .upload_img_box").each(function(){
            var url = $(this).find("img").attr("src");
            if(url == old_Url){
                $(this).find("checked").addClass("on");
            }
        });

        list.on("click",function(){
            var check = $(".bg_popup .checked");

            if($(this).hasClass("on")){
                list.removeClass("on");
                check.removeClass("on");
                bg_url = "";
            }else{
                list.removeClass("on");
                check.removeClass("on");
                $(this).addClass("on");
                bg_url = $(this).find("img").attr("src");
            }
            
        });
        $("body").on("click",".bg_popup .upload_img_box",function(){
            var check = $(".bg_popup .checked");
            
            if($(this).find(".checked").hasClass("on")){
                list.removeClass("on");
                check.removeClass("on");
                bg_url = "";
            }else{
                list.removeClass("on");
                check.removeClass("on");
                $(this).find(".checked").addClass("on");
                bg_url = $(this).find("img").attr("src");
            }
        });
        $(".bg_popup .sure_button").on("click",function(){
            if(bg_url == ""){

            }else{
                $(".ipone_contain").css("backgroundImage","url('"+bg_url+"')");
                $(".ipone_contain").aattr("data-src",bg_url);
            }
            $(".popup").addClass("hidden");
        });

    },
    //元素一弹窗函数
    img1Popup:function(){
        var self = this;
        //弹窗关闭
        self.popupClose();
        var img1_url = "";
        var list = $(".img1_popup .list_img");
        var check = $(".img1_popup .checked");
        var img1 = $(".first_img");
        var img1_w = -1;
        var img1_h = -1;


        list.removeClass("on");
        check.removeClass("on");

        // 初始化
        var old_Url = $(".first_img img").attr("src");
        
        list.each(function(){
            var url = $(this).find("img").attr("src");
            if(url == old_Url){
                $(this).addClass("on");
            }
        });
        $(".bg_popup .upload_img_box").each(function(){
            var url = $(this).find("img").attr("src");
            if(url == old_Url){
                $(this).find("checked").addClass("on");
            }
        });

        list.on("click",function(){
            var check = $(".img1_popup .checked");

            if($(this).hasClass("on")){
                list.removeClass("on");
                check.removeClass("on");
                img1_url = "";
            }else{
                list.removeClass("on");
                check.removeClass("on");
                $(this).addClass("on");
                img1_url = $(this).find("img").attr("src");
            }
            
        });
        $("body").on("click",".img1_popup .upload_img_box",function(){
            var check = $(".img1_popup .checked");
            if($(this).find(".checked").hasClass("on")){
                list.removeClass("on");
                check.removeClass("on");
                img1_url = "";
            }else{
                list.removeClass("on");
                check.removeClass("on");
                $(this).find(".checked").addClass("on");
                img1_url = $(this).find("img").attr("src");
            }
        });
        $(".img1_popup .img_size .img_w input").on("input",function(){
            var val = $(this).val();
            if(val <= 0){
                val = 0;
            }else if(val >= 300){
                val = 300;
            }
            $(this).val(val);
            img1_w = val;
        });
        $(".img1_popup .img_size .img_h input").on("input",function(){
            var val = $(this).val();
            if(val <= 0){
                val = 0;
            }else if(val >= 485){
                val = 485;
            }
            $(this).val(val);
            img1_h = val;
        });
        $(".img1_popup .sure_button").on("click",function(){
            if(img1_url == ""){

            }else{
                $(".first_img img").attr("src",img1_url);
            }
            if(img1_h >= 0) 
            img1.css("height",img1_h + "px");

            if(img1_w >= 0)
            img1.css("width",img1_w + "px");

            $(".popup").addClass("hidden");
        });


        
        //元素一选中or不选
        $(".img1_choise").on("click",function(){
            var bl = $(this).prop("checked");
            console.log("img1选中or不选",bl);
            if(bl){
                img1.removeClass("hidden");
            }else{
                img1.addClass("hidden");
            }
            
        });

    },
    //元素二弹窗函数
    img2Popup:function(){
        var self = this;
        //弹窗关闭
        self.popupClose();
        var img2_url = "";
        var list = $(".img2_popup .list_img");
        var check = $(".img2_popup .checked");
        var img2 = $(".last_img");
        var img2_w = -1;
        var img2_h = -1;

        list.removeClass("on");
        check.removeClass("on");

        
        // 初始化
        var old_Url = $(".last_img img").attr("src");
        
        list.each(function(){
            var url = $(this).find("img").attr("src");
            if(url == old_Url){
                $(this).addClass("on");
            }
        });
        $(".bg_popup .upload_img_box").each(function(){
            var url = $(this).find("img").attr("src");
            if(url == old_Url){
                $(this).find("checked").addClass("on");
            }
        });

        list.on("click",function(){
            var check = $(".img2_popup .checked");
            if($(this).hasClass("on")){
                list.removeClass("on");
                check.removeClass("on");
                img2_url = "";
            }else{
                list.removeClass("on");
                check.removeClass("on");
                $(this).addClass("on");
                img2_url = $(this).find("img").attr("src");
            }
            
        });
        $("body").on("click",".img2_popup .upload_img_box",function(){
            var check = $(".img2_popup .checked");
            if($(this).find(".checked").hasClass("on")){
                list.removeClass("on");
                check.removeClass("on");
                img2_url = "";
            }else{
                list.removeClass("on");
                check.removeClass("on");
                $(this).find(".checked").addClass("on");
                img2_url = $(this).find("img").attr("src");
            }
        });
        $(".img2_popup .img_size .img_w input").on("input",function(){
            var val = $(this).val();
            if(val <= 0){
                val = 0;
            }else if(val >= 300){
                val = 300;
            }
            $(this).val(val);
            img2_w = val;
        });
        $(".img2_popup .img_size .img_h input").on("input",function(){
            var val = $(this).val();
            if(val <= 0){
                val = 0;
            }else if(val >= 485){
                val = 485;
            }
            $(this).val(val);
            img2_h = val;
        });
        $(".img2_popup .sure_button").on("click",function(){
            if(img2_url == ""){

            }else{
                $(".last_img img").attr("src",img2_url);
            }
            if(img2_h >= 0) 
            img2.css("height",img2_h + "px");
            
            if(img2_w >= 0)
            img2.css("width",img2_w + "px");

            $(".popup").addClass("hidden");
        });
        //元素二选中or不选
        $(".img2_choise").on("click",function(){
            var bl = $(this).prop("checked");
            console.log("img2选中or不选",bl);
            if(bl){
                img2.removeClass("hidden");
            }else{
                img2.addClass("hidden");
            }
            
        });

    },
    //popup_close 弹窗关闭按钮
    popupClose:function(){
        $(".popup_close").on("click",function(){
            $(".popup").addClass("hidden");
        })
    },
    renderWebView:function(data){

    },
    upData:function(){
        var self = this;
        $.get(
            "../data/data1.json",
            function(data){
                self.render(data);
            }        
        )


    },
    /*计算比例系数*/
    constrainFn:function (bgW,bgH,obj){
        var ScreenH = 485;
        var ScreenW = 300;
        var scaleW = bgW / ScreenW;
        var scaleH = bgH / ScreenH;
        return {
            l:obj.axis_x / scaleW,
            t:obj.axis_y / scaleH,
            w:obj.width / scaleW,
            h:obj.height / scaleH
        }
    }
    
}

App.init();
