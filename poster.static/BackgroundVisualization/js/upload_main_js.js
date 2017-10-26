/**
 * Created by admin on 2016/12/13.
 */

$(function () {
	/*3、直接调用函数fileUpload_el()，其中第一个参数是页面中div的id;第二个参数是上传文件的接口地址;第三个参数是后端标记值;第四个参数是最大上传文件数;*/
    fileUpload_el({id:"cameraInput", form_name:"images[]", max_num:2});
    fileUpload_el({id:"cameraInput2", form_name:"images[]", max_num:2});
    fileUpload_el({id:"cameraInput3", form_name:"images[]", max_num:2});
});



function get_preview_html(file_fileName, img_url){
    //console.log(file_fileName);
    var view_html = '<div class="upload_img_box" >'+
        '<input type="hidden" name="'+file_fileName+'" value="'+img_url+'" />'+
        '<img src="'+img_url+'" />'+
        '<span class="upload_del" onclick="delUpImg(this)"></span><div class="checked">√</div></div>';
    return view_html;
}
function fileUpload_el(params){
    var id = params.id;
    //var url = params.url;
//  var url = '/Backend/Fileupload/oss';
	var url = 'test.json';
    var file_fileName = params.form_name || 'images[]';
    var file_maxImg = params.max_num || 3;
    var desc = params.desc || '';
    var default_url = params.default_url || '';
    var parse_response = params.parse_response;

    var str='<input id="fileUpload'+(id)+'" class="fileUpload_inp" type="file" name="files[]" multiple style="opacity:0;position:absolute;width: 120px;height: 40px;z-index: 500;">'+
        '<input type="button" name="button" capture="camera" accept="image/*" value="" class="btn btn-primary upload_btn" data-upload-num="'+file_maxImg+'" onclick="openBrowse(this);">'+
        (desc == undefined ? '' : '<span class="upload_care">(*建议上传尺寸为750x1334)</span>')+
        '<div id="preview-up-img"></div>';
    $('#'+id).append(str);

    if(default_url){
        if(typeof default_url == 'string')
            $('#fileUpload'+id).parent().children('#preview-up-img').append(get_preview_html(file_fileName, default_url));
        else if(typeof default_url == 'object')
            for(var v in default_url)
                $('#fileUpload'+id).parent().children('#preview-up-img').append(get_preview_html(file_fileName, default_url[v]));
    }
    $('#fileUpload'+id).fileupload({
        url: url,
        dataType: 'json',
        formData: {},
        done: function (e,data) {
            console.log(e);
            console.log(data);
            var img_url = data.result.data.imgUrl;
            if($(this).parent().find('.upload_img_box').length == (file_maxImg - 1)){
                $(this).hide();
            }else{
                $(this).show();
            }
            console.log(data.result);
            if(typeof parse_response == 'function')
                parse_response(data.result);

            $('#fileUpload'+id).parent().children('#preview-up-img').append(get_preview_html(file_fileName, img_url));
            //添加方法-宝宝
            console.log("添加方法-宝宝");
            
        },
        change:function (e, data) {

            if(data.files.length > 1){
                alert('单次只能上传1张图片');
                return false;
            }else if($(this).parent().find('.upload_img_box').length + data.files.length > file_maxImg){
                alert('图片最多只能上传'+file_maxImg+'张');
                return false;
            }
        },
        drop:function (e, data) {
            return false;
        },
        progressall: function (e, data) {}
    })
}

function openBrowse(obj,file_maxImg){
    if($(obj).parent().find('.upload_img_box').length > parseInt($(obj).attr("data-upload-num"))-1){
        alert("图片最多只能上传"+parseInt($(obj).attr("data-upload-num"))+"张");
        return false;
    }
}
function delUpImg(obj) {
    $(obj).parents('.form-group').find('.fileUpload_inp').show();
    $(obj).parent().remove();
}
