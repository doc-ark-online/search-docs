<template>
  <header
    class="flex justify-between p-6 items-center shadow-md fixed top-0 w-screen z-10"
    style="
      backdrop-filter: saturate(50%) blur(8px);
      background-color: rgba(255, 255, 255, 0.7);
    "
  >
    <div class="flex">
      <img class="h-6 mr-2" src="/logo.png" alt="" />
      <span class="font-bold text-base font-sans">搜索</span>
    </div>
    <ul class="flex gap-6 font-sans text-xs">
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
<script lang="ts" setup></script>
<style scoped lang="less"></style>
