import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          customCollections: ["meta", "meta-menu"],
        }),
      ],
    }),
    Icons({
      compiler: "vue3",
      customCollections: {
        meta: FileSystemIconLoader("src/assets", (svg) => {
          return svg;
        }),
      },
    }),
  ],
});
