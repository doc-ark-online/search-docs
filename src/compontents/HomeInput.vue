<template>
  <div class="group">
    <div
      class="w-[680px] flex border border-[#9B9FA6] rounded-xl group-focus-within:border-blue-500 p-4"
    >
      <div
        class="group/button inline-block relative border-r border-[#3C3C3C1F]/10"
      >
        <button type="button" class="flex items-center">
          <span>{{ select.text }}</span>
          <i-meta-down-arrow
            class="ml-2 mr-4 group-focus-within:text-blue-500 text-[#676D77]"
          ></i-meta-down-arrow>
        </button>
        <ul
          class="cursor-pointer hidden absolute group-hover/button:block bg-white shadow-lg px-4 py-1 min-w-[120px]"
        >
          <li
            class="py-1 px-2 text-sm hover:bg-blue-500 hover:text-white text-black rounded"
            v-for="item in docs"
            @click="selectDoc(item)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
      <div class="flex flex-1">
        <i-meta-search
          class="mx-3 text-[#9B9FA6] group-focus-within:text-blue-500"
        ></i-meta-search>
        <input
          v-model="input"
          class="flex-1 focus:ring-blue-500 focus:outline-none"
          type="text"
        />
      </div>
      <button
        @click="goSearch"
        class="-m-4 py-4 px-5 bg-black text-white rounded-e-xl"
      >
        搜索文档
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const docs = ref([
  { value: "", text: "全部" },
  { value: "tags:api-docs", text: "Api文档" },
  { width: 0, left: 0, value: "tags:product-docs", text: "产品文档" },
]);
const select = ref(docs.value[0]);
const input = ref("");

function selectDoc(item: typeof docs.value[0]) {
  select.value = item;
}

function goSearch() {
  router.push({
    name: "search",
    query: {
      search: input.value,
      "doc-type": select.value.value,
    },
  });
}
</script>
<style scoped lang="less"></style>
