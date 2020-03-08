var mydate = new Date();
var ResultData = "";
var mYear = "";
var SetYear = "";
var EndYear = "";
var mDate = new Date();
var isFristLoad = true;
var TempDataItem = {};
$(function () {
    $(".todoItem .count").css("display", "none");


    $(".todoItemDCQZ").mouseover(function () {
        if (TempDataItem.F_DCQZCQS != 0 || TempDataItem.F_DCQZKDQS != 0) {
            $(".todoItem #Name2").css("display", "none");
            $(".todoItem #ProgressBar2").css("display", "none");
            $(".todoItem #Count2").css("display", "");
        }
    });

    $(".todoItemDCQZ").mouseout(function () {
        if (TempDataItem.F_DCQZCQS != 0 || TempDataItem.F_DCQZKDQS != 0) {
            $(".todoItem #Name2").css("display", "");
            $(".todoItem #ProgressBar2").css("display", "");
            $(".todoItem #Count2").css("display", "none");
        }
    });

    $(".todoItemZFHDC").mouseover(function () {
        $(".todoItem #Name6").css("display", "none");
        $(".todoItem #ProgressBar6").css("display", "none");
        $(".todoItem #Count6").css("display", "");
    });

    $(".todoItemZFHDC").mouseout(function () {
        $(".todoItem #Name6").css("display", "");
        $(".todoItem #ProgressBar6").css("display", "");
        $(".todoItem #Count6").css("display", "none");
    });

    $(".todoItemXCJC").mouseover(function () {
        if (TempDataItem.F_XCJCCQS != 0 || TempDataItem.F_XCJCKDQS != 0) {
            $(".todoItem #Name4").css("display", "none");
            $(".todoItem #ProgressBar4").css("display", "none");
            $(".todoItem #Count4").css("display", "");
        }
    });

    $(".todoItemSTJC").mouseout(function () {
        if (TempDataItem.F_XCJCCQS != 0 || TempDataItem.F_XCJCKDQS != 0) {
            $(".todoItem #STName4").css("display", "");
            $(".todoItem #STProgressBar4").css("display", "");
            $(".todoItem #STCount4").css("display", "none");
        }
    });

    $(".todoItemSTJC").mouseover(function () {
        if (TempDataItem.F_XCJCCQS != 0 || TempDataItem.F_XCJCKDQS != 0) {
            $(".todoItem #STName4").css("display", "none");
            $(".todoItem #STProgressBar4").css("display", "none");
            $(".todoItem #STCount4").css("display", "");
        }
    });

    $(".todoItemXCJC").mouseout(function () {
        if (TempDataItem.F_XCJCCQS != 0 || TempDataItem.F_XCJCKDQS != 0) {
            $(".todoItem #Name4").css("display", "");
            $(".todoItem #ProgressBar4").css("display", "");
            $(".todoItem #Count4").css("display", "none");
        }
    });

    $(" .panel-1 .data-list .list_item,.todoItem").on("mousedown", function () {
        $(this).addClass("activeClass_2");
    }).on("mouseup mouseleave", function () {
        $(this).removeClass("activeClass_2");
    })

    LoadToDoWork();

    //LoadSupervisionWork();//获取监察工作数据
})

//获取待办数据
function LoadToDoWork() {

    var parms = {
        F_UserID: top.UserItem.F_USERID
    }
    var parameter = "";
    parameter = PostGetParamterConvert(JSON.stringify(parms));

    $.ajax({
        url: top.SysWcfProxy + "/ToDoWork_Filter",
        type: "POST",
        contentType: "text/json",
        data: parameter,
        dataType: "json",
        loadingMsg: "",
        autoShowloading: isFristLoad,
        autoHideloading: true,
        success: function (returnValue) {
            isFristLoad = false;
            var returnResult = JSON.parse(top.decrypt(returnValue));
            if (returnResult.ErrorCode == 0) {
                var returnData = JSON.parse(returnResult.Result);
                if (returnData.length > 0) {
                    BindToDoWorkData(returnData[0]);
                }

                setTimeout(function () {
                    LoadToDoWork();//获取待办工作
                }, 30000);
            } else {
                alert(returnResult.ErrorMsg);
            }
        }
    });
}

//绑定待办数据
function BindToDoWorkData(mData) {

    //工作任务
    if (mData.F_GZRWDJSS > 0) {
        $(".todoItemGZRW").show();
        $("#F_GZRWDJSS").html(mData.F_GZRWDJSS);
    }

    if (mData.NOFINISHEDTASKCOUNT > 0) {
        $(".todoItemGZRW01").show();
        $("#NOFINISHEDTASKCOUNT").html(mData.NOFINISHEDTASKCOUNT);
    }

    if (mData.APPROVALNOPASSCOUNT > 0) {
        $(".todoItemGZRW1").show();
        $("#APPROVALNOPASSCOUNT").html(mData.APPROVALNOPASSCOUNT);
    }

    if (mData.TRANSFERAPPROVALCOUNT > 0) {
        $(".todoItemGZRW2").show();
        $("#TRANSFERAPPROVALCOUNT").html(mData.TRANSFERAPPROVALCOUNT);
    }

    if (mData.DEFERREDAPPROVALCOUNT > 0) {
        $(".todoItemGZRW3").show();
        $("#DEFERREDAPPROVALCOUNT").html(mData.DEFERREDAPPROVALCOUNT);
    }

    if (mData.TASKAPPROVALCOUNT > 0) {
        $(".todoItemGZRW4").show();
        $("#TASKAPPROVALCOUNT").html(mData.TASKAPPROVALCOUNT);
    }

    //现场检查
    if (mData.F_XCJCDWCS > 0) {
        $(".todoItemXCJC").show();
        $("#F_XCJCDWCS").html(mData.F_XCJCDWCS);
        TempDataItem.F_XCJCKDQS = mData.F_XCJCKDQS;
        TempDataItem.F_XCJCCQS = mData.F_XCJCCQS;
        //现场检查快到期数
        if (mData.F_XCJCKDQS > 0) {
            $("#F_XCJCKDQS").show();
            $("#F_XCJCKDQSCOUNT").html(mData.F_XCJCKDQS);
        }
        //现场检查超期数
        if (mData.F_XCJCCQS > 0) {
            $("#F_XCJCCQS").show();
            $("#F_XCJCCQSCOUNT").html(mData.F_XCJCCQS);
        }
        //进度条
        if (mData.F_XCJCKDQS != 0 || mData.F_XCJCCQS != 0) {
            var mKDQS = "", mKCQS = "";
            if (mData.F_XCJCKDQS != "") {
                mKDQS = ((mData.F_XCJCKDQS / mData.F_XCJCDWCS) * 100).toFixed(2).toString() + "%";
                $("#F_XCJCKDQSHTML").css("width", mKDQS);
            }
            if (mData.F_XCJCCQS != "") {
                mKCQS = ((mData.F_XCJCCQS / mData.F_XCJCDWCS) * 100).toFixed(2).toString() + "%";
                $("#F_XCJCCQSHTML").css("width", mKCQS);
            }

            $("#ProgressBar4").show();
        }
    }

    //现场检查
    if (mData.F_STJCDWCS > 0) {
        $(".todoItemSTJC").show();
        $("#F_STJCDWCS").html(mData.F_STJCDWCS);
        TempDataItem.F_STJCKDQS = mData.F_STJCKDQS;
        TempDataItem.F_STJCCQS = mData.F_STJCCQS;
        //现场检查快到期数
        if (mData.F_STJCKDQS > 0) {
            $("#F_STJCKDQS").show();
            $("#F_STJCKDQSCOUNT").html(mData.F_STJCKDQS);
        }
        //现场检查超期数
        if (mData.F_STJCCQS > 0) {
            $("#F_STJCCQS").show();
            $("#F_STJCCQSCOUNT").html(mData.F_STJCCQS);
        }
        //进度条
        if (mData.F_STJCKDQS != 0 || mData.F_STJCCQS != 0) {
            var mKDQS = "", mKCQS = "";
            if (mData.F_STJCKDQS != "") {
                mKDQS = ((mData.F_STJCKDQS / mData.F_STJCDWCS) * 100).toFixed(2).toString() + "%";
                $("#F_STJCKDQSHTML").css("width", mKDQS);
            }
            if (mData.F_XCJCCQS != "") {
                mKCQS = ((mData.F_STJCCQS / mData.F_STJCDWCS) * 100).toFixed(2).toString() + "%";
                $("#F_STJCCQSHTML").css("width", mKCQS);
            }

            $("#STProgressBar4").show();
        }
    }

    //调查取证
    if (mData.F_DCQZDWCS > 0) {
        $(".todoItemDCQZ").show();
        $("#F_DCQZDWCS").html(mData.F_DCQZDWCS);
        TempDataItem.F_DCQZKDQS = mData.F_DCQZKDQS;
        TempDataItem.F_DCQZCQS = mData.F_DCQZCQS;
        //现场检查快到期数
        if (mData.F_DCQZKDQS > 0) {
            $("#F_DCQZKDQS").show();
            $("#F_DCQZKDQSCOUNT").html(mData.F_DCQZKDQS);
        }

        //现场检查超期数
        if (mData.F_DCQZCQS > 0) {
            $("#F_DCQZCQS").show();
            $("#F_DCQZCQSCOUNT").html(mData.F_DCQZCQS);
        }
        //进度条
        if (mData.F_DCQZKDQS != 0 || mData.F_DCQZCQS != 0) {
            var mKDQS = "", mKCQS = "";
            if (mData.F_DCQZKDQS != "") {   //快到期
                mKDQS = ((mData.F_DCQZKDQS / mData.F_DCQZDWCS) * 100).toFixed(2).toString() + "%";
                $("#F_DCQZKDQSHTML").css("width", mKDQS);
            }
            if (mData.F_DCQZCQS != "") {   //超期
                mKCQS = ((mData.F_DCQZCQS / mData.F_DCQZDWCS) * 100).toFixed(2).toString() + "%";
                $("#F_DCQZCQSHTML").css("width", mKCQS);
            }
            $("#ProgressBar2").show();
        }
    }
    //行政处罚
    if (mData.F_XZCFDWCS > 0) {
        $(".todoItemXZCF").show();
        $("#F_XZCFDWCS").html(mData.F_XZCFDWCS);
    }

    //行政命令
    if (mData.F_XZMLDWCS > 0) {
        $(".todoItemXZML").show();
        $("#F_XZMLDWCS").html(mData.F_XZMLDWCS);
    }

    //查封扣押
    if (mData.F_CFKYDWCS > 0) {
        $(".todoItemCFKY").show();
        $("#F_CFKYDWCS").html(mData.F_CFKYDWCS);
    }

    //行政立案审批
    if (mData.F_XZLASBDWCS > 0) {
        $(".todoItemXZLASP").show();
        $("#F_XZLASBDWCS").html(mData.F_XZLASBDWCS);
    }

    //检查人员变更审核
    if (mData.F_JCRYBGDWCS > 0) {
        $(".todoItemJCRYBGSH").show();
        $("#F_JCRYBGDWCS").html(mData.F_JCRYBGDWCS);
    }

    //立案登记审批
    if (mData.F_XZLASPDWCS > 0) {
        $(".todoItemLADJSP").show();
        $("#F_XZLASPDWCS").html(mData.F_XZLASPDWCS);
    }
}

//待办刷新
function BtntodoItemRefresh_Click() {
    LoadToDoWork();
}

//****获取监察工作数据
function LoadSupervisionWork() {
    var mF_UNITLEVEL = top.UserItem.F_UNITLEVEL;

    var parms = {
        F_USERID: top.UserItem.F_USERID,
        F_UNITID: top.UserItem.F_MAINUNITID,
        F_YEAR: mydate.getFullYear()
    }
    var parameter = "";
    parameter = PostGetParamterConvert(JSON.stringify(parms));

    $.ajax({
        url: top.SysWcfProxy + "/GetSupervisionWork_Filter",
        type: "POST",
        contentType: "text/json",
        data: parameter,
        dataType: "json",
        loadingMsg: "",
        autoShowloading: true,
        autoHideloading: true,
        success: function (returnValue) {
            var returnResult = JSON.parse(top.decrypt(returnValue));
            if (returnResult.ErrorCode == 0) {
                var returnData = JSON.parse(returnResult.Result);

                if (mF_UNITLEVEL != "2") {   //非区县
                    $("#SJDBHTML").show();
                }

                if (returnData.DrData.length > 0) {
                    CreateCarAndDriverPie(returnData.DrData[0]);
                }
                ////上级督查
                //if (returnData.SJDCData.length > 0) {
                //    CreateCarAndDriverPie2(returnData.SJDCData);
                //}

            } else {
                alert(returnResult.ErrorMsg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThown) {
        }
    });
}

function CreateCarAndDriverPie(mData) {

    var myChart = echarts.init(document.getElementById('pieTJ'));
    //app.title = '环形图';
    option = {
        legend: {
            show: false,
            orient: 'vertical',
            x: '120px',
            y: 'center',
            data: ['计划总数', '进行中', '已完成'],
            textStyle: {
            },
            formatter: function (a, b, c) {
                var aa = "";
                if (a == "计划总数") {
                    return a + '：' + mData.PlanCount;
                }
                if (a == "进行中") {
                    return a + '   ：' + mData.OnLineCount;
                }
                if (a == "已完成") {
                    return a + '   ：' + mData.FinishCount;
                }
            }
        },
        color: ['#cccccc', '#f8a719', '#079435'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                //center: ['20%', '50%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'left'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: mData.PlanCount, name: '计划总数' },
                    { value: mData.OnLineCount, name: '进行中' },
                    { value: mData.FinishCount, name: '已完成' }
                ]
            }
        ]
    };
    myChart.setOption(option);    //载入图表
    $("#PlanCount").html(mData.PlanCount);
    $("#OnLineCount").html(mData.OnLineCount);
    $("#FinishCount").html(mData.FinishCount);
}


function CreateCarAndDriverPie2() {

    var myChart = echarts.init(document.getElementById('pieTJ2'));
    //app.title = '环形图';
    option = {
        legend: {
            show: false,
            orient: 'vertical',
            x: '120px',
            y: 'center',
            data: ['指派待办数', '快到期', '超期'],
            textStyle: {
            },
            formatter: function (a, b, c) {
                var aa = "";
                if (a == "指派待办数") {
                    return a + '  ：13';
                }
                if (a == "快到期") {
                    return a + '         ：4';
                }
                if (a == "超期") {
                    return a + '            ：2';
                }

            }

        },
        color: ['#cccccc', '#f8a719', '#ff0000'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                //center: ['20%', '50%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'left'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 13, name: '指派待办数' },
                    { value: 4, name: '快到期' },
                    { value: 2, name: '超期' }
                ]
            }
        ]
    };
    myChart.setOption(option);    //载入图表
}

//****代办事项  跳转到相对应的页面
function addTab_Click(F_Type, params) {
    if (F_Type == 0) {
        top.MainTab.addTab("工作任务管理", "Task/Task_Manage.aspx?type=" + params);

    } else if (F_Type == 1) {
        top.MainTab.addTab("现场检查", "Enforce/Patrol_List.aspx");
    } else if (F_Type == 2) {
        top.MainTab.addTab("调查取证", "Enforce/SpotEnforce_List.aspx");
    } else if (F_Type == 3) {
        top.MainTab.addTab("行政处罚", "Punish/GeneralInfo_List.aspx");
    } else if (F_Type == 4) {
        top.MainTab.addTab("行政命令", "Command/Command_List.aspx");
    } else if (F_Type == 5) {
        top.MainTab.addTab("查封扣押", "SealDet/SealUp_List.aspx");
    } else if (F_Type == 6) {
        top.MainTab.addTab("行政立案审批", "Punish/GeneralRegisterApproval_List.aspx");
    } else if (F_Type == 7) {
        top.MainTab.addTab("检查人员变更审核", "Sys/CheckUserChange_List.aspx");
    } else if (F_Type == 8) {
        top.MainTab.addTab("立案登记审批", "Punish/GeneralRegisterApproval_List.aspx");
    } else if (F_Type == 9) {
        top.MainTab.addTab("生态监察检查", "Ecology/Ecology_List.aspx");
    } else {
        return;
    }
}