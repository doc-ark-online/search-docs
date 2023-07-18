<template>
  <Header></Header>
  <div className="flex justify-center items-center flex-col h-screen w-screen">
    <div class="flex items-center">
      <!-- <i-meta-text-logo class="h-14"></i-meta-text-logo> -->
      <img
        class="h-14"
        src="https://wstatic-01-ali.233leyuan.com/xyc/metaverse-docs/kd-logo-black.svg"
        alt="logo"
      />
      <!-- <span
        class="mx-2 block w-[1px] h-14"
        style="background-color: rgba(60, 60, 60, 0.12)"
      ></span>
      <span class="text-5xl font-semibold">文档</span> -->
    </div>
    <HomeInput class="mt-14"></HomeInput>
    <div class="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-6 mt-20">
      <DocCard
        title="教程"
        href="https://learning.ark.online"
        :data-pandora="
          JSON.stringify({
            key: 'click_api',
            button: '首页-教程',
          })
        "
        des="梦想从此启航，立即使用我们的教程与案例上手游戏制作"
      >
        <i-meta-open-book></i-meta-open-book>
      </DocCard>
      <DocCard
        title="更新说明"
        :data-pandora="
          JSON.stringify({
            key: 'click_api',
            button: '首页-更新说明',
          })
        "
        href="https://docs.ark.online/ReleaseNote/ReleaseNote.html"
        des="获取口袋方舟产品功能、API的新特性"
      >
        <i-meta-arrow-circle-up></i-meta-arrow-circle-up>
      </DocCard>
      <DocCard
        title="产品手册"
        :data-pandora="
          JSON.stringify({
            key: 'click_api',
            button: '首页-产品手册',
          })
        "
        href="https://docs.ark.online"
        des="口袋方舟产品功能、特性、安装配置等最全面的参考资料"
      ></DocCard>
      <DocCard
        title="API"
        :data-pandora="
          JSON.stringify({
            key: 'click_api',
            button: '首页-API',
          })
        "
        href="https://api-docs.ark.online"
        des="通过 TypeScript 来口袋方舟编写属于自己的游戏逻辑"
      >
        <i-meta-api-doc></i-meta-api-doc>
      </DocCard>
    </div>
    <Footer></Footer>
  </div>
</template>
<script lang="ts" setup>
import Header from "../compontents/Header.vue";
import Footer from "../compontents/Footer.vue";
import DocCard from "../compontents/DocCard.vue";
import HomeInput from "../compontents/HomeInput.vue";
import { onMounted } from "vue";
import { pandora } from "../pandora";

onMounted(() => {
  pandora.send("page_view_api", {});
});
</script>
<style scoped lang="scss"></style>
