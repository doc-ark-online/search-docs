<template>
  <header
    class="flex justify-between py-6 px-[20vw] items-center shadow-md fixed top-0 w-screen z-10"
    style="
      backdrop-filter: saturate(50%) blur(8px);
      background-color: rgba(255, 255, 255, 0.7);
    "
  >
    <div class="flex items-center cursor-pointer" @click="tapHome">
      <img
        class="h-6"
        src="https://wstatic-01-ali.233leyuan.com/xyc/metaverse-docs/kd-logo-black.svg"
        alt=""
      />
      <span
        class="mx-2 block w-[1px] h-4"
        style="background-color: rgba(60, 60, 60, 0.12)"
      ></span>
      <span class="text-base font-semibold">文档</span>
    </div>
    <ul class="flex gap-6 font-sans text-sm font-semibold">
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          :data-pandora="
            JSON.stringify({
              key: 'click_api',
              button: 'header-创作者',
            })
          "
          href="https://creator.ark.online/"
          >创作者</a
        >
      </li>
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          :data-pandora="
            JSON.stringify({
              key: 'click_api',
              button: 'header-教程',
            })
          "
          href="https://learning.ark.online/"
          >教程</a
        >
      </li>
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          href="https://docs.ark.online/"
          :data-pandora="
            JSON.stringify({
              key: 'click_api',
              button: 'header-产品手册',
            })
          "
          >产品手册</a
        >
      </li>
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          href="https://api-docs.ark.online/"
          :data-pandora="
            JSON.stringify({
              key: 'click_api',
              button: 'header-API',
            })
          "
          >API</a
        >
      </li>
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          :data-pandora="
            JSON.stringify({
              key: 'click_api',
              button: 'header-论坛',
            })
          "
          href="https://forum.ark.online/"
          >论坛</a
        >
      </li>
    </ul>
  </header>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
function tapHome() {
  router.push({ name: "home" });
}
</script>
<style scoped lang="less"></style>
