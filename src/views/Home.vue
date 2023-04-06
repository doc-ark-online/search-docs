<template>
  <Header></Header>
  <div className="flex justify-center items-center flex-col h-screen w-screen">
    <i-meta-text-logo class="h-14"></i-meta-text-logo>
    <HomeInput class="mt-14"></HomeInput>
    <div class="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-6 mt-20">
      <DocCard
        title="产品手册"
        href="https://meta.feishu.cn/wiki/wikcnmY0MQweLdbnlywkJJiDucd"
        des="借助小程序、移动应用、网站应用等业务载体，为开发者提供能力"
      ></DocCard>
      <DocCard
        title="教程"
        href="https://meta.feishu.cn/wiki/wikcnmY0MQweLdbnlywkJJiDucd"
        des="借助小程序、移动应用、网站应用等业务载体，为开发者提供能力"
      >
        <i-meta-open-book></i-meta-open-book>
      </DocCard>
      <DocCard
        title="API"
        href="https://meta.feishu.cn/wiki/wikcnmY0MQweLdbnlywkJJiDucd"
        des="依托“秒玩”的轻量形态及抖音多元分发优势"
      >
        <i-meta-api-doc></i-meta-api-doc>
      </DocCard>
      <DocCard
        title="更新说明"
        href="https://meta.feishu.cn/wiki/wikcnmY0MQweLdbnlywkJJiDucd"
        des="借助小程序代开发、生活服务商家应用等业务形态"
      >
        <i-meta-arrow-circle-up></i-meta-arrow-circle-up>
      </DocCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from "../compontents/Header.vue";
import DocCard from "../compontents/DocCard.vue";
import HomeInput from "../compontents/HomeInput.vue";
</script>
<style scoped lang="scss"></style>
