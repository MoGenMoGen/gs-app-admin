<template>
    <div id="container">
        <van-sticky>
            <my-header title="土建验收表" @back="back" :search-status="false"></my-header>
        </van-sticky>
        <van-form>
<!--            <van-field v-model="info.estateNm" label="小区名称：" readonly label-width="80"></van-field>-->
            <van-field v-model="info.pumpNm" label="泵房名称：" label-width="80" readonly></van-field>
            <van-field v-model="info.region" label="行政区域：" label-width="80" readonly></van-field>
            <van-field v-model="info.recordNm" label="备案名：" label-width="80" readonly></van-field>
            <van-field v-model="info.constructionUnit" label="建设单位：" label-width="80" readonly></van-field>

            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>验收内容及结论</van-cell>
            <van-cell>
                <span class="span">
                   1.生活水泵房单独设置
                </span>
            </van-cell>
            <van-field name="radio" label="位置：" label-width="80"  >
                <slot slot="input">
                    <van-radio-group v-model="info.val3" direction="horizontal">
                        <van-radio name="地上" shape="square">地上</van-radio>
                        <van-radio name="地下一层" shape="square">地下一层</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val3 = ''" plain>取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val4,'生活水泵房单独设置')">
                <slot slot="input">
                    <van-radio-group v-model="info.val4" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val4 = ''" plain>取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   2.泵房无后期加固措施及上翻梁
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val5,'泵房无后期加固措施及上翻梁')">
                <slot slot="input">
                    <van-radio-group v-model="info.val5" direction="horizontal">
                        <van-radio  name="合格" shape="square">合格</van-radio >
                        <van-radio  name="不合格" shape="square">不合格</van-radio >
                        <van-button  type="primary" size="mini" @click="info.val5 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>



            <van-cell>
                <span class="span">
                   3.雨水管、消防管等非泵房管线未接入或穿过泵房。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val6,'雨水管、消防管等非泵房管线未接入或穿过泵房。')">
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
                   4.大门为防火防盗门，宽度1.2m及以上。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val7,'大门为防火防盗门，宽度1.2m及以上')">
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
                   5.窗户为中空隔音玻璃，装有不锈钢防盗窗，太阳照射到控制柜需装窗帘。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val8,'窗户为中空隔音玻璃，装有不锈钢防盗窗，太阳照射到控制柜需装窗帘')">
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
                   6.有5cm高的混凝土门槛、0.3m高不锈钢挡水(小动物)条。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val9,'有5cm高的混凝土门槛、0.3m高不锈钢挡水(小动物)条')">
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
                   7.泵房内墙干净、无渗、漏痕迹
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val10,'泵房内墙干净、无渗、漏痕迹')">
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
                   8.泵房地面平整
                </span>
            </van-cell>
            <van-field name="radio" label="材料：" label-width="45">
                <slot slot="input">
                    <van-radio-group v-model="info.val11" direction="horizontal">
                        <van-radio name="灰色" shape="square">环氧地坪（灰色）</van-radio>
                        <van-radio name="瓷砖" shape="square">瓷砖</van-radio>
                        <van-radio name="水泥" shape="square">水泥</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val11 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val12,'泵房地面平整迹材料')">
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
                   9.56W以上防爆壁灯，数量与安装高度符合要求，控制柜、水箱人梯、人孔、设备上方无死角，照明开关在正门进门处。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80"  @click="off(info.val13,'56W以上防爆壁灯，数量与安装高度符合要求，控制柜、水箱人梯、人孔、设备上方无死角，照明开关在正门进门处')" >
                <slot slot="input">
                    <van-radio-group v-model="info.val13" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val13 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   10.8个五孔防水备用插座，数量、位置符合要求。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val14,'8个五孔防水备用插座，数量、位置符合要求。')">
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
                   11.每个墙面安装消防疏散逃生指示灯，距地60cm左右，大门门框都装有安全出口标志灯，数量和安装位置符合要求。疏散防爆应急照明及电线嵌入式安装。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val15,'每个墙面安装消防疏散逃生指示灯，距地60cm左右，大门门框都装有安全出口标志灯，数量和安装位置符合要求。疏散防爆应急照明及电线嵌入式安装')">
                <slot slot="input">
                    <van-radio-group v-model="info.val15" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val15 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   12.泵房内有无线信号，单膜4芯光纤已拉至泵房正门。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val16,'泵房内有无线信号，单膜4芯光纤已拉至泵房正门。')">
                <slot slot="input">
                    <van-radio-group v-model="info.val16" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val16 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   13.泵房四周设有排水沟，出口都设有防虫网，排水沟与室外雨水井相连，深度、宽度、坡度、排水孔大小都符合要求，斜向排水口。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val17,'.泵房四周设有排水沟，出口都设有防虫网，排水沟与室外雨水井相连，深度、宽度、坡度、排水孔大小都符合要求，斜向排水口')">
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
                   14.有水箱的泵房合适位置开设应急排水孔，设有防虫网，位置、大小都符合要求。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80"  @click="off(info.val18,'有水箱的泵房合适位置开设应急排水孔，设有防虫网，位置、大小都符合要求')">
                <slot slot="input">
                    <van-radio-group v-model="info.val18" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val18 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   15.有水箱泵房
                </span>
            </van-cell>
            <van-field name="checkboxGroup" label="水箱基础:" label-width="60" >
                <slot slot="input">
                    <van-checkbox-group v-model="checkboxGroup1" direction="horizontal">
                        <van-checkbox name="混凝土条形梁" shape="square">混凝土条形梁</van-checkbox>
                        <van-checkbox name="工字钢" shape="square">工字钢</van-checkbox>
                    </van-checkbox-group>
                </slot>
            </van-field>


            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val20,'有水箱泵房水箱基础')">
                <slot slot="input">
                    <van-radio-group v-model="info.val20" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val20 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field name="radio" label="水箱人孔上方净空符合要求：" label-width="120" @click="off(info.val21,'水箱人孔上方净空符合要求')">
                <slot slot="input">
                    <van-radio-group v-model="info.val21" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val21 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="3个安全环位置合适承载能满足要求：" label-width="120" @click="off(info.val22,'3个安全环位置合适承载能满足要求')">
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
                   16.水泵、控制柜基础高度20cm，平整度符合要求。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val23,'水泵、控制柜基础高度20cm，平整度符合要求。')">
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
                   17.泵房进线电源从专用电源箱接出，电表安装在泵房外。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val24,'泵房进线电源从专用电源箱接出，电表安装在泵房外。')">
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
                   18.1211（2kg/个）灭火器+专用灭火箱（2+1）
                </span>
            </van-cell>
            <van-field v-model="info.val25" label="共几套：" placeholder="请输入灭火器套数" label-width="80"></van-field>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val26,'1211（2kg/个）灭火器+专用灭火箱（2+1）')">
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
                   19.泵房内无杂物、无易燃易爆及腐蚀性物品，门、窗、地面、设备整洁干净
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val58,'泵房内无杂物、无易燃易爆及腐蚀性物品，门、窗、地面、设备整洁干净')">
                <slot slot="input">
                    <van-radio-group v-model="info.val58" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val58 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   20.驻地网申请及开通进展情况
                </span>
            </van-cell>
            <van-field name="radio" label="进展情况：" label-width="60">
                <slot slot="input">
                    <van-radio-group v-model="info.val27" direction="horizontal">
                        <van-radio name="已申请" shape="square">已申请</van-radio>
                        <van-radio name="未申请" shape="square">未申请</van-radio>
                        <van-radio name="已开通" shape="square">已开通</van-radio>
                        <van-radio name="未开通" shape="square">未开通</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val27 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field readonly clickable name="calendar" :value="info.val28" label="承诺开通时间" placeholder="点击选择日期" @click="showCalendar = true"></van-field>
            <van-calendar v-model="showCalendar" @confirm="onConfirmCalendar"></van-calendar>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val29,'驻地网申请及开通进展情况')">
                <slot slot="input">
                    <van-radio-group v-model="info.val29" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val29 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   21.有噪音隐患的，泵房内有做隔音降噪处理
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val30,'有噪音隐患的，泵房内有做隔音降噪处理')">
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
                   22.地下室泵房有排污泵的，排污泵功率、数量符合要求
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val31,'地下室泵房有排污泵的，排污泵功率、数量符合要求')">
                <slot slot="input">
                    <van-radio-group v-model="info.val31" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val31 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field v-model="info.val32" rows="3" autosize label="其他意见：" type="textarea" placeholder="请输入" label-width="80"></van-field>


            <van-field name="radio" label="整改要求：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val33" direction="horizontal">
                        <van-radio name="无整改内容，验收通过" shape="square">无整改内容，验收通过</van-radio>
                        <van-radio name="需要整改，内容如下" shape="square">需要整改，内容如下</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val33 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field v-model="info.val34" rows="4" autosize label="整改要求：" type="textarea" placeholder="请输入" label-width="80"></van-field>
            <van-field name="radio" label="整改期限：" label-width="60">
                <slot slot="input">
                    <van-radio-group v-model="info.val35" direction="horizontal">
                        <van-radio name="2周内整改完毕" shape="square">2周内整改完毕</van-radio>
                        <van-radio name="1个月内整改完毕" shape="square">1个月内整改完毕</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val35 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-field label="验收人员签字：" readonly label-width="200"></van-field>
            <van-image @click="signShow(1)" width="100%" height="6rem" :src="info.val53"></van-image>
            <van-field readonly clickable name="date" :value="info.val54" label="验收日期：" placeholder="点击选择时间" @click="dateShow(1)" label-width="80"></van-field>


            <van-field name="radio" label="复检情况：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val55" direction="horizontal">
                        <van-radio name="已按要求整改，验收通过" shape="square">已按要求整改，验收通过</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val55 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field label="复检人员签字：" readonly label-width="200"></van-field>
            <van-image @click="signShow(2)" width="100%" height="6rem" :src="info.val56"></van-image>
            <van-field readonly clickable name="date" :value="info.val57" label="复检日期：" placeholder="点击选择时间" @click="dateShow(2)" label-width="80"></van-field>


            <van-row gutter="2" v-if="info.status !== '已提交'">
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
    </div>
</template>

<script>
    import sign from "../../../components/sign";
    import myHeader from "../../../components/myHeader/myHeader";
    import {Toast, Dialog} from 'vant';

    export default {
        name: "e4",
        components: {sign, myHeader},

        data() {
            return {
                timer: '',
                showPicker: false,
                showCalendar: false,
                currentDate: new Date(),
                showSign: false,
                signVal: '',
                info: {
                    val22: []
                },
                checkboxGroup1: [],
                checkboxGroup2: [],
                checkboxGroup3: [],
            };
        },
        mounted() {
            this.getInfo(this.id)
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
                    if (this.info.val34.search(val) === -1){
                        this.info.val34 =  this.info.val34 + val +','
                    }
                }
            },

            //定时保存
            timerKeep() {
                if (this.checkboxGroup1.length !== 0){
                    this.info.val19 = this.checkboxGroup1.toString();
                }
                if (this.info.status === '保存'){
                    this.info.status = '保存';
                    this.api.updE4(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('自动保存成功');
                        } else {
                            Toast.fail('保存失败');
                        }
                    })
                }
            },
            dateShow(val) {
                this.dateVal = val;
                this.showPicker = true
            },
            onConfirmCalendar(item) {
                this.info.val28 = this.until.dateFormatDay(item);
                this.showCalendar = false;
            },
            onConfirm(time) {
                //验收日期
                if (this.dateVal === 1) {
                    this.info.val54 = this.until.dateFormatDay(time);
                }
                //复检日期
                if (this.dateVal === 2) {
                    this.info.val57 = this.until.dateFormatDay(time);
                }
                this.showPicker = false;
            },
            canvasInit() {
                this.$refs.SignCanvas.canvasInit();
            },
            writeEnd() {
                //验收人员签字
                if (this.signVal === 1) {
                    this.info.val53 = this.$refs.SignCanvas.saveAsImg();
                }
                //复检人员签字
                if (this.signVal === 2) {
                    this.info.val56 = this.$refs.SignCanvas.saveAsImg();
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
                this.api.getE4(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.info = res.data.list[0];
                        if (this.info.val19 != null){
                            this.checkboxGroup1 = this.info.val19.split(",")
                        }
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
                    if (this.checkboxGroup1.length !== 0){
                        this.info.val19 = this.checkboxGroup1.toString();
                    }
                    this.info.status = '已提交';
                    this.api.updE4(JSON.stringify(this.info)).then(res => {
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
                    if (this.checkboxGroup1.length !== 0){
                        this.info.val19 = this.checkboxGroup1.toString();
                    }
                    this.info.status = '保存';
                    this.api.updE4(JSON.stringify(this.info)).then(res => {
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
        },
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

