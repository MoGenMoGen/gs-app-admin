import {until} from "./until";

const untilApi = new until();
//
// http://192.168.0.47
//线上地址：http://61.164.93.186:6181/
class api {

    test(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT2/test?id=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }
    //审核水箱清洗
    auditBoxWash(id,status){
        return new Promise((resolve, reject) => {
            untilApi.get('/gs/waterWashTask/audit?id=' + id + '&status=' + status).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }
    updWash(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/waterWashTask/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    //登录
    getSysLogin(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/general/access/appLoginGL", data).then(res => {
                resolve(res);
            });
        });
    }

    //退出
    getSysLoginOut() {
        return new Promise((resolve, reject) => {
            untilApi.get("/general/access/logout").then(res => {
                resolve(res);
            });
        });
    }

    //获取用户信息
    getUserInfo(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/sys/user/userInfo/" + data).then(res => {
                resolve(res);
            });
        });
    }

    //泵房列表
    getSysMonitorLatestPage(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/monitorLatest/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取报警列表
    getAlarmList(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/monitorAlarm/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });


    }


    //保养列表
    getMaintainTask(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/maintainTask/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //设备维修列表
    getRepairPage(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/deviceRepair/myPage?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getRepairInfo(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/deviceRepair/myInfo/" + data).then(res => {
                resolve(res)
            });
        });
    }

    //维修申请审批提交
    updRepair(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/deviceRepair/confirmUpd", data).then(res => {
                resolve(res)
            });
        });
    }

    //修改泵房
    updPump(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/pump/upd2", data).then(res => {
                resolve(res)
            });
        });

    }


    //水箱清洗
    getBoxWashList(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/waterWashTask/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }


    //水箱清洗列表
    getBoxWashList2(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/waterWashTask/pageAPump?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //水箱清洗详情
    getBoxWashDtl(id) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/waterWashTask/info/" + id).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期验收
    getAcceptList(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/early/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期表单1
    getEarly1(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyTable1/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期表单2
    getEarly2(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyTable2/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE2(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT2/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE4(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT4/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE5(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT5/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE6(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT6/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE7(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT7/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE3(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT3/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE9(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT9/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE11(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT11/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE12(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT12/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE13(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT13/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getE10(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyT10/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期表单3
    getEarly3(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyTable3/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期表单4
    getEarly4(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyTable4/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期表单5
    getEarly5(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyTable5/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期表单6
    getEarly6(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyTable6/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取前期表单7
    getEarly7(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/earlyTable7/list?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //有限空间
    getBoxSpaceList(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/confinedSpace/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }


    //设备巡检
    getDetectionList(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/detectionTask/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getCameraUrl(code) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/hk/previewURLs?code=" + code).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //视频监控
    getSysPumpCameraPage(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/pumpCamera/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //泵房工艺列表（只显示小区名字）
    getPumpTechnologyList(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/pump/page", data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getPumpPage(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/pump/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getPumpQrInfo(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/pump/qrInfo?pumpNo=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //获取设备信息
    getPumpDevicePage(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/pumpDevice/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    getMonitorPage(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/monitor/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }


    //泵房门禁列表
    getPumpDoor(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/pumpDoor/page?query=" + data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    operateDoor(id, v) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/hik/synControl?doorUuid=" + id + '&command=' + v).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //泵房工艺
    getPumpTechnology(data) {
        return new Promise((resolve, reject) => {
            untilApi.get("/gs/monitorLatest/list", data).then(res => {
                if (res.code === 200) {
                    resolve(res);
                }
            });
        });
    }

    //有限空间修改
    updConfinedSpace(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/confinedSpace/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    //提交警报确认
    updAlarm(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/monitorAlarm/upd", data).then(res => {
                resolve(res)
            });
        });
    }


    //修改early1
    updEarly1(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyTable1/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE2(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT2/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE3(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT3/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    upload(data) {
        return new Promise((resolve) => {
            untilApi.postData("/general/oss/upload", data).then(res => {
                resolve(res)
            });
        });
    }


    updE4(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT4/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE5(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT5/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE6(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT6/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE7(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT7/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE12(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT12/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE13(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT13/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE8(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT8/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE9(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT9/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE10(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT10/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    updE11(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyT11/upd", data).then(res => {
                resolve(res)
            });
        });
    }


    //修改early1
    updEarly2(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyTable2/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    //修改early1
    updEarly3(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyTable3/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    //修改early4
    updEarly4(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyTable4/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    //修改early5
    updEarly5(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyTable5/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    //修改early1
    updEarly6(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyTable6/upd", data).then(res => {
                resolve(res)
            });
        });
    }

    //修改early1
    updEarly7(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/earlyTable7/upd", data).then(res => {
                resolve(res)
            });
        });
    }


//  工单指派列表(包括工单完成，工单确认列表)
    getTaskOrder(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/order/page?query=" + data).then(res => {
                resolve(res)
            });
        });
    }

    getTaskOrder2(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/order/confirmPage?query=" + data).then(res => {
                resolve(res)
            });
        });
    }

    getMyOrderPage(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/order/myPage?query=" + data).then(res => {
                resolve(res)
            });
        });
    }

    //接单
    orderReceipt(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/order/receipt2?id=" + data).then(res => {
                resolve(res)
            });
        });
    }

    //工单详情
    getTaskInfo(id) {
        return new Promise((resolve) => {
            untilApi.get("/gs/order/info/" + id).then(res => {
                resolve(res)
            });
        });
    }

//    下拉框列表
    getDeptList(cd) {
        return new Promise((resolve) => {
            untilApi.get("/sys/cat/listByPcd?cd=" + cd).then(res => {
                resolve(res)
            });
        });
    }

    postTaskForm(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/order/add", data).then(res => {
                resolve(res)
            });
        });
    }

// 获取泵房列表
    getPumpList(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/pump/list?query=" + data).then(res => {
                resolve(res)
            });
        });
    }

    // 获取前期管理
    getEarlyList(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/early/list?query=" + data).then(res => {
                resolve(res)
            });
        });
    }


// 工单确认,get请求，/gs/order/confirm
    //type 1 初次确认，2 二次确认
    getTaskConfirm(id, type) {
        return new Promise((resolve) => {
            untilApi.get("/gs/order/confirm?id=" + id + "&type=" + type).then(res => {
                resolve(res)
            });
        });
    }

    submissionOrder(data) {
        return new Promise((resolve) => {
            untilApi.postData("/gs/order/submission2", data).then(res => {
                resolve(res)
            });
        });
    }
    //多屏曲线列表
   getMonitorLatest(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/monitorLatest/page2?query=" + data).then(res => {
                resolve(res)
            });
        });
    }
    //图表数据
    mobCurveData(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/monitorLatest/mobCurveData",data).then(res => {
                resolve(res)
            });
        });
    }
    //多屏曲线详情页tab列表
    getTab(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/monitorLatest/tabs",data).then(res => {
                resolve(res)
            });
        });
    }
    //多屏曲线详情页今日最高等数据
    mobDtl(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/monitorLatest/mobDtl",data).then(res => {
                resolve(res)
            });
        });
    }
    //详情页曲线数据
    dtlDayYearData(data) {
        return new Promise((resolve) => {
            untilApi.get("/gs/monitorLatest/dtlDayYearData",data).then(res => {
                resolve(res)
            });
        });
    }
}

export {api};
