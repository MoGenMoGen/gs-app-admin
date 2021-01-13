<template>
    <div id="container">
        <van-sticky>
            <my-header title="成套设备" @back="back" :search-status="false"></my-header>
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
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val1" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   2.成套设备应具备防雷、安全接地及过电压保护措施，需具备电源保护、网络保护和信号保护
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val2" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   3.电气控制柜应采取防尘、防水、防潮等安全措施，柜体安装强制通风风扇，做到有效通风、合理布置
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val3" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   4.电气控制柜总电源进线处装设带通讯接口的智能电表装置系统一套，由PLC读取其采集的电压、电流、有功功率、无功功率、功率因数、电能等数据（2020年前为电度计量装置）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val4" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   5.电气控制柜结构为前面开门，后面板可拆卸，前后有密封材料。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val5" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   6.电气控制柜制作钢板采用国产优质（A3及以上等级）冷扎板，板厚不低于2mm。柜体外壳防护等级不低于IP54。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val6" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   7.电气控制柜内所有的导线、电缆都应采用不可移动的箍套或用清洁的热收缩套管作标签固定在接结端子排前实现，不得使用吊牌作标签
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val7" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   8.电气控制柜面板应有电源、电流、电压、电量、水泵启停状况、频率、故障声光报警等显示功能
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val8" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   9.控制柜前设置3mm厚度的绝缘胶垫，尺寸与控制柜匹配
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val9" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   10.变频器和水泵必须一对一配备。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val10" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
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
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val12" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
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
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val14" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
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
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val86" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
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
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val17" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
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
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val19" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-radio name="无配置要求" shape="square">无配置要求</van-radio>
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
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val21" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
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
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val22" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   2.手动运行方式能不通过PLC也应具有自动恒压功能。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val23" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   3.手动变频控制应脱离PLC单独设置。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val24" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   4.在控制柜上除能操作水泵启停外，还应能控制电动阀启闭。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val25" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   5.调度中心控制级则在计算机上能启用停用成套设备，启闭水箱进水电动阀，其余操作一概不允许。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val88" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   6.现场 PLC 可独立完成监控任务，使现场工作流程仍能正常运行
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val26" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  7.PLC至少富余4个DI，4个DO，2个AI，2个AO。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val27" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  8.监控软件应能生成现场工艺流程图，反映生产运行实时数据，可以在线修改现场各类控制参数，并对设备进行启停及电动阀进行开关，应能完成历史数据、趋势曲线的存储、显示与查询。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val28" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  9.控制设备、修改参数、上下载触摸屏软件必须要输入密码，密码不能低于6位，且由字母、数字、符合组成
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val29" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
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
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val30" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  2.水泵上传数据：水泵的开启情况，单机水泵的电流、转速、功率、频率、运行时间、启动次数、启停时间点、故障次数。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val31" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  3.变频器上传数据：变频器的进出电流、电压、运行频率和温度。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val32" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  4.水压及流量：泵房主管道的进出口压力、设定压力和水泵出口压力，瞬时流量、当天总水量、总累积流量（要求装流量计以后实现此功能）。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val33" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  5.报警信息：报警内容包括进水压力高/低、出水压力高/低、出水流量异常、设备掉电、水泵电流异常、变频器故障、PLC 故障、进线电流/电压异常等。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val34" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  6.泵房现场必须保存半年以上的运行数据（数据存储频率不低于5分钟一次）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val35" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  7.必须关闭PLC、触摸屏的Http和SNMP功能，并且在以太网通讯模式下，PLC系统能指定1-2个IP主站与之进行ModbusTCP通讯，并拒绝其它IP与之通讯。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val36" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  8.必须关闭以太网上下载PLC软件的功能，并且必须要输入密码，密码不能低于6位，且由字母、数字、符号组成。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val37" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  9.设备运行情况实时监控、设备报警信息等已经上传到二次供水调度中心
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val38" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  10.移交资料：已按《二次供水泵房移交资料清单》提交。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val39" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-field name="radio" label="整改要求：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val78" direction="horizontal">
                        <van-radio name="无整改内容，验收通过" shape="square">无整改内容，验收通过</van-radio>
                        <van-radio name="需要整改，内容如下" shape="square">需要整改，内容如下</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field  v-model="info.val79"  rows="4"   autosize    label="整改要求：" type="textarea"  placeholder="请输入" label-width="80" ></van-field>
            <van-field name="radio" label="整改期限：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val80" direction="horizontal">
                        <van-radio name="2周内整改完毕" shape="square">2周内整改完毕</van-radio>
                        <van-radio name="1个月内整改完毕" shape="square">1个月内整改完毕</van-radio>
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
        name: "e13",
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

            //定时保存
            timerKeep() {
                if (this.info.status === '保存'){
                    this.info.status = '保存';
                    this.api.updE13(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('保存成功');
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
                this.api.getE13(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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
                    this.api.updE13(JSON.stringify(this.info)).then(res => {
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
                    this.api.updE13(JSON.stringify(this.info)).then(res => {
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

