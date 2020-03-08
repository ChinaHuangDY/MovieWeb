$(function () {

    $('#form1').form('disableValidation');
})


//保存按钮
function btn_Save() {
    var mMusicTitle = $("#MusicTitle").val();
    var mSinger = $("#Singer").val();
    var mAlbum = $("#Album").val();
    var mDuration = $("#Duration").val();

    var parms = {
        MusicTitle: mMusicTitle,
        Singer: mSinger,
        Album: mAlbum,
        Duration: mDuration
    }
    var parameter = "";
    parameter = JSON.stringify(parms);
    //strQuery: JSON.stringify({ ID: "1", NAME: "Jim", CREATETIME: "1988-09-11" }) 
    $.ajax({
        url: 'http://localhost:120/api/Songs/Save/',
        type: 'GET',
        dataType: 'json',
        data: { value: parameter },
        success: function (data) {
            console.log("success");
            top.closeDialog('success');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("fail");
        }

    })
}
