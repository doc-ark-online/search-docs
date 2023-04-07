<template>
  <a
    :href="href"
    target="_blank"
    class="flex items-start p-9 gap-6 w-[336px] border border-[#E6E8EA] hover:border-blue-500 rounded-2xl"
  >
    <div class="h-6">
      <slot>
        <i-meta-book></i-meta-book>
      </slot>
    </div>
    <div class="flex gap-3 flex-col">
      <h1 class="text-[#171A1C] text-xl">{{ title }}</h1>
      <!-- <p class="text-[#9B9FA6] text-sm">
        {{ des }}
      </p> -->
    </div>
  </a>
</template>
<script lang="ts" setup>
import { Component } from "vue";

defineProps<{
  title: string;
  des: string;
  href: string;
}>();
</script>
<style scoped lang="less"></style>
