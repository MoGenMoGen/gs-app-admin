<template>
    <div id="container">
        <van-sticky>
            <my-header title="成套设备,水箱验收表" @back="back" :search-status="false"></my-header>
        </van-sticky>
        <van-form>
            <van-field v-model="info.pumpNm" label="泵房名称：" label-width="80" readonly></van-field>
<!--            <van-field v-model="info.estateNm" label="小区名称：" label-width="80" readonly></van-field>-->
            <van-field v-model="info.recordNm" label="备案名：" label-width="80" readonly></van-field>
            <van-field v-model="info.deviceUnit" label="设备厂家：" label-width="80" readonly></van-field>
            <van-field name="radio" label="设备：" label-width="50">
                <slot slot="input">
                    <van-radio-group v-model="info.deviceNm" direction="horizontal">
                        <van-radio name="无负压" shape="square">无负压</van-radio>
                        <van-radio name="水箱+变频" shape="square">水箱+变频</van-radio>
                        <van-radio name="箱式无负压" shape="square">箱式无负压</van-radio>
                        <van-radio name="工频" shape="square">工频</van-radio>
                        <van-button  type="primary" size="mini" @click="info.deviceNm = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="stepper" label="设备套数">
                <slot slot="input">
                    <van-stepper v-model="info.deviceNum"></van-stepper>
                </slot>
            </van-field>
            <van-field name="radio" label="水箱：" label-width="50">
                <slot slot="input">
                    <van-radio-group v-model="info.sx" direction="horizontal">
                        <van-radio name="有" shape="square">有</van-radio>
                        <van-radio name="无" shape="square">无</van-radio>
                        <van-button  type="primary" size="mini" @click="info.sx = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="stepper" label="水箱个数">
                <slot slot="input">
                    <van-stepper v-model="info.sxNum" :default-value="0" :min="0"></van-stepper>
                </slot>
            </van-field>
            <van-field v-model="info.volume" label="水箱容积："  label-width="80"  placeholder="请输入水箱容积" clearable></van-field>
            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>（一）、设备基本性能、外观及配置要求</van-cell>
            <van-cell>
                <span class="span">
                   1.设备应具有过压、欠压、缺相、短路、过载、过热等故障报警及自动保护功能，应能在停电后复电时自动启动，对可恢复的故障应能自动或手动消除，恢复正常运行
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val1,'设备应具有过压、欠压、缺相、短路、过载、过热等故障报警及自动保护功能，应能在停电后复电时自动启动，对可恢复的故障应能自动或手动消除，恢复正常运行')">
                <slot slot="input">
                    <van-radio-group v-model="info.val1" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val1 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   2.成套设备应具备防雷、安全接地及过电压保护措施，需具备电源保护、网络保护和信号保护
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val2,'成套设备应具备防雷、安全接地及过电压保护措施，需具备电源保护、网络保护和信号保护')">
                <slot slot="input">
                    <van-radio-group v-model="info.val2" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val2 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   3.电气控制柜应采取防尘、防水、防潮等安全措施，柜体安装强制通风风扇，做到有效通风、合理布置
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val3,'电气控制柜应采取防尘、防水、防潮等安全措施，柜体安装强制通风风扇，做到有效通风、合理布置')">
                <slot slot="input">
                    <van-radio-group v-model="info.val3" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val3 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   4.电气控制柜总电源进线处装设带通讯接口的智能电表装置系统一套，由PLC读取其采集的电压、电流、有功功率、无功功率、功率因数、电能等数据（2020年前为电度计量装置）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val4,'电气控制柜总电源进线处装设带通讯接口的智能电表装置系统一套，由PLC读取其采集的电压、电流、有功功率、无功功率、功率因数、电能等数据（2020年前为电度计量装置）')">
                <slot slot="input">
                    <van-radio-group v-model="info.val4" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val4 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   5.电气控制柜结构为前面开门，后面板可拆卸，前后有密封材料。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val5,'电气控制柜结构为前面开门，后面板可拆卸，前后有密封材料。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val5" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val5 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   6.电气控制柜制作钢板采用国产优质（A3及以上等级）冷扎板，板厚不低于2mm。柜体外壳防护等级不低于IP54。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val6,'电气控制柜制作钢板采用国产优质（A3及以上等级）冷扎板，板厚不低于2mm。柜体外壳防护等级不低于IP54。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val6" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val6 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   7.电气控制柜内所有的导线、电缆都应采用不可移动的箍套或用清洁的热收缩套管作标签固定在接结端子排前实现，不得使用吊牌作标签
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val7,'电气控制柜内所有的导线、电缆都应采用不可移动的箍套或用清洁的热收缩套管作标签固定在接结端子排前实现，不得使用吊牌作标签')">
                <slot slot="input">
                    <van-radio-group v-model="info.val7" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val7 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   8.电气控制柜面板应有电源、电流、电压、电量、水泵启停状况、频率、故障声光报警等显示功能
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val8,'电气控制柜面板应有电源、电流、电压、电量、水泵启停状况、频率、故障声光报警等显示功能')">
                <slot slot="input">
                    <van-radio-group v-model="info.val8" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val8 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   9.控制柜前设置3mm厚度的绝缘胶垫，尺寸与控制柜匹配
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val9,'控制柜前设置3mm厚度的绝缘胶垫，尺寸与控制柜匹配')">
                <slot slot="input">
                    <van-radio-group v-model="info.val9" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val9 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   10.变频器和水泵必须一对一配备。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val10,'变频器和水泵必须一对一配备')">
                <slot slot="input">
                    <van-radio-group v-model="info.val10" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val10 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>



            <van-cell>
                <span class="span">
                   11.变频器
                </span>
            </van-cell>
            <van-field>
                <slot slot="input">
                    <van-radio-group v-model="info.val11" direction="horizontal">
                        <van-radio name="ABB" shape="square">ABB</van-radio>
                        <van-radio name="施耐德" shape="square">施耐德</van-radio>
                        <van-radio name="西门子" shape="square">西门子</van-radio>
                        <van-radio name="三垦" shape="square">三垦</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val11 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val12,'变频器')">
                <slot slot="input">
                    <van-radio-group v-model="info.val12" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val12 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   12.PLC
                </span>
            </van-cell>
            <van-field>
                <slot slot="input">
                    <van-radio-group v-model="info.val13" direction="horizontal">
                        <van-radio name="AB CompactLogix L24ER" shape="square">AB CompactLogix L24ER</van-radio>
                        <van-radio name="西门子S7 1512C" shape="square">西门子S7 1512C</van-radio>
                        <van-radio name="施耐德Modicon M340" shape="square">施耐德Modicon M340</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val13 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val14,'PLC')">
                <slot slot="input">
                    <van-radio-group v-model="info.val14" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val14 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   13.64K色触摸屏
                </span>
            </van-cell>
            <van-field>
                <slot slot="input">
                    <van-radio-group v-model="info.val15" direction="horizontal">
                        <van-radio name="AB 2711R-T10T" shape="square">AB 2711R-T10T</van-radio>
                        <van-radio name="西门子KTP1200" shape="square">西门子KTP1200</van-radio>
                        <van-radio name="施耐德GTO5310" shape="square">施耐德GTO5310</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val15 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val86,'64K色触摸屏')">
                <slot slot="input">
                    <van-radio-group v-model="info.val86" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val86 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>



            <van-cell>
                <span class="span">
                   14.控制柜其主开关、断路器、浪涌保护器（防雷器）、接触器、继电器、按钮、指示灯
                </span>
            </van-cell>
            <van-field>
                <slot slot="input">
                    <van-radio-group v-model="info.val16" direction="horizontal">
                        <van-radio name="西门子" shape="square">西门子</van-radio>
                        <van-radio name="施耐德" shape="square">施耐德</van-radio>
                        <van-radio name="ABB" shape="square">ABB</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val16 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val17,'控制柜其主开关、断路器、浪涌保护器（防雷器）、接触器、继电器、按钮、指示灯')">
                <slot slot="input">
                    <van-radio-group v-model="info.val17" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val17 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   15.智能电表(2020年第一批起)
                </span>
            </van-cell>
            <van-field>
                <slot slot="input">
                    <van-radio-group v-model="info.val18" direction="horizontal">
                        <van-radio name="施耐德PM5110" shape="square">施耐德PM5110</van-radio>
                        <van-radio name="西门子PAC4200" shape="square">西门子PAC4200</van-radio>
                        <van-radio name="溯高美Q800" shape="square">溯高美Q800</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val18 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val19,'智能电表(2020年第一批起)')">
                <slot slot="input">
                    <van-radio-group v-model="info.val19" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-radio name="无配置要求" shape="square">无配置要求</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val19 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   16.电缆
                </span>
            </van-cell>
            <van-field>
                <slot slot="input">
                    <van-radio-group v-model="info.val20" direction="horizontal">
                        <van-radio name="东方" shape="square">东方</van-radio>
                        <van-radio name="球冠" shape="square">球冠</van-radio>
                        <van-radio name="中策" shape="square">中策</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val20 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val21,'电缆')">
                <slot slot="input">
                    <van-radio-group v-model="info.val21" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val21 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>（二）、控制要求</van-cell>
            <van-cell>
                <span class="span">
                   1.自动运行能实现以下功能：缺压自动开机、自动恒压、小流量保压、超压自动停机、无水自动停机、机泵定时自动轮换、自动节能停机、过流过压过载自动保护
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val22,'自动运行能实现以下功能：缺压自动开机、自动恒压、小流量保压、超压自动停机、无水自动停机、机泵定时自动轮换、自动节能停机、过流过压过载自动保护')">
                <slot slot="input">
                    <van-radio-group v-model="info.val22" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val22 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   2.手动运行方式能不通过PLC也应具有自动恒压功能。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val23,'手动运行方式能不通过PLC也应具有自动恒压功能。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val23" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val23 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   3.手动变频控制应脱离PLC单独设置。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val24,'手动变频控制应脱离PLC单独设置。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val24" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val24 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   4.在控制柜上除能操作水泵启停外，还应能控制电动阀启闭。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val25,'在控制柜上除能操作水泵启停外，还应能控制电动阀启闭。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val25" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val25 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   5.调度中心控制级则在计算机上能启用停用成套设备，启闭水箱进水电动阀，其余操作一概不允许。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val88,'调度中心控制级则在计算机上能启用停用成套设备，启闭水箱进水电动阀，其余操作一概不允许。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val88" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val88 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   6.现场 PLC 可独立完成监控任务，使现场工作流程仍能正常运行
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val26,'现场 PLC 可独立完成监控任务，使现场工作流程仍能正常运行')">
                <slot slot="input">
                    <van-radio-group v-model="info.val26" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val26 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  7.PLC至少富余4个DI，4个DO，2个AI，2个AO。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val27,'PLC至少富余4个DI，4个DO，2个AI，2个AO。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val27" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val27 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  8.监控软件应能生成现场工艺流程图，反映生产运行实时数据，可以在线修改现场各类控制参数，并对设备进行启停及电动阀进行开关，应能完成历史数据、趋势曲线的存储、显示与查询。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val28,'监控软件应能生成现场工艺流程图，反映生产运行实时数据，可以在线修改现场各类控制参数，并对设备进行启停及电动阀进行开关，应能完成历史数据、趋势曲线的存储、显示与查询。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val28" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val28 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  9.控制设备、修改参数、上下载触摸屏软件必须要输入密码，密码不能低于6位，且由字母、数字、符合组成
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val29,'控制设备、修改参数、上下载触摸屏软件必须要输入密码，密码不能低于6位，且由字母、数字、符合组成')">
                <slot slot="input">
                    <van-radio-group v-model="info.val29" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val29 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>（三）、远程数据传输要求</van-cell>

            <van-cell>
                <span class="span">
                  1.设备监控传输通道按照水司要求的通讯规约Modbus RTU（深圳宏电支持4G的CDMA 模块，内含SIM 卡）、Modbus TCP(网线接到VPN设备）上传到二次供水调度中心。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val30,'设备监控传输通道按照水司要求的通讯规约Modbus RTU（深圳宏电支持4G的CDMA 模块，内含SIM 卡）、Modbus TCP(网线接到VPN设备）上传到二次供水调度中心。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val30" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val30 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  2.水泵上传数据：水泵的开启情况，单机水泵的电流、转速、功率、频率、运行时间、启动次数、启停时间点、故障次数。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val31,'水泵上传数据：水泵的开启情况，单机水泵的电流、转速、功率、频率、运行时间、启动次数、启停时间点、故障次数。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val31" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val31 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  3.变频器上传数据：变频器的进出电流、电压、运行频率和温度。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val32,'变频器上传数据：变频器的进出电流、电压、运行频率和温度。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val32" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val32 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  4.水压及流量：泵房主管道的进出口压力、设定压力和水泵出口压力，瞬时流量、当天总水量、总累积流量（要求装流量计以后实现此功能）。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val33,'水压及流量：泵房主管道的进出口压力、设定压力和水泵出口压力，瞬时流量、当天总水量、总累积流量（要求装流量计以后实现此功能）。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val33" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val33 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  5.报警信息：报警内容包括进水压力高/低、出水压力高/低、出水流量异常、设备掉电、水泵电流异常、变频器故障、PLC 故障、进线电流/电压异常等。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val34,'报警信息：报警内容包括进水压力高/低、出水压力高/低、出水流量异常、设备掉电、水泵电流异常、变频器故障、PLC 故障、进线电流/电压异常等。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val34" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val34 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  6.泵房现场必须保存半年以上的运行数据（数据存储频率不低于5分钟一次）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val35,'泵房现场必须保存半年以上的运行数据（数据存储频率不低于5分钟一次）')">
                <slot slot="input">
                    <van-radio-group v-model="info.val35" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val35 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  7.必须关闭PLC、触摸屏的Http和SNMP功能，并且在以太网通讯模式下，PLC系统能指定1-2个IP主站与之进行ModbusTCP通讯，并拒绝其它IP与之通讯。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val36,'必须关闭PLC、触摸屏的Http和SNMP功能，并且在以太网通讯模式下，PLC系统能指定1-2个IP主站与之进行ModbusTCP通讯，并拒绝其它IP与之通讯。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val36" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val36 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  8.必须关闭以太网上下载PLC软件的功能，并且必须要输入密码，密码不能低于6位，且由字母、数字、符号组成。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val37,'必须关闭以太网上下载PLC软件的功能，并且必须要输入密码，密码不能低于6位，且由字母、数字、符号组成。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val37" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val37 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  9.设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val38,'设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心')">
                <slot slot="input">
                    <van-radio-group v-model="info.val38" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val38 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  10.每套设备均具备无水停机保护功能
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val38,'设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心')">
                <slot slot="input">
                    <van-radio-group v-model="info.val89" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val89 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  11.每套设备均具备出水超压停机保护功能
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val38,'设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心')">
                <slot slot="input">
                    <van-radio-group v-model="info.val90" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val90 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  12.每套设备均具备变频器报警功能
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val38,'设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心')">
                <slot slot="input">
                    <van-radio-group v-model="info.val91" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val91 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  13.每套设备在停电后，均具备自动恢复供水功能
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val38,'设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心')">
                <slot slot="input">
                    <van-radio-group v-model="info.val92" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val92 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  14.每套设备均具备手动恒压供水功能
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val38,'设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心')">
                <slot slot="input">
                    <van-radio-group v-model="info.val93" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val93 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  15.控制柜移动触屏上能查询半年内的各类运行数据
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val38,'设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心')">
                <slot slot="input">
                    <van-radio-group v-model="info.val94" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val94 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>



            <van-cell>
                <span class="span">
                  16.移交资料：已按《二次供水泵房移交资料清单》提交。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val39,'移交资料：已按《二次供水泵房移交资料清单》提交。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val39" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val39 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <div v-if="this.info.sx === '有'">
            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>水    箱</van-cell>
            <van-field v-model="info.val40" label="水箱1尺寸："  label-width="80"  placeholder="请输入水箱1尺寸" clearable></van-field>
            <van-field v-model="info.val41" label="水箱1容积："  label-width="80"  placeholder="请输入水箱1容积" clearable></van-field>
            <van-field v-model="info.val42" label="水箱1数量："  label-width="80"  placeholder="水箱1数量" clearable></van-field>
            <van-field name="radio" label="水箱1：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val43" direction="horizontal">
                        <van-radio name="独立" shape="square">独立</van-radio>
                        <van-radio name="内分割" shape="square">内分割</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val43 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val44" label="水箱2尺寸："  label-width="80"  placeholder="请输入水箱2尺寸" clearable></van-field>
            <van-field v-model="info.val45" label="水箱2容积："  label-width="80"  placeholder="请输入水箱2容积" clearable></van-field>
            <van-field v-model="info.val46" label="水箱2数量："  label-width="80"  placeholder="水箱2数量" clearable></van-field>
            <van-field name="radio" label="水箱2：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val47" direction="horizontal">
                        <van-radio name="独立" shape="square">独立</van-radio>
                        <van-radio name="内分割" shape="square">内分割</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val47 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val48" label="水箱3尺寸："  label-width="80"  placeholder="请输入水箱3尺寸" clearable></van-field>
            <van-field v-model="info.val49" label="水箱3容积："  label-width="80"  placeholder="请输入水箱3容积" clearable></van-field>
            <van-field v-model="info.val50" label="水箱3数量："  label-width="80"  placeholder="水箱3数量" clearable></van-field>
            <van-field name="radio" label="水箱3：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val51" direction="horizontal">
                        <van-radio name="独立" shape="square">独立</van-radio>
                        <van-radio name="内分割" shape="square">内分割</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val51 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field name="radio" label="水箱品牌：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val52" direction="horizontal">
                        <van-radio name="上海绿潮" shape="square">上海绿潮</van-radio>
                        <van-radio name="上海通华" shape="square">上海通华</van-radio>
                        <van-radio name="上虞百联" shape="square">上虞百联</van-radio>
                        <van-radio name="浙江科诚" shape="square">浙江科诚</van-radio>
                        <van-radio name="上虞富友" shape="square">上虞富友</van-radio>
                        <van-radio name="浙江杭特" shape="square">浙江杭特</van-radio>
                        <van-radio name="上海熊猫" shape="square">上海熊猫</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val52 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="水箱品牌结论：" label-width="120" @click="off(info.val53,'水箱品牌结论')">
                <slot slot="input">
                    <van-radio-group v-model="info.val53" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-radio name="无入围品牌要求" shape="square">无入围品牌要求</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val53 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  2.水箱有标牌标志，其内容应有：产品名称及型号、商标、制造厂家及厂址、制造日期、生产批号、涉水产品许可证、执行标准号。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val54,'水箱有标牌标志，其内容应有：产品名称及型号、商标、制造厂家及厂址、制造日期、生产批号、涉水产品许可证、执行标准号。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val54" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val54 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  3.水箱、内外人梯、支撑件、配件及其焊接材料应选用不低于06Cr19Ni10的不锈钢材料制作而成，不锈钢焊缝应进行酸洗钝化等抗氧化处理。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val55,'水箱、内外人梯、支撑件、配件及其焊接材料应选用不低于06Cr19Ni10的不锈钢材料制作而成，不锈钢焊缝应进行酸洗钝化等抗氧化处理。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val55" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val55 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val56" label="侧壁1厚："  label-width="80"  placeholder="请输入侧壁1厚" clearable></van-field>
            <van-field v-model="info.val57" label="侧壁2厚："  label-width="80"  placeholder="请输入侧壁2厚" clearable></van-field>
            <van-field v-model="info.val58" label="侧壁3厚："  label-width="80"  placeholder="请输入侧壁3厚" clearable></van-field>
            <van-field v-model="info.val59" label="水箱顶厚："  label-width="80"  placeholder="请输入水箱顶厚" clearable></van-field>
            <van-field v-model="info.val60" label="底壁厚："  label-width="80"  placeholder="请输入底壁厚" clearable></van-field>
            <van-field v-model="info.val61" label="其他："  label-width="80"  placeholder="请输入其他" clearable></van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val62" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val62 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  5.水箱有人孔，大小符合要求，有带锁的食品级不锈钢密封盖，已上锁。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val63,'水箱有人孔，大小符合要求，有带锁的食品级不锈钢密封盖，已上锁。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val63" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val63 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  6.水箱人孔上方无管道穿过，顶板面与建筑板底的净空不小于0.8m。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val64,'水箱人孔上方无管道穿过，顶板面与建筑板底的净空不小于0.8m。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val64" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val64 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  7.内外人梯边框采用壁厚2mm、长*宽为30 mm*30 mm的06Cr19Ni10不锈钢方管，横向间距0.5m；梯步采用厚度2mm ，直径32mm的06Cr19Ni10不锈钢圆钢，纵向间距0.4m，人梯底部距离地面不应大于0.2m，安装高度应超过水箱高度0.4m，顶部采用环形圆钢制作并与水箱顶板紧密焊接。人梯安装应牢固可靠，应能承载100千克（含）以上负荷（2020年第一批开始执行）。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val65,'内外人梯边框采用壁厚2mm、长*宽为30 mm*30 mm的06Cr19Ni10不锈钢方管，横向间距0.5m；梯步采用厚度2mm ，直径32mm的06Cr19Ni10不锈钢圆钢，纵向间距0.4m，人梯底部距离地面不应大于0.2m，安装高度应超过水箱高度0.4m，顶部采用环形圆钢制作并与水箱顶板紧密焊接。人梯安装应牢固可靠，应能承载100千克（含）以上负荷（2020年第一批开始执行）。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val65" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val65 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  8.溢流管、透气管应安装微孔过滤器，溢流管、泄水管不得与排水系统直接连接
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val66,'溢流管、透气管应安装微孔过滤器，溢流管、泄水管不得与排水系统直接连接')">
                <slot slot="input">
                    <van-radio-group v-model="info.val66" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val66 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  9.泄水管必须设在水箱底部，直径宜不小于DN100。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val67,'泄水管必须设在水箱底部，直径宜不小于DN100。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val67" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val67 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  10.低位水箱进水管应安装具有机械和电气双重控制功能的电动蝶阀，由液位控制仪实现自动控制；泵房内只有1个水箱时，应安装两套水力控制浮球阀；有多个水箱并联时，每个水箱可安装一套水力控制浮球阀；且进水管标高应一致。电动蝶阀和水力控制浮球阀前应安装检修闸阀。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val68,'低位水箱进水管应安装具有机械和电气双重控制功能的电动蝶阀，由液位控制仪实现自动控制；泵房内只有1个水箱时，应安装两套水力控制浮球阀；有多个水箱并联时，每个水箱可安装一套水力控制浮球阀；且进水管标高应一致。电动蝶阀和水力控制浮球阀前应安装检修闸阀。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val68" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val68 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  11.低位水箱供水应实现：当水位达到低水位时应自动报警，达到超低水位时应自动停泵；达到高水位时应自动关闭浮球阀，达到超高水位时应自动关闭进水电动阀并报警。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val69,'低位水箱供水应实现：当水位达到低水位时应自动报警，达到超低水位时应自动停泵；达到高水位时应自动关闭浮球阀，达到超高水位时应自动关闭进水电动阀并报警。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val69" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val69 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  12.高位水箱应安装灵敏有效的液位控制仪，多个水箱供水时还应安装水力控制浮球阀，当采用浮球阀时不应少于两个，且进水管标高应一致
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val70,'高位水箱应安装灵敏有效的液位控制仪，多个水箱供水时还应安装水力控制浮球阀，当采用浮球阀时不应少于两个，且进水管标高应一致')">
                <slot slot="input">
                    <van-radio-group v-model="info.val70" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val70 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  13.高位水箱供水应实现：当水位达到高水位时应自动停泵，达到超高水位时应自动报警；达到低水位时应自动启动水泵，达到超低水位时应自动报警。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val71,'高位水箱供水应实现：当水位达到高水位时应自动停泵，达到超高水位时应自动报警；达到低水位时应自动启动水泵，达到超低水位时应自动报警。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val71" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val71 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  14.水箱顶部进水，底部出水，进水管与出水管应采取相对方向设置，设导流装置
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val72,'水箱顶部进水，底部出水，进水管与出水管应采取相对方向设置，设导流装置')">
                <slot slot="input">
                    <van-radio-group v-model="info.val72" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val72 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  15.水箱进水管与出水管安装阀门。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val73,'水箱进水管与出水管安装阀门。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val73" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val73 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>



            <van-cell>
                <span class="span">
                  16.电动头品牌
                </span>
            </van-cell>
            <van-field name="radio" label="品牌：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val74" direction="horizontal">
                        <van-radio name="罗托克ROTORK(型号ROM2及以上)" shape="square">罗托克ROTORK(型号ROM2及以上)</van-radio>
                        <van-radio name="德国欧玛AUMA（型号SQ05.2及以上)" shape="square">德国欧玛AUMA（型号SQ05.2及以上)</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val74 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val75,'电动头品牌')">
                <slot slot="input">
                    <van-radio-group v-model="info.val75" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val75 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  17.与消防水箱分开。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val76,'与消防水箱分开')">
                <slot slot="input">
                    <van-radio-group v-model="info.val76" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val76 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val77" label="其他补充："  label-width="80"  placeholder="请输入其他补充" clearable></van-field>

            </div>

            <van-field name="radio" label="整改要求：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val78" direction="horizontal">
                        <van-radio name="无整改内容，验收通过" shape="square">无整改内容，验收通过</van-radio>
                        <van-radio name="需要整改，内容如下" shape="square">需要整改，内容如下</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val78 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field  v-model="info.val79"  rows="4"   autosize    label="整改要求：" type="textarea"  placeholder="请输入" label-width="80" ></van-field>
            <van-field name="radio" label="整改期限：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val80" direction="horizontal">
                        <van-radio name="2周内整改完毕" shape="square">2周内整改完毕</van-radio>
                        <van-radio name="1个月内整改完毕" shape="square">1个月内整改完毕</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val80 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-field label="验收人员签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(1)"  width="100%" height="6rem" :src="info.val81"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val82"  label="验收日期："  placeholder="点击选择时间" @click="dateShow(1)" label-width="80"></van-field>


            <van-field name="radio" label="复检情况：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val83" direction="horizontal">
                        <van-radio name="已按要求整改，验收通过" shape="square">已按要求整改，验收通过</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val83 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field label="复检人员签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(2)"  width="100%" height="6rem" :src="info.val84"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val85"  label="复检日期："  placeholder="点击选择时间" @click="dateShow(2)" label-width="80"></van-field>


            <van-row gutter="2"  v-if="info.status !== '已提交'">
                <van-col span="12">
                    <van-button type="primary" color="#00CED1" block @click="keep">保存</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" color="#008B8B" block @click="submit">提交</van-button>
                </van-col>
            </van-row>

            <van-row gutter="2" v-if="info.status == '已提交' && info.state != 0">
                <van-col span="24">
                    <van-button type="primary" color="#00CED1" block @click="toBack">回退</van-button>
                </van-col>
            </van-row>


            <van-row gutter="2" v-if="info.state === 0">
                <van-col span="24">
                    <van-button type="primary" color="#008B8B" block @click="submit">提交</van-button>
                </van-col>
            </van-row>
        </van-form>
        <!-- 签名弹窗-->
        <van-popup v-model="showSign" position="top" :style="{ height: '100%' }" closeable>
            <sign ref="SignCanvas"></sign>
            <van-goods-action style="margin-bottom: 50px">
                <van-goods-action-button color="#be99ff" text="重写" @click="canvasInit"></van-goods-action-button>
                <van-goods-action-button color="#7232dd" text="确定" @click="writeEnd"></van-goods-action-button>
            </van-goods-action>
        </van-popup>
        <!--时间弹窗-->
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm" @cancel="showPicker = false"></van-datetime-picker>
        </van-popup>
        <!--选择器-->
        <van-popup v-model="showPicker2" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm2"
                    @cancel="showPicker2 = false">
            </van-picker>
        </van-popup>


    </div>
</template>

<script>
    import sign from "../../../components/sign";
    import myHeader from "../../../components/myHeader/myHeader";
    import {Toast, Dialog} from 'vant';

    export default {
        name: "e7",
        components: {sign, myHeader},

        data() {
            return {
                timer: '',
                showPicker: false,
                showPicker2: false,
                showCalendar: false,
                currentDate: new Date(),
                showSign: false,
                signVal: '',
                info: {},
                columns: [],
                dateVal: '',
            };
        },
        mounted() {
            this.getInfo(this.id);
            this.timer = setInterval(this.timerKeep, 30000);

        },
        props: ["id"],
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            //回退
            toBack(){
                this.info.status=""
            },
            off(type,val){
                if (type === '不合格'){
                    if (this.info.val79.search(val) === -1){
                        this.info.val79 =  this.info.val79 + val +','
                    }
                }
            },


            //定时保存
            timerKeep() {
                if (this.info.status ==='保存'){
                    this.info.status = '保存';
                    this.api.updE7(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('自动保存成功');
                        } else {
                            Toast.fail('保存失败');
                        }
                    })
                }
            },



            //接单部门
            getDept() {
                this.api.getDeptList(3000).then(res => {
                    for (let i = 0; i <res.data.list.length ; i++) {
                        this.columns.push(res.data.list[i].nm);
                    }

                })
            },


            dateShow(val) {
                this.dateVal = val;
                this.showPicker = true
            },
            onConfirm2(item){
                this.info.equipmentNm = item;
                this.showPicker2 = false;

            },
            onConfirm(time) {
                if (this.dateVal === 1) {
                    this.info.val82 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 2) {
                    this.info.val85 = this.until.dateFormatDay(time);
                }
                this.showPicker = false;
            },
            canvasInit() {
                this.$refs.SignCanvas.canvasInit();
            },
            writeEnd() {
                if (this.signVal === 1) {
                    this.info.val81 = this.$refs.SignCanvas.saveAsImg();
                }
                if (this.signVal === 2) {
                    this.info.val84 = this.$refs.SignCanvas.saveAsImg();
                }

                this.showSign = false;
                this.$refs.SignCanvas.canvasInit();
            },
            signShow(val) {
                this.signVal = val;
                this.showSign = true;
            },
            getInfo(id) {
                let qry = this.query.new();
                this.query.toW(qry, 'earlyId', id, "EQ");
                this.api.getE7(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.info = res.data.list[0];


                    }
                })
            },
            back() {
                this.$emit('closeInfo')
            },
            //提交
            submit() {
                Dialog.confirm({
                    title: '注意',
                    message: '确定提交？'
                }).then(() => {
                    this.info.status = '已提交';
                    this.api.updE7(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('提交成功');
                            this.$emit('closeInfo')
                        } else {
                            Toast.fail('提交失败');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            //保存
            keep() {
                Dialog.confirm({
                    title: '注意',
                    message: '确定保存？'
                }).then(() => {
                    this.info.status = '保存';
                    this.api.updE7(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('保存成功');
                        } else {
                            Toast.fail('保存失败');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .span {
        color: #999999;
        font-size: 10px;
    }

    .van-cell {
        font-size: 10px;
    }

    .van-nav-bar {
        z-index: 999;
        background-color: #1177B9;
        height: 75px;
    }

    .van-nav-bar__title {
        color: white;
        margin-top: 35px;
    }

    .van-nav-bar .van-icon {
        color: white;
    }
</style>

