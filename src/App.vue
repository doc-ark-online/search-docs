<template>
  <header
    class="flex justify-between p-6 items-center shadow-md fixed top-0 w-screen"
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
  <div className="algolia-search px-20 py-24">
    <div class="flex flex-col">
      <h1 class="text-2xl mb-4">
        {{ input ? `搜索的关键词是"${input}""` : `开始搜索文档` }}
      </h1>
      <div class="flex gap-3">
        <div class="group relative flex-1">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            placeholder="请输入搜索内容"
            v-model="input"
            type="text"
          />
        </div>
        <select
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm min-w-[300px]"
          v-model="select"
        >
          <option value="">全部</option>
          <option value="tags:product-docs">产品文档</option>
          <option value="tags:api-docs">Api文档</option>
        </select>
      </div>
    </div>
    <p v-if="input && resultList?.nbHits" class="mt-2">
      共搜索到{{ resultList?.nbHits }}结果
    </p>
    <ul v-if="input">
      <li v-for="item in hits" :key="item.objectID">
        <a
          class="text-blue-600 hover:underline hover:decoration-2 hover:decoration-blue-600 text-xl my-4 block"
          :href="item.url"
          v-html="getText(item)"
        ></a>
        <hr />
      </li>
    </ul>
    <div ref="nextRef" class="mt-4">
      <div v-if="loading" class="text-center text-2xl my-4">加载中...</div>
      <div v-if="input.length > 0 && resultList?.nbHits === 0">
        没有搜索到任何结果
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import algoliasearch, { type SearchIndex } from "algoliasearch";
import type { Hit, SearchResponse } from "@algolia/client-search";
import type { AlgoliaResult } from "./type";
const searchIndex = ref<SearchIndex>();
const input = ref("");
const resultList = ref<SearchResponse<AlgoliaResult>>();
const loading = ref(false);
const hits = ref<Hit<AlgoliaResult>[]>([]);
const select = ref("");
const nextRef = ref<HTMLDivElement>();
const page = ref(0);

const urlParams = computed(() => {
  const params = new URL(window.location.href).searchParams;
  return {
    search: params.get("search"),
    docType: params.get("doc-type"),
  };
});

watch([input, select], async ([v, s]) => {
  if (!v) return;
  getAlgoliaData();
});

async function getAlgoliaData(isNext: boolean = false) {
  if (!input.value) return;
  if (isNext && resultList.value?.nbHits === hits.value.length) {
    return;
  }
  loading.value = true;
  if (isNext) {
    page.value += 1;
  } else {
    page.value = 0;
  }
  try {
    resultList.value = await searchIndex.value?.search<AlgoliaResult>(
      input.value,
      {
        // facetFilters: ["tags:product-docs"],
        // indexName: "all-docs",
        attributesToRetrieve: [
          "hierarchy.lvl0",
          "hierarchy.lvl1",
          "hierarchy.lvl2",
          "hierarchy.lvl3",
          "hierarchy.lvl4",
          "hierarchy.lvl5",
          "hierarchy.lvl6",
          "content",
          "type",
          "url",
        ],
        attributesToSnippet: [
          "hierarchy.lvl1:10",
          "hierarchy.lvl2:10",
          "hierarchy.lvl3:10",
          "hierarchy.lvl4:10",
          "hierarchy.lvl5:10",
          "hierarchy.lvl6:10",
          "content:10",
        ],
        snippetEllipsisText: "…",
        highlightPreTag: "<mark>",
        highlightPostTag: "</mark>",
        hitsPerPage: 40,
        page: page.value,
        facetFilters: [select.value],
      }
    );
    if (isNext) {
      hits.value.push(...(resultList.value?.hits ?? []));
    } else {
      hits.value = resultList.value?.hits ?? [];
    }
  } catch (error) {}
  loading.value = false;
}

function getText(text: Hit<AlgoliaResult>) {
  if (text.type === "content") {
    return text._highlightResult?.content?.value;
  } else {
    // return text._highlightResult?.hierarchy[text.type]?.value;
    return text._highlightResult?.hierarchy?.[text.type]?.value;
  }
}

function loadNextPage() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Element is visible");
        getAlgoliaData(true);
      } else {
        console.log("Element is not visible");
      }
    });
  });

  observer.observe(nextRef.value!);
}

onMounted(async () => {
  const client = algoliasearch(
    "89BNK6UU0A",
    "f691939e4fa8b414f92c84c288d2097a"
  );
  searchIndex.value = client.initIndex("all-docs");
  loadNextPage();
  if (urlParams.value.search) {
    input.value = urlParams.value.search;
  }

  if (urlParams.value.docType) {
    select.value = urlParams.value.docType;
  }
});
</script>

<style lang="less">
.algolia-search {
  mark {
    background-color: rgba(255, 215, 142, 0.25);
    color: black;
  }
  li {
    list-style: none;
  }
}
</style>
