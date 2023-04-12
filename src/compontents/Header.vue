<template>
  <header
    class="flex justify-between py-6 px-[20vw] items-center shadow-md fixed top-0 w-screen z-10"
    style="
      backdrop-filter: saturate(50%) blur(8px);
      background-color: rgba(255, 255, 255, 0.7);
    "
  >
    <div class="flex items-center cursor-pointer" @click="tapHome">
      <img class="h-6" src="/logo.png" alt="" />
      <span
        class="mx-2 block w-[1px] h-4"
        style="background-color: rgba(60, 60, 60, 0.12)"
      ></span>
      <span class="text-base font-semibold">搜索</span>
    </div>
    <ul class="flex gap-6 font-sans text-sm font-semibold">
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          href="https://creator.ark.online/"
          >官网</a
        >
      </li>
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          href="https://meta.feishu.cn/wiki/wikcnmY0MQweLdbnlywkJJiDucd"
          >教程</a
        >
      </li>
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
          href="https://api-docs.ark.online/"
          >API</a
        >
      </li>
      <li>
        <a
          class="hover:text-blue-600"
          target="_blank"
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
