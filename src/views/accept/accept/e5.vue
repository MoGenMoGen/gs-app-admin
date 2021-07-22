<template>
  <div id="container">
    <van-sticky>
      <my-header title="泵房管道配件" @back="back" :search-status="false"></my-header>
    </van-sticky>
    <van-form>
      <!--            <van-field v-model="info.estateNm" label="小区名称：" readonly  label-width="80" >  </van-field>-->
      <van-field v-model="info.pumpNm" label="泵房名称：" label-width="80" readonly></van-field>
      <van-field v-model="info.recordNm" label="备案名：" label-width="80" readonly></van-field>
      <van-field v-model="info.unit" label="设备厂家：" label-width="80" readonly></van-field>
      <van-field name="switch" label="无负压" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.wfy" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="无负压个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.wfyNum" min="0"></van-stepper>
        </slot>
      </van-field>
      <van-field name="switch" label="箱式" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.xs" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="箱式个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.xsNum" min="0"></van-stepper>
        </slot>
      </van-field>
      <van-field name="switch" label="水箱加变频" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.sxbp" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="水箱加变频个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.sxbpNum" min="0"></van-stepper>
        </slot>
      </van-field>

      <van-field name="switch" label="工频" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.gp" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="共频个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.gpNum" min="0"></van-stepper>
        </slot>
      </van-field>

      <!--            <van-field v-model="info.deviceNum" label="设备套数："  placeholder="请输入套数"  label-width="80">  </van-field>-->
      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-cell>验收内容及结论</van-cell>
      <van-cell>
                <span class="span">
                   1.设备基座采用整体不锈钢（材质304）
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val1,'设备基座采用整体不锈钢（材质304）')">
        <slot slot="input">
          <van-radio-group v-model="info.val1" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val1 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   2.每台水泵的进出水管管径至少比水泵口管径大一个规格，每台水泵进出口处安装检修阀，进出管道应加设柔性接头，在水泵出口处和检修阀之间装设橡胶瓣止回阀，检修阀采用蝶阀或软密封闸阀。
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val2,'每台水泵的进出水管管径至少比水泵口管径大一个规格，每台水泵进出口处安装检修阀，进出管道应加设柔性接头，在水泵出口处和检修阀之间装设橡胶瓣止回阀，检修阀采用蝶阀或软密封闸阀。')">
        <slot slot="input">
          <van-radio-group v-model="info.val2" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val2 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   3.在每套设备出水管的合适位置设置一个DN25预留口
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val3,'在每套设备出水管的合适位置设置一个DN25预留口')">
        <slot slot="input">
          <van-radio-group v-model="info.val3" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val3 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   4.不锈钢钢板、封头、管道及配件、螺栓（丝）、螺帽、垫片、管道、法兰等材质应采用不低于SUS304的食品级不锈钢材质。
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val4,'不锈钢钢板、封头、管道及配件、螺栓（丝）、螺帽、垫片、管道、法兰等材质应采用不低于SUS304的食品级不锈钢材质。')">
        <slot slot="input">
          <van-radio-group v-model="info.val4" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val4 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   5.稳压补偿罐（含封头），罐体不锈钢板厚度不得小于4mm。
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val5,'稳压补偿罐（含封头），罐体不锈钢板厚度不得小于4mm。')">
        <slot slot="input">
          <van-radio-group v-model="info.val5" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val5 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   6.泵房设备安装应考虑减震防噪措施，水泵基座与基础之间、水泵与水泵基座之间都应进行隔振处理，隔振原件可采用橡胶隔振垫或弹簧隔振器，进出水管穿越地下室或地下构筑物壁板时应设置防水和隔振措施，管道支架应采用隔振支架，隔振支架与管道之间应有隔振件
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val6,'泵房设备安装应考虑减震防噪措施，水泵基座与基础之间、水泵与水泵基座之间都应进行隔振处理，隔振原件可采用橡胶隔振垫或弹簧隔振器，进出水管穿越地下室或地下构筑物壁板时应设置防水和隔振措施，管道支架应采用隔振支架，隔振支架与管道之间应有隔振件')">
        <slot slot="input">
          <van-radio-group v-model="info.val6" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val6 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   7.水泵的出水管上应设压力表、阀门和橡胶瓣止回阀（符合多功能阀安装条件的出水管，可用多功能阀取代止回阀），应设置防水锤装置，安装位置在每个分区的出水总管处。
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val7,'水泵的出水管上应设压力表、阀门和橡胶瓣止回阀（符合多功能阀安装条件的出水管，可用多功能阀取代止回阀），应设置防水锤装置，安装位置在每个分区的出水总管处。')">
        <slot slot="input">
          <van-radio-group v-model="info.val7" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val7 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   8.成套设备实现防水锤功能的应采用小型气压罐
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val8,'成套设备实现防水锤功能的应采用小型气压罐')">
        <slot slot="input">
          <van-radio-group v-model="info.val8" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val8 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   9.泵房内进水管上应设置管道过滤器
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val9,'泵房内进水管上应设置管道过滤器')">
        <slot slot="input">
          <van-radio-group v-model="info.val9" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val9 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   10.泵房内进出水管均采用不锈钢管，连接方式为DN100（含）以上沟槽方式，DN100以下双卡压方式，不锈钢管设计安装终点为距离泵房外墙1.5m处，明管应采用不少于30mm厚度的橡塑保温棉(不锈钢管除外)，埋地管采用钢管套管
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val10,'泵房内进出水管均采用不锈钢管，连接方式为DN100（含）以上沟槽方式，DN100以下双卡压方式，不锈钢管设计安装终点为距离泵房外墙1.5m处，明管应采用不少于30mm厚度的橡塑保温棉(不锈钢管除外)，埋地管采用钢管套管')">
        <slot slot="input">
          <van-radio-group v-model="info.val10" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val10 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   11.控制柜、配电柜、生产设备上方无管线通过
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val11,'控制柜、配电柜、生产设备上方无管线通过')">
        <slot slot="input">
          <van-radio-group v-model="info.val11" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val11 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   12.泵房内管道应进行标识：进水总管及水箱出水管－天酞蓝色；出水管：低区—绿色，中区—白色，高区—深蓝色，超高区—黄色。排水管、溢流管－黑色，表示水流方向的箭头与对应管道文字同色
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val12,'泵房内管道应进行标识：进水总管及水箱出水管－天酞蓝色；出水管：低区—绿色，中区—白色，高区—深蓝色，超高区—黄色。排水管、溢流管－黑色，表示水流方向的箭头与对应管道文字同色')">
        <slot slot="input">
          <van-radio-group v-model="info.val12" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val12 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   13.泵房管道材质采用不低于SUS304的食品级不锈钢材质，
                    <br>&nbsp;&nbsp;&nbsp;口径DN50,厚度（<input class="input1" v-model="info.val69" type="text">    ）；
                    <br>&nbsp;&nbsp;&nbsp;口径DN80，厚度（ <input class="input1" v-model="info.val70" type="text">   ）；
                    <br>&nbsp;&nbsp;&nbsp;口径DN100，厚度（ <input class="input1" v-model="info.val71" type="text">   ）；
                    <br>&nbsp;&nbsp;&nbsp;口径DN150，厚度（ <input class="input1" v-model="info.val72" type="text">   ）；
                    <br>&nbsp;&nbsp;&nbsp;口径DN200，厚度（ <input class="input1" v-model="info.val73" type="text">   ）；
                   <br>&nbsp;&nbsp;&nbsp;口径300，厚度（ <input class="input1" v-model="info.val74" type="text">   ）；
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val12,'泵房内管道应进行标识：进水总管及水箱出水管－天酞蓝色；出水管：低区—绿色，中区—白色，高区—深蓝色，超高区—黄色。排水管、溢流管－黑色，表示水流方向的箭头与对应管道文字同色')">
        <slot slot="input">
          <van-radio-group v-model="info.val75" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val75 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   14.无负压供水设备进水管上必须设置低阻力倒流防止器，应水平安装，倒流防止器排水口应通过管道接至排水沟
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val13,'无负压供水设备进水管上必须设置低阻力倒流防止器，应水平安装，倒流防止器排水口应通过管道接至排水沟')">
        <slot slot="input">
          <van-radio-group v-model="info.val13" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val13 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   15.在进水管合适位置安装一个DN20水质取样龙头
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val14,'在进水管合适位置安装一个DN20水质取样龙头')">
        <slot slot="input">
          <van-radio-group v-model="info.val14" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val14 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   16.设置水箱的进水管宜与加压泵组进水管之间安装旁通管，满足临时直抽功能
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val15,'设置水箱的进水管宜与加压泵组进水管之间安装旁通管，满足临时直抽功能')">
        <slot slot="input">
          <van-radio-group v-model="info.val15" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val15 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   17.在水箱总出水管与水泵之间合适位置，安装一个DN20水质取样龙头。
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val16,'在水箱总出水管与水泵之间合适位置，安装一个DN20水质取样龙头。')">
        <slot slot="input">
          <van-radio-group v-model="info.val16" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val16 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-cell>设备配置要求</van-cell>
      <van-cell>
                <span class="span">
                   1.水泵
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val17" direction="horizontal">
            <van-radio name="格兰富" shape="square">格兰富</van-radio>
            <van-radio name="荏原" shape="square">荏原</van-radio>
            <van-radio name="滨特尔" shape="square">滨特尔</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val17 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val18,'水泵')">
        <slot slot="input">
          <van-radio-group v-model="info.val18" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val18 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   2.压力变送器
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val19" direction="horizontal">
            <van-radio name="瑞士 HUBA" shape="square">瑞士 HUBA</van-radio>
            <van-radio name="丹麦 DANFOSS" shape="square">丹麦 DANFOSS</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val19 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val20,'压力变送器')">
        <slot slot="input">
          <van-radio-group v-model="info.val20" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val20 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   3.压力表
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val21" direction="horizontal">
            <van-radio name="瑞士 HUBA" shape="square">瑞士 HUBA</van-radio>
            <van-radio name="丹麦 DANFOSS" shape="square">丹麦 DANFOSS</van-radio>
            <van-radio name="上海四仪/杭州鹳山" shape="square">上海四仪/杭州鹳山</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val21 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val22" direction="horizontal" @click="off(info.val22,'压力表')">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val22 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   4.压力开关
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val23" direction="horizontal">
            <van-radio name="瑞士 HUBA" shape="square">瑞士 HUBA</van-radio>
            <van-radio name="丹麦 DANFOSS" shape="square">丹麦 DANFOSS</van-radio>
            <van-radio name="上海四仪/杭州鹳山" shape="square">上海四仪/杭州鹳山</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val23 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val24" direction="horizontal" @click="off(info.val23,'压力开关')">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val24 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   5.阀门
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-checkbox-group v-model="val25Result" direction="horizontal">
            <van-checkbox name="上海冠龙" shape="square">上海冠龙</van-checkbox>
            <van-checkbox name="VAG" shape="square">VAG</van-checkbox>
            <van-checkbox name="AVK/苏阀" shape="square">AVK/苏阀</van-checkbox>
            <van-checkbox name="同档次及以上" shape="square">同档次及以上</van-checkbox>
            <van-button type="primary" size="mini" @click="val25Result =[]" plain>取消</van-button>
          </van-checkbox-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val26" direction="horizontal" @click="off(info.val26,'阀门')">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val26 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   6.倒流防止器
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val27" direction="horizontal">
            <van-radio name="天津国威" shape="square">天津国威</van-radio>
            <van-radio name="上海上龙" shape="square">上海上龙</van-radio>
            <van-radio name="广东永泉" shape="square">广东永泉</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val27 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val27,'倒流防止器')">
        <slot slot="input">
          <van-radio-group v-model="info.val28" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val28 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   7.多功能水泵阀
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val29" direction="horizontal">
            <van-radio name="株洲南方" shape="square">株洲南方</van-radio>
            <van-radio name="上海冠龙" shape="square">上海冠龙</van-radio>
            <van-radio name="VAG" shape="square">VAG</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val29 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val30,'多功能水泵阀')">
        <slot slot="input">
          <van-radio-group v-model="info.val30" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val30 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   8.小型气压罐
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val31" direction="horizontal">
            <van-radio name="Zilmet" shape="square">Zilmet</van-radio>
            <van-radio name="Aquasystem" shape="square">Aquasystem</van-radio>
            <van-radio name="Varem" shape="square">Varem</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val31 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val32,'小型气压罐')">
        <slot slot="input">
          <van-radio-group v-model="info.val32" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val32 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   9.工业除湿机品牌及除湿量（2019年第7批开始配置）
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val33" direction="horizontal">
            <van-radio name="宁波甬井" shape="square">宁波甬井</van-radio>
            <van-radio name="上海湿井" shape="square">上海湿井</van-radio>
            <van-radio name="江苏湿美" shape="square">江苏湿美</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val33 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field v-model="info.val34" label="除湿量：" placeholder="请输入除湿量" label-width="80"></van-field>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val35,'工业除湿机品牌及除湿量（2019年第7批开始配置）')">
        <slot slot="input">
          <van-radio-group v-model="info.val35" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-radio name="无配置要求" shape="square">无配置要求</van-radio>
            <van-button type="primary" size="mini" @click="info.val35 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                   10.低量程浊度仪（选配）
                </span>
      </van-cell>
      <van-field name="radio" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val53" direction="horizontal">
            <van-radio name="美国 HACH  1720 系列" shape="square">美国 HACH 1720 系列</van-radio>
            <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
            <van-button type="primary" size="mini" @click="info.val53 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val54,'低量程浊度仪（选配）')">
        <slot slot="input">
          <van-radio-group v-model="info.val54" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-radio name="无配置要求" shape="square">无配置要求</van-radio>
            <van-button type="primary" size="mini" @click="info.val54 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-cell>其他</van-cell>

      <van-cell>
                <span class="span">
                   1.泵房大门安装“泵房重地，闲人免进”的警示牌及“**小区泵房”，格式和材质符合要求。
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val57,'泵房大门安装“泵房重地，闲人免进”的警示牌及“**小区泵房”，格式和材质符合要求。')">
        <slot slot="input">
          <van-radio-group v-model="info.val57" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val57 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-cell>
                <span class="span">
                   2.泵房制度牌按要求配备并上墙、泵房其他标识标牌符合验收要求（无负压泵房2块，有水箱泵房3块，标化泵房按约定配置）。
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80"
                 @click="off(info.val58,'泵房制度牌按要求配备并上墙、泵房其他标识标牌符合验收要求（无负压泵房2块，有水箱泵房3块，标化泵房按约定配置）。')">
        <slot slot="input">
          <van-radio-group v-model="info.val58" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val58 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-cell>
                <span class="span">
                    3.泵房有人字梯，高度满足泵房实际需求
                </span>
      </van-cell>
      <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val59,'泵房有人字梯，高度满足泵房实际需求')">
        <slot slot="input">
          <van-radio-group v-model="info.val59" direction="horizontal">
            <van-radio name="合格" shape="square">合格</van-radio>
            <van-radio name="不合格" shape="square">不合格</van-radio>
            <van-button type="primary" size="mini" @click="info.val59 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-field v-model="info.val60" rows="3" autosize label="其他补充：" type="textarea" placeholder="请输入"
                 label-width="80"></van-field>
      <van-field name="radio" label="整改要求：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val61" direction="horizontal">
            <van-radio name="无整改内容，验收通过" shape="square">无整改内容，验收通过</van-radio>
            <van-radio name="需要整改，内容如下" shape="square">需要整改，内容如下</van-radio>
            <van-button type="primary" size="mini" @click="info.val61 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field v-model="info.val62" rows="4" autosize label="整改要求：" type="textarea" placeholder="请输入"
                 label-width="80"></van-field>
      <van-field name="radio" label="整改期限：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val63" direction="horizontal">
            <van-radio name="2周内整改完毕" shape="square">2周内整改完毕</van-radio>
            <van-radio name="1个月内整改完毕" shape="square">1个月内整改完毕</van-radio>
            <van-button type="primary" size="mini" @click="info.val63 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-field label="验收人员签字：" readonly label-width="200"></van-field>
      <van-image @click="signShow(1)" width="100%" height="6rem" :src="info.val64"></van-image>
      <van-field readonly clickable name="date" :value="info.val65" label="验收日期：" placeholder="点击选择时间"
                 @click="dateShow(1)" label-width="80"></van-field>


      <van-field name="radio" label="复检情况：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val66" direction="horizontal">
            <van-radio name="已按要求整改，验收通过" shape="square">已按要求整改，验收通过</van-radio>
            <van-button type="primary" size="mini" @click="info.val66 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field label="复检人员签字：" readonly label-width="200"></van-field>
      <van-image @click="signShow(2)" width="100%" height="6rem" :src="info.val67"></van-image>
      <van-field readonly clickable name="date" :value="info.val68" label="复检日期：" placeholder="点击选择时间"
                 @click="dateShow(2)" label-width="80"></van-field>
      <!--   -->
      <van-row gutter="2" v-if="info.status !== '已提交'">
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
      <van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm"
                           @cancel="showPicker = false"></van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
import sign from "../../../components/sign";
import myHeader from "../../../components/myHeader/myHeader";
import {Toast, Dialog} from 'vant';

export default {
  name: "e5",
  components: {sign, myHeader},

  data() {
    return {
      timer: '',
      showPicker: false,
      showCalendar: false,
      currentDate: new Date(),
      showSign: false,
      signVal: '',
      info: {},
      checkboxGroup1: [],
      checkboxGroup2: [],
      checkboxGroup3: [],
      val25Result: [],//val25多选框
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
  watch: {
    val25Result(newVal, oldVal) {
      console.log(newVal)
      console.log(newVal.toString())
    }
  },
  methods: {
    off(type, val) {
      if (type === '不合格') {
        if (this.info.val62.search(val) === -1) {
          this.info.val62 = this.info.val62 + val + ','
        }
      }
    },


    //定时保存
    timerKeep() {
      if (this.info.status === '保存') {
        this.info.status = '保存';
        this.api.updE5(JSON.stringify(this.info)).then(res => {
          if (res.code === 200) {
            Toast.success('自动保存成功');
          } else {
            Toast.fail('提交失败');
          }
        })
      }
    },

    dateShow(val) {
      this.dateVal = val;
      this.showPicker = true
    },
    // onConfirmCalendar(item){
    //     this.info.val28  = this.until.dateFormatDay(item);
    //     this.showCalendar = false;
    // },
    onConfirm(time) {
      //验收日期
      if (this.dateVal === 1) {
        this.info.val65 = this.until.dateFormatDay(time);
      }
      //复检日期
      if (this.dateVal === 2) {
        this.info.val68 = this.until.dateFormatDay(time);
      }
      this.showPicker = false;
    },
    canvasInit() {
      this.$refs.SignCanvas.canvasInit();
    },
    writeEnd() {
      //验收人员签字
      if (this.signVal === 1) {
        this.info.val64 = this.$refs.SignCanvas.saveAsImg();
      }
      //复检人员签字
      if (this.signVal === 2) {
        this.info.val67 = this.$refs.SignCanvas.saveAsImg();
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
      this.api.getE5(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
        if (res.code === 200) {
          this.info = res.data.list[0];
          if (this.info.val25) {
            this.val25Result = this.info.val25.split(",")
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
        this.info.status = '已提交';
        this.info.val25 = this.val25Result.toString()
        this.api.updE5(JSON.stringify(this.info)).then(res => {
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
        // if (this.checkboxGroup1.length !== 0){
        //     this.info.deviceNum = this.checkboxGroup1.toString();
        // }
        this.api.updE5(JSON.stringify(this.info)).then(res => {
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


.input1 {
  border: none;
  border-bottom: 1px solid #999999;
  outline: none;
  width: 60px;

}
</style>

