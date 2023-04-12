<template>
  <Header></Header>
  <div className="algolia-search px-[20vw] py-24">
    <div class="flex flex-col">
      <h1 class="text-2xl mb-4">
        {{ input ? `搜索的关键词是"${input}"` : `开始搜索文档` }}
      </h1>
      <div class="flex gap-3">
        <div class="group relative flex-1 flex items-center">
          <i-meta-search
            class="absolute left-2 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
          ></i-meta-search>
          <input
            class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-10 ring-1 ring-slate-200 shadow-sm"
            placeholder="请输入搜索内容"
            v-model="input"
            type="text"
          />
          <i-meta-delete
            v-show="input"
            @click="input = ''"
            class="absolute right-2 text-slate-400 cursor-pointer"
          ></i-meta-delete>
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center border-b border-[rgba(60, 60, 60, 0.12)]"
    >
      <ul class="flex gap-12 mt-4 relative" ref="ulRef">
        <div
          style="border-radius: 2px 2px 0px 0px"
          :style="{
            transform: `translateX(${translateX}px)`,
            width: `${width}px`,
          }"
          class="absolute h-[3px] bg-blue-500 w-6 bottom-0 left-0 transition-transform"
        ></div>
        <li
          v-for="item in docType"
          ref="lisRef"
          class="text-sm leading-[48px] cursor-pointer"
          :class="{
            'text-blue-500 font-bold active': select === item.value,
          }"
          @click="selectHandler(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <p
        v-if="input && resultList?.nbHits && loading === false"
        class="mt-2 text-sm text-[#676D77]"
      >
        共搜索到{{ resultList?.nbHits }}个结果
      </p>
    </div>
    <ul v-if="input">
      <li v-for="item in hits" :key="item.objectID">
        <a
          class="text-[#676D77] hover:underline hover:decoration-2 hover:decoration-blue-600 text-xl my-4 block"
          :href="item.url"
          target="_blank"
        >
          <div class="flex items-center">
            <i-meta-search-api
              v-if="item.tags.includes('api-docs')"
              class="w-7 mr-4"
            ></i-meta-search-api>
            <i-meta-search-product
              v-if="item.tags.includes('product-docs')"
              class="w-7 mr-4"
            ></i-meta-search-product>
            <i-meta-search-learning
              v-if="item.tags.includes('learning-docs')"
              class="w-7 mr-4"
            ></i-meta-search-learning>
            <div class="flex flex-col flex-1">
              <span class="text-sm" v-html="getText(item)"></span>
              <span
                class="text-[#676D77] text-xs mt-2"
                v-html="getTreeText(item)"
              ></span>
            </div>
          </div>
        </a>
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
import Header from "../compontents/Header.vue";
import algoliasearch, { type SearchIndex } from "algoliasearch";
import type { Hit, SearchResponse } from "@algolia/client-search";
import type { AlgoliaResult } from "../type";
import { useRoute } from "vue-router";
const route = useRoute();
const searchIndex = ref<SearchIndex>();
const input = ref("");
const resultList = ref<SearchResponse<AlgoliaResult>>();
const loading = ref(false);
const hits = ref<Hit<AlgoliaResult>[]>([]);
const nextRef = ref<HTMLDivElement>();
const page = ref(0);
const translateX = ref(0);
const width = ref(0);
const docType = ref([
  { width: 0, left: 0, value: "", text: "全部" },
  { width: 0, left: 0, value: "tags:learning-docs", text: "教程" },
  { width: 0, left: 0, value: "tags:product-docs", text: "产品文档" },
  { width: 0, left: 0, value: "tags:api-docs", text: "API" },
]);
const select = ref(docType.value[0].value);
const ulRef = ref<HTMLUListElement>();
const lisRef = ref<HTMLLIElement[]>();

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
          "tags",
        ],
        attributesToSnippet: [
          "hierarchy.lvl1:34",
          "hierarchy.lvl2:34",
          "hierarchy.lvl3:34",
          "hierarchy.lvl4:34",
          "hierarchy.lvl5:34",
          "hierarchy.lvl6:34",
          "content:34",
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

function selectHandler(item: typeof docType.value[0]) {
  select.value = item.value;
  translateX.value = item.left;
  width.value = item.width;
}
function getTreeText(text: Hit<AlgoliaResult>) {
  const { lvl0, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6 } = text.hierarchy;
  const arr = [lvl0, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6].filter((item) => item);
  if (text.type !== "content") {
    const num = Number(text.type.at(-1));
    return "来自: " + arr.splice(0, num).join(">");
  } else {
    return "来自: " + arr.join(">");
  }
}

onMounted(async () => {
  const client = algoliasearch(
    // "89BNK6UU0A",
    // "f691939e4fa8b414f92c84c288d2097a"
    "I2PHYUBLCN",
    "62ee775311415d26549e0e30fef5aa38"
    // indexName: 'api-docs_prodigytech'
  );
  searchIndex.value = client.initIndex("api-docs_prodigytech");
  loadNextPage();
  if (route.query.search) {
    input.value = route.query.search as string;
  }

  if (route.query["doc-type"]) {
    select.value = route.query["doc-type"] as string;
  }
  lisRef.value?.forEach((item, index) => {
    const ulLeft = ulRef.value?.getBoundingClientRect().left ?? 0;
    const liLeft = item.getBoundingClientRect().left;
    const liWidth = item.getBoundingClientRect().width;
    docType.value[index].left = liLeft - ulLeft;
    docType.value[index].width = liWidth;
  });
  const a = docType.value.find((item) => item.value === select.value);
  if (a) {
    translateX.value = a.left;
    width.value = a.width;
  }
});
</script>

<style lang="less">
.algolia-search {
  mark {
    @apply text-blue-500;
    background-color: white;
  }
  li {
    list-style: none;
  }
}
</style>
