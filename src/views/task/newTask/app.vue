<template>
    <!--    新建工单-->
    <div>
        <van-sticky>
            <my-header title="新建工单" @back="back" :search-status="false"></my-header>
        </van-sticky>
        <div class="content">
            <div class="item1">
                <p class="label"><span>*</span>工单来源</p>
                <div class="option-menu">
                    <el-select v-model="form.orderSource" placeholder="请选择">
                        <el-option  v-for="item in sourceList"  :key="item.id"  :label="item.nm"  :value="item.nm"> </el-option>
                    </el-select>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span>*</span>行政区域</p>
                <div class="option-menu">
                    <el-select v-model="form.administrativeDivision" placeholder="请选择" @change="searchPump">
                        <el-option  v-for="item in regionList" :key="item.id" :label="item.nm" :value="item.nm"> </el-option>
                    </el-select>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span>*</span>泵房名称</p>
                <div class="option-menu">

<!--                    <el-select v-model="pump" filterable placeholder="请选择" @change="setPump" value-key="id">-->
<!--                        <el-option   v-for="item in pumpList" :key="item.id"  :label="item.nm"  :value="item">  </el-option>-->
<!--                    </el-select>-->

                    <mob-select3 text="nm" :list="pumpList"
                                v-model="pump" @change="setPump"
                                place="泵房名称选择" :disable-input="disableinput"
                    ></mob-select3>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span></span>发生地址</p>
                <div class="option-menu">
                    <input placeholder="请输入发生地址" v-model="form.occurrenceAddress"/>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span></span>反应人</p>
                <div class="option-menu">
                    <input placeholder="请输入反应人" v-model="form.reflecting"/>
                </div>
            </div>
            <div class="item1">
                <p class="label"><span>*</span>联系电话</p>
                <div class="option-menu">
                    <input placeholder="请输入联系电话" v-model="form.reflectingPhone"/>
                </div>
            </div>
            <div class="item1">
                <p class="label"><span>*</span>问题类别</p>
                <div class="option-menu">
                    <el-select v-model="form.fault" placeholder="请选择">
                        <el-option
                                v-for="item in faultList"
                                :key="item.id"
                                :label="item.nm"
                                :value="item.nm">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="item1">
                <p class="label"><span>*</span>问题详情</p>
                <div class="option-menu">
                    <label>
                        <input placeholder="请输入问题详情" v-model="form.problem"/>
                    </label>
                </div>
            </div>

<!--            <div class="item1">-->
<!--                <p class="label"><span></span>派遣时间</p>-->
<!--                <div class="option-menu">-->
<!--                    <el-date-picker  style="width: 100%" v-model="form.dispatchTime"   type="date" value-format="yyyy-MM-dd"-->
<!--                                     placeholder="派遣时间">-->
<!--                    </el-date-picker>-->
<!--                </div>-->
<!--            </div>-->
            <div class="item2">
                <p class="label"><span>*</span>派单部门</p>
                <div class="option-menu">
                    <el-select v-model="form.dispatchDepartment" placeholder="请选择">
                        <el-option  v-for="item in paidanList"   :key="item.id" :label="item.nm"   :value="item.nm">   </el-option>
                    </el-select>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span>*</span>派单人</p>
                <div class="option-menu">
                    <label>
                        <input placeholder="请输入派单人" v-model="form.sendUser" readonly/>
                    </label>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span>*</span>接单单位</p>
                <div class="option-menu">
                    <el-select v-model="form.receivingId" placeholder="请选择">
                        <el-option  v-for="item in deptList" :key="item.id" :label="item.nm" :value="item.id"></el-option>
                    </el-select>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span>*</span>处理时限</p>
                <div class="option-menu">
                    <el-select v-model="form.processingDeadline" placeholder="请选择">
                        <el-option  v-for="item in cList" :key="item.id" :label="item.nm" :value="item.nm"></el-option>
                    </el-select>

                </div>
            </div>


            <div class="item1">
                <p class="label"><span>*</span>工单时间</p>
                <div class="option-menu">
                    <el-select v-model="form.orderDate" placeholder="请选择">
                        <el-option  key="工作日" label="工作日" value="工作日"></el-option>
                        <el-option  key="双休日" label="双休日" value="双休日"></el-option>
                    </el-select>
                </div>
            </div>

            <div class="item1">
                <p class="label"><span>*</span>工单时段</p>
                <div class="option-menu">
                    <el-select v-model="form.orderSlot" placeholder="请选择">
                        <el-option  key="08:30-16:30" label="08:30-16:30" value="08:30-16:30"></el-option>
                        <el-option  key="16:30-20:00" label="16:30-20:00" value="16:30-20:00"></el-option>
                        <el-option  key="20:00-08:30" label="20:00-08:30" value="20:00-08:30"></el-option>
                    </el-select>
                </div>
            </div>



            <div class="item1">
                <p class="label"><span>*</span>接单备注</p>
                <div class="option-menu">
                    <label>
                        <input placeholder="请输入接单备注" v-model="form.remarks"/>
                    </label>
                </div>
            </div>

            <div class="div-button">
                <button @click="submitForm">提交</button>
                <button @click="resetForm">重置</button>
            </div>
        </div>
        <div class="bottom-place"> </div>
        <van-popup v-model="showDate" position="bottom" :style="{ height: '30%',width:'100%' }">
            <van-datetime-picker v-if="showDate"
                                 v-model="form.crtTm"
                                 type="datetime"
                                 :min-date="minDate"
                                 :max-date="maxDate"
                                 :formatter="formatter"
                                 @confirm="closePop"
                                 @cancel="closePop"
                                 @change="changeDate">
            </van-datetime-picker>

        </van-popup>



    </div>
</template>

<script>
    import myHeader from "../../../components/myHeader/myHeader";
    import {Toast} from 'vant';
    import mobSelect3 from "../../../components/mobSelect3";
    export default {
        name: "newTask",
        components: {
            myHeader,
            mobSelect3,
        },
        data() {
            return {
                pump:'',
                disableinput:false,
                form: {
                    orderSource: '',//工单来源
                    receivingId: '',//接单单位
                    orderDate: '',//接单单位
                    dispatchDepartment: '',//派单部门
                    processingDeadline: '',//处理时限
                    occurrenceAddress: '',
                    dispatchTime: '',
                    orderSlot: '',
                    sendUser: '',
                    dispatchPin: '',
                    reflecting: '',//反映人
                    reflectingPhone: '',//联系电话
                    fault: '',//问题类别
                    administrativeDivision: '',//行政区域
                    pump: '',//泵房名称
                    pumpNo:'',
                    problem: '',//问题详情
                    remarks: '',//接单备注
                    crtTm: '',//派单时间
                    status: 0,
                },
                title: '新建工单',
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                showDate: false,
                showPump:false,
                deptList: [],//接单单位
                sourceList: [],//接单来源
                paidanList: [],//派单部门
                faultList: [],//故障分类
                regionList: [],//行政区域
                pumpList: [],//泵房名称列表
                cList: [],//泵房名称列表
            }
        },
        mounted() {
            this.getDept();
            this.getSourceList();
            this.getPaidanList();
            this.getFaultList();
            this.getRegionList();
        },
        methods: {
            setPump(item){
                this.form.occurrenceAddress = item.pumpLocation;
                this.form.pump = item.nm;
                this.form.pumpNo = item.no;
            },

            //重置工单
            resetForm() {
                this.form = {
                    orderSource: '',//工单来源
                    receivingId: '',//接单单位
                    dispatchDepartment: '',//派单部门
                    processingDeadline: '',//处理时限
                    reflecting: '',//反映人
                    reflectingPhone: '',//联系电话
                    fault: '',//问题类别
                    administrativeDivision: '',//行政区域
                    pump: '',//泵房名称
                    problem: '',//问题详情
                    remarks: '',//接单备注
                    status: 0,
                }
            },
            //提交新建工单
            submitForm() {
                this.form.crtTm = this.until.dateFormat(this.form.crtTm)
                if (!this.form.processingDeadline  || !this.form.reflectingPhone
                    || !this.form.problem || !this.form.remarks || !this.form.receivingId || !this.form.pump) {
                    Toast.fail('*号是必填字段');
                    return
                }

                this.api.postTaskForm(JSON.stringify(this.form)).then(res => {
                    Toast.success('提交成功');
                    this.until.back();
                });
            },
            //接单单位
            getDept() {
                this.api.getDeptList(3000).then(res => {
                    this.deptList = res.data.list;
                    this.api.getDeptList(3100).then(res => {
                        for (let i = 0; i < res.data.list.length; i++) {
                            this.deptList.push(res.data.list[i])
                        }
                    })
                })
                this.form.sendUser =  JSON.parse(this.until.loGet('userInfo')).nickname;
            },
            //工单来源
            getSourceList() {
                this.api.getDeptList(101).then(res => {
                    this.sourceList = res.data.list


                })
            },
            //派单列表
            getPaidanList() {
                this.api.getDeptList(6000).then(res => {
                    this.paidanList = res.data.list
                });

                this.api.getDeptList(112).then(res => {
                    this.cList = res.data.list
                })
            },
            //故障分类
            getFaultList() {
                this.api.getDeptList(4000).then(res => {
                    this.faultList = res.data.list
                })
            },

            //故障分类
            getRegionList() {
                this.api.getDeptList(100).then(res => {
                    this.regionList = res.data.list
                })
            },

            //泵房名称列表
            getPumpList() {
                let qry = this.query.new();
                this.query.toW(qry, "region", this.form.administrativeDivision, "EQ");
                this.api.getPumpList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    this.pumpList = res.data.list;
                    //查询前期管理 增加到选择项中
                    this.api.getEarlyList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                        //查询前期管理 增加到选择项中
                        if (res.data.list.length !== 0){
                            for (let i = 0; i < res.data.list.length ; i++) {
                                let name=res.data.list[i].pumpNm
                                if(name.length>10){
                                   name =  name.substring(0,10)
                                }
                                let pump = {
                                    id: res.data.list[i].id,
                                    no: res.data.list[i].pumpNo,
                                    nm: name,
                                };
                                this.pumpList.push(pump)
                            }
                        }
                    })
                })
            },
            searchPump() {
                this.getPumpList()
            },
            changeDate() {


            },
            closePop() {
                this.showDate = false
            },
            showDatePop() {
                this.showDate = true
            },
            back() {
                this.until.back()
            },
            formatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`
                } else if (type === 'day') {
                    return `${val}日`
                } else if (type === 'hour') {
                    return `${val}时`
                } else if (type === 'minute') {
                    return `${val}分`
                }
                return val;
            },
        }

    }
</script>

<style scoped lang="less">
    //引入外部css文件

    .content {

        padding-top: 10px;
    }

    .item1 {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom: 1px solid #DAD7DB;
        font-size: 14px;
        height: 50px;

        .label {
            white-space: nowrap;
            width: 60px;
            margin-right: 20px;

            span {
                display: inline-block;
                width: 10px;
                color: #FF3000;
            }
        }

        .option-menu {
            flex: 1;

            input {
                width: 100%;
                border: none;
                outline: none;
                color: #999999;

            }

            /*place holder颜色*/

            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
                color: #999999;;

            }

        }
    }

    /*时间选择*/
    .item2 {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom: 1px solid #DAD7DB;
        font-size: 14px;
        height: 50px;

        .label {
            white-space: nowrap;
            width: 60px;
            margin-right: 20px;

            span {
                display: inline-block;
                width: 10px;
                color: #FF3000;
            }
        }

        .option-menu {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-between;
            flex: 1;

            .p-date {
                color: #999999;
            }

            img {
                width: 18px;
                height: 18px;
            }
        }
    }

    .div-button {

        padding-top: 25px;

        width: 100%;
        display: flex;
        display: -webkit-flex;

        button:nth-of-type(1) {
            background: #106FB8;
            color: white;
            border: none;
            flex: 1;
            border-radius: 5px;
            margin-left: 20px;
            margin-right: 10px;
            height: 40px;
        }

        button:nth-of-type(2) {
            background: white;
            color: #999999;
            border: 1px solid #DEDEDE;
            border-radius: 5px;
            flex: 1;
            margin-right: 20px;
            margin-left: 10px;
            height: 40px;
        }
    }

    .bottom-place {
        width: 100%;
        height: 25px;
    }
</style>
<style>
    .el-select {
        width: 100%;

    }

    .el-input__inner {
        border: none;
        padding: 0;
        color: #999999;

    }

</style>
