<template>
  <div class="notice">
    <div class="title">{{ hosname }}预约挂号通知</div>
    <div class="item">
      <div class="content">为方便您早日就医康复，请您认真阅读预约挂号须知：</div>
    </div>
    <div class="item">
      <div class="title">一、预约实名制：</div>
      <div class="content">
        统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息
      </div>
    </div>
    <div class="item">
      <div class="title">二、预约挂号：</div>
      <div class="content">
        <div class="tip-title">按照北京市建委统一平台要求，预约挂号规则如下：</div>
        <div class="tip">在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源</div>
        <div class="tip">在同一自然周，同一就诊人，可以预约最多8个号源</div>
        <div class="tip">在同一自然月，同一就诊人，可以预约最多12个号源</div>
        <div class="tip">在同一自然季，同一就诊人，可以预约最多24个号源</div>
      </div>
    </div>
    <div class="item">
      <div class="title">三、取消预约：</div>
      <div class="content">
        已完成预约的号源，如需办理退号，至少在就诊前一工作日14：00前通过网站、微信公众号、114电话等预约平台预约渠道进行取消预约。
      </div>
    </div>
    <div class="item">
      <div class="title">四、爽约处理：</div>
      <div class="content">
        <div class="tip-title">
          如果预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下:
        </div>

        <div class="tip">累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；</div>
        <div class="tip">累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号；</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail'

const detailStore = useDetailStore()

const { hosname } = detailStore.hospitalInfo.hospital || {}
</script>

<style scoped lang="scss">
.notice {
  & > .title {
    font-size: $lFontSize;
    text-align: center;
    margin: 10px 0;
  }
  .item {
    font-size: $sFontSize;
    color: #777;
    line-height: 25px;
    .title {
      font-size: $sFontSize;
      margin: 10px 0;
      font-weight: 700;
    }
    .content {
      .tip-title {
        font-size: $sFontSize;
        margin: 10px 0;
      }
    }
  }
}
</style>
